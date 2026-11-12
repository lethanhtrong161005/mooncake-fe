import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import ChatContext from './chatContextStore';
import { useAuth } from '../hooks/useAuth';
import { chatService } from '../services/chatService';
import { createChatConnection } from '../services/chatHubClient';

export function ChatProvider({ children }) {
  const { isLoggedIn, user } = useAuth();

  const [connectionStatus, setConnectionStatus] = useState('offline');
  const [unreadCount, setUnreadCount] = useState(0);
  const [threads, setThreads] = useState([]);
  const [threadsLoading, setThreadsLoading] = useState(false);
  const threadsCursorRef = useRef(null);
  const [threadsHasMore, setThreadsHasMore] = useState(false);

  // Floating Messenger-style ChatDock state
  const [activeDockThread, setActiveDockThread] = useState(null);
  const [isDockMinimized, setIsDockMinimized] = useState(false);
  const [productContext, setProductContext] = useState(null);

  // Presence map: { [userId]: { isOnline, lastSeenAt } }
  const [presenceMap, setPresenceMap] = useState({});

  // Typing indicators: { [threadId]: Set of userIds }
  const [typingMap, setTypingMap] = useState({});

  const hubClientRef = useRef(null);
  const messageListenersRef = useRef(new Set());
  const activeDockThreadRef = useRef(activeDockThread);

  const subscribeToMessages = useCallback((listener) => {
    messageListenersRef.current.add(listener);
    return () => messageListenersRef.current.delete(listener);
  }, []);

  useEffect(() => {
    activeDockThreadRef.current = activeDockThread;
  }, [activeDockThread]);

  const currentUserId = user?.id || user?.userId || null;

  // Fetch initial unread count
  const refreshUnreadCount = useCallback(async () => {
    if (!isLoggedIn) {
      setUnreadCount(0);
      return;
    }
    try {
      const count = await chatService.getUnreadCount();
      setUnreadCount(count);
    } catch {
      // Non-blocking
    }
  }, [isLoggedIn]);

  // Load threads list
  const loadThreads = useCallback(async ({ reset = false } = {}) => {
    if (!isLoggedIn) {
      setThreads([]);
      return;
    }

    setThreadsLoading(true);
    try {
      const cursor = reset ? null : threadsCursorRef.current;
      const res = await chatService.getThreads({ cursor });
      setThreads((prev) => (reset ? res.items : [...prev, ...res.items]));
      threadsCursorRef.current = res.nextCursor;
      setThreadsHasMore(res.hasMore);

      // Collect presence from partner threads
      const newPresence = {};
      res.items.forEach((t) => {
        if (t.partner?.userId && t.partner.presence) {
          newPresence[t.partner.userId] = t.partner.presence;
        }
      });
      setPresenceMap((prev) => ({ ...prev, ...newPresence }));
    } catch {
      // Non-blocking
    } finally {
      setThreadsLoading(false);
    }
  }, [isLoggedIn]);

  // Handle incoming realtime SignalR events
  const handleRealtimeEvent = useCallback((eventName, payload) => {
    switch (eventName) {
      case 'MessageCreated': {
        const message = payload;
        const threadId = message?.threadId;
        if (!threadId) break;
        messageListenersRef.current.forEach((listener) => listener(message));
        const incoming = message.senderId !== currentUserId;

        if (incoming) {
          chatService.getThread(threadId).then((thread) => {
            if (!thread) return;
            setActiveDockThread(thread);
            setIsDockMinimized(false);
            setProductContext(null);
          }).catch(() => {});
        }

        // Update threads list preview & position
        setThreads((prev) => {
          const idx = prev.findIndex((t) => t.id === threadId);
          if (idx === -1) return prev;
          const target = prev[idx];
          const isSender = message.senderId === currentUserId;
          const updated = {
            ...target,
            lastMessagePreview: message.body || (message.type === 'ProductCard' ? 'Đã gửi một sản phẩm' : 'Đã gửi tệp đính kèm'),
            lastMessageSenderId: message.senderId,
            lastActivityAt: message.createdAt,
            unreadCount: isSender || activeDockThreadRef.current?.id === threadId
              ? target.unreadCount
              : target.unreadCount + 1,
          };
          const rest = prev.filter((_, i) => i !== idx);
          return [updated, ...rest];
        });
        if (incoming) loadThreads({ reset: true });

        // If dock is actively open on this thread and message from partner, mark read
        if (activeDockThreadRef.current?.id === threadId && message.senderId !== currentUserId) {
          chatService.markRead(threadId, { messageId: message.id }).catch(() => {});
        }
        break;
      }

      case 'MessageEdited': {
        // Dispatched to custom listeners or component hooks
        break;
      }

      case 'MessageRecalled': {
        const { threadId, messageId } = payload;
        setThreads((prev) => prev.map((t) => {
          if (t.id === threadId && t.lastMessageId === messageId) {
            return { ...t, lastMessagePreview: 'Tin nhắn đã được thu hồi' };
          }
          return t;
        }));
        break;
      }

      case 'ReadUpdated': {
        const { threadId, userId: readerId, lastReadMessageId } = payload;
        if (readerId !== currentUserId) {
          setThreads((prev) => prev.map((t) => (t.id === threadId ? { ...t, partnerLastReadMessageId: lastReadMessageId } : t)));
        }
        break;
      }

      case 'UnreadChanged': {
        const total = typeof payload?.total === 'number' ? payload.total : payload?.totalUnread ?? 0;
        setUnreadCount(total);
        break;
      }

      case 'ThreadUpdated': {
        const updated = payload;
        setThreads((prev) => prev.map((t) => (t.id === updated.id ? { ...t, ...updated } : t)));
        if (activeDockThreadRef.current?.id === updated.id) {
          setActiveDockThread((prev) => (prev ? { ...prev, ...updated } : null));
        }
        break;
      }

      case 'PresenceChanged': {
        const { userId: presenceUserId, isOnline, lastSeenAt } = payload;
        setPresenceMap((prev) => ({
          ...prev,
          [presenceUserId]: { isOnline, lastSeenAt },
        }));
        break;
      }

      case 'Typing': {
        const { threadId, userId: typingUser, isTyping } = payload;
        if (typingUser === currentUserId) return;
        setTypingMap((prev) => {
          const currentSet = new Set(prev[threadId] || []);
          if (isTyping) {
            currentSet.add(typingUser);
          } else {
            currentSet.delete(typingUser);
          }
          return { ...prev, [threadId]: Array.from(currentSet) };
        });
        break;
      }

      case 'catch-up': {
        refreshUnreadCount();
        loadThreads({ reset: true });
        break;
      }

      default:
        break;
    }
  }, [currentUserId, loadThreads, refreshUnreadCount]);

  // Connect to SignalR hub when logged in
  useEffect(() => {
    if (!isLoggedIn) {
      let active = true;
      queueMicrotask(() => {
        if (!active) return;
        setConnectionStatus('offline');
        setThreads([]);
        setUnreadCount(0);
        setActiveDockThread(null);
      });
      threadsCursorRef.current = null;
      if (hubClientRef.current) {
        hubClientRef.current.stop();
        hubClientRef.current = null;
      }
      return () => { active = false; };
    }

    const client = createChatConnection(
      handleRealtimeEvent,
      (status) => setConnectionStatus(status),
    );
    hubClientRef.current = client;
    client.start();
    Promise.resolve().then(refreshUnreadCount);

    return () => {
      client.stop();
      hubClientRef.current = null;
    };
  }, [isLoggedIn, handleRealtimeEvent, refreshUnreadCount]);

  // Open Chat with a shop (Messenger-style dock)
  const openChatWithShop = useCallback(async ({ shopId, supplierId, product } = {}) => {
    if (!isLoggedIn) {
      return null;
    }

    const thread = await chatService.openThread({ shopId, supplierId });
    setActiveDockThread(thread);
    setIsDockMinimized(false);
    setProductContext(product || null);

    if (hubClientRef.current) {
      await hubClientRef.current.joinThread(thread.id);
    }

    if (thread.partner?.userId && thread.partner.presence) {
      setPresenceMap((prev) => ({
        ...prev,
        [thread.partner.userId]: thread.partner.presence,
      }));
    }

    // Mark read when opened
    if (thread.unreadCount > 0 && thread.lastMessageId) {
      chatService.markRead(thread.id, { messageId: thread.lastMessageId })
        .then(() => refreshUnreadCount())
        .catch(() => {});
    }

    return thread;
  }, [isLoggedIn, refreshUnreadCount]);

  const closeDock = useCallback(() => {
    if (activeDockThread && hubClientRef.current) {
      hubClientRef.current.leaveThread(activeDockThread.id);
    }
    setActiveDockThread(null);
    setIsDockMinimized(false);
    setProductContext(null);
  }, [activeDockThread]);

  const toggleMinimizeDock = useCallback(() => {
    setIsDockMinimized((prev) => !prev);
  }, []);

  const sendTyping = useCallback((threadId, isTyping) => {
    if (hubClientRef.current && threadId) {
      hubClientRef.current.sendTyping(threadId, isTyping);
    }
  }, []);

  const joinThread = useCallback((threadId) => {
    if (hubClientRef.current && threadId) {
      hubClientRef.current.joinThread(threadId);
    }
  }, []);

  const leaveThread = useCallback((threadId) => {
    if (hubClientRef.current && threadId) {
      hubClientRef.current.leaveThread(threadId);
    }
  }, []);

  const clearProductContext = useCallback(() => {
    setProductContext(null);
  }, []);

  const contextValue = useMemo(() => ({
    isLoggedIn,
    connectionStatus,
    unreadCount,
    threads,
    threadsLoading,
    threadsHasMore,
    activeDockThread,
    isDockMinimized,
    productContext,
    presenceMap,
    typingMap,
    openChatWithShop,
    closeDock,
    toggleMinimizeDock,
    setActiveDockThread,
    loadThreads,
    refreshUnreadCount,
    sendTyping,
    joinThread,
    leaveThread,
    clearProductContext,
    subscribeToMessages,
  }), [
    isLoggedIn,
    connectionStatus,
    unreadCount,
    threads,
    threadsLoading,
    threadsHasMore,
    activeDockThread,
    isDockMinimized,
    productContext,
    presenceMap,
    typingMap,
    openChatWithShop,
    closeDock,
    toggleMinimizeDock,
    loadThreads,
    refreshUnreadCount,
    sendTyping,
    joinThread,
    leaveThread,
    clearProductContext,
    subscribeToMessages,
  ]);

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  );
}

export default ChatProvider;

