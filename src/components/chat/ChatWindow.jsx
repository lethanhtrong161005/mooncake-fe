import {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import {
  Input,
  Button,
  Upload,
  Spin,
  Tooltip,
  message as antMessage,
} from 'antd';
import {
  SendOutlined,
  PaperClipOutlined,
  CloseCircleFilled,
  StopOutlined,
  UnlockOutlined,
} from '@ant-design/icons';
import MessageBubble from './MessageBubble';
import PresenceBadge from './PresenceBadge';
import { chatService } from '../../services/chatService';
import { useChat } from '../../hooks/useChat';
import { useAuth } from '../../hooks/useAuth';

export default function ChatWindow({ thread, onBack, onClose, onMinimize, onNavigate, isCompact = false }) {
  const { user } = useAuth();
  const {
    productContext,
    clearProductContext,
    presenceMap,
    typingMap,
    sendTyping,
    refreshUnreadCount,
    subscribeToMessages,
  } = useChat();

  const currentUserId = user?.id || user?.userId;
  const threadId = thread?.id;

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [cursor, setCursor] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);

  const [inputBody, setInputBody] = useState('');
  const [pendingFiles, setPendingFiles] = useState([]);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const [sending, setSending] = useState(false);

  const [threadState, setThreadState] = useState(thread);

  const scrollRef = useRef(null);
  const typingTimerRef = useRef(null);
  const isTypingRef = useRef(false);

  // Sync thread prop changes
  useEffect(() => {
    queueMicrotask(() => setThreadState(thread));
  }, [thread]);

  // Load initial messages for this thread
  const loadInitialMessages = useCallback(async () => {
    if (!threadId) return;
    setLoading(true);
    try {
      const res = await chatService.getMessages(threadId);
      setMessages((previous) => {
        const fresh = new Set(res.items.map((item) => item.id));
        return [...res.items, ...previous.filter((item) => !fresh.has(item.id) && item.threadId === threadId)];
      });
      setHasMore(res.hasMore);
      setCursor(res.nextCursor);

      // Scroll to bottom on initial load
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 50);

      // Mark as read
      const lastMsg = res.items[res.items.length - 1];
      if (lastMsg && lastMsg.senderId !== currentUserId) {
        chatService.markRead(threadId, { messageId: lastMsg.id })
          .then(() => refreshUnreadCount())
          .catch(() => {});
      }
    } catch {
      antMessage.error('Không thể tải tin nhắn.');
    } finally {
      setLoading(false);
    }
  }, [threadId, currentUserId, refreshUnreadCount]);

  useEffect(() => {
    Promise.resolve().then(loadInitialMessages);
  }, [loadInitialMessages]);

  useEffect(() => subscribeToMessages((incoming) => {
    if (incoming.threadId !== threadId) return;
    setMessages((previous) => previous.some((item) => item.id === incoming.id)
      ? previous : [...previous, incoming]);
    if (incoming.senderId !== currentUserId) {
      chatService.markRead(threadId, { messageId: incoming.id })
        .then(refreshUnreadCount).catch(() => {});
    }
    window.setTimeout(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, 30);
  }), [subscribeToMessages, threadId, currentUserId, refreshUnreadCount]);

  // Load older messages (keyset cursor pagination)
  const handleLoadOlder = async () => {
    if (!hasMore || !cursor || loadingMore) return;
    setLoadingMore(true);
    const scrollContainer = scrollRef.current;
    const previousHeight = scrollContainer ? scrollContainer.scrollHeight : 0;

    try {
      const res = await chatService.getMessages(thread.id, { cursor });
      setMessages((prev) => [...res.items, ...prev]);
      setHasMore(res.hasMore);
      setCursor(res.nextCursor);

      // Preserve scroll position
      setTimeout(() => {
        if (scrollContainer) {
          scrollContainer.scrollTop = scrollContainer.scrollHeight - previousHeight;
        }
      }, 30);
    } catch {
      antMessage.error('Không thể tải tin nhắn cũ hơn.');
    } finally {
      setLoadingMore(false);
    }
  };

  // Typing event throttle
  const handleInputChange = (e) => {
    setInputBody(e.target.value);
    if (!isTypingRef.current) {
      isTypingRef.current = true;
      sendTyping(thread.id, true);
    }
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    typingTimerRef.current = setTimeout(() => {
      isTypingRef.current = false;
      sendTyping(thread.id, false);
    }, 2000);
  };

  // Send message
  const handleSendMessage = async (customProduct = null) => {
    const trimmedBody = inputBody.trim();
    if (!trimmedBody && pendingFiles.length === 0 && !customProduct) {
      return;
    }

    setSending(true);
    let attachmentIds = [];

    try {
      // 1. Upload files if any
      if (pendingFiles.length > 0) {
        setUploadingFiles(true);
        const uploaded = await chatService.uploadAttachments(pendingFiles);
        attachmentIds = uploaded.map((a) => a.id);
        setUploadingFiles(false);
      }

      // 2. Send message
      const clientMessageId = crypto.randomUUID ? crypto.randomUUID() : `cid-${Date.now()}`;
      const sent = await chatService.sendMessage(thread.id, {
        clientMessageId,
        body: trimmedBody || null,
        productId: customProduct?.id || null,
        attachmentIds,
      });

      // 3. Clear inputs & add to list
      setInputBody('');
      setPendingFiles([]);
      if (customProduct) {
        clearProductContext();
      }
      if (isTypingRef.current) {
        isTypingRef.current = false;
        sendTyping(thread.id, false);
      }

      setMessages((prev) => {
        if (prev.some((m) => m.id === sent.id || m.clientMessageId === sent.clientMessageId)) {
          return prev;
        }
        return [...prev, sent];
      });

      // Scroll to bottom
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 30);
    } catch (err) {
      antMessage.error(err?.message || 'Không thể gửi tin nhắn.');
    } finally {
      setSending(false);
      setUploadingFiles(false);
    }
  };

  // Recall message handler
  const handleRecallMessage = async (messageId) => {
    try {
      await chatService.recallMessage(messageId);
      setMessages((prev) => prev.map((m) => (m.id === messageId ? { ...m, isRecalled: true } : m)));
      antMessage.success('Đã thu hồi tin nhắn.');
    } catch (err) {
      antMessage.error(err?.message || 'Không thể thu hồi tin nhắn.');
    }
  };

  // Edit message handler
  const handleEditMessage = async (messageId, newBody) => {
    const res = await chatService.editMessage(messageId, { body: newBody });
    setMessages((prev) => prev.map((m) => (m.id === messageId ? {
      ...m,
      body: res.body,
      isEdited: true,
      editedAt: res.editedAt,
    } : m)));
    antMessage.success('Đã chỉnh sửa tin nhắn.');
  };

  // Block / Unblock thread
  const handleToggleBlock = async () => {
    try {
      if (threadState.isBlockedByMe) {
        const unblocked = await chatService.unblockThread(thread.id);
        setThreadState(unblocked);
        antMessage.success('Đã bỏ chặn cuộc trò chuyện.');
      } else {
        const blocked = await chatService.blockThread(thread.id);
        setThreadState(blocked);
        antMessage.success('Đã chặn cuộc trò chuyện.');
      }
    } catch (err) {
      antMessage.error(err?.message || 'Thao tác thất bại.');
    }
  };

  const partnerPresence = presenceMap[thread?.partner?.userId] || thread?.partner?.presence;
  const isPartnerTyping = (typingMap[thread?.id] || []).length > 0;

  return (
    <div className={`chat-window flex flex-col h-full bg-white relative overflow-hidden${isCompact ? ' chat-window--compact' : ''}`}>
      {/* Header bar */}
      <div className="chat-window-header px-4 py-3 border-b border-stone-200 flex items-center justify-between bg-stone-50/80 backdrop-blur">
        <div className="flex items-center gap-3 min-w-0">
          {onBack && (
            <Button
              type="text"
              size="small"
              onClick={onBack}
              className="md:hidden text-stone-500 hover:text-stone-800 -ml-1"
              aria-label="Quay lại"
            >
              ←
            </Button>
          )}

          {/* Partner Avatar */}
          {thread?.partner?.avatarUrl ? (
            <img
              src={thread.partner.avatarUrl}
              alt={thread.partner.displayName}
              className="w-10 h-10 rounded-full object-cover border border-stone-200 flex-shrink-0"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#8c1524]/10 text-[#8c1524] font-bold text-sm flex items-center justify-center flex-shrink-0">
              {thread?.partner?.displayName?.charAt(0) || 'G'}
            </div>
          )}

          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-stone-900 truncate m-0">
              {thread?.partner?.displayName}
            </h3>
            <PresenceBadge presence={partnerPresence} />
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-1">
          <Tooltip title={threadState?.isBlockedByMe ? 'Bỏ chặn cuộc trò chuyện' : 'Chặn cuộc trò chuyện'}>
            <Button
              type="text"
              size="small"
              danger={!threadState?.isBlockedByMe}
              icon={threadState?.isBlockedByMe ? <UnlockOutlined /> : <StopOutlined />}
              onClick={handleToggleBlock}
              aria-label="Chặn hoặc bỏ chặn"
            />
          </Tooltip>
          {isCompact && <Button type="text" size="small" onClick={onMinimize}
            aria-label="Thu nhỏ cuộc trò chuyện">−</Button>}
          {isCompact && <Button type="text" size="small" onClick={onClose}
            aria-label="Đóng cuộc trò chuyện">×</Button>}
        </div>
      </div>

      {/* Blocked notification banner */}
      {threadState?.isBlocked && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs text-amber-800 flex items-center justify-between">
          <span>
            {threadState.isBlockedByMe
              ? 'Bạn đã chặn cuộc trò chuyện này. Bạn có thể bỏ chặn bất cứ lúc nào.'
              : 'Cuộc trò chuyện này đang bị tạm khóa.'}
          </span>
          {threadState.isBlockedByMe && (
            <Button size="small" type="link" onClick={handleToggleBlock} className="text-xs p-0 h-auto text-amber-900 font-medium">
              Bỏ chặn
            </Button>
          )}
        </div>
      )}

      {/* Suggested Product Context banner */}
      {productContext && !threadState?.isBlocked && (
        <div className="chat-product-context">
          <div className="chat-product-context__summary">
            {productContext.imageUrl && (
              <img
                src={productContext.imageUrl}
                alt={productContext.name}
                className="chat-product-context__image"
              />
            )}
            <div className="min-w-0">
              <p className="chat-product-context__label">Sản phẩm đang xem</p>
              <p className="chat-product-context__name" title={productContext.name}>{productContext.name}</p>
            </div>
          </div>
          <div className="chat-product-context__actions">
            <Button
              size="small"
              type="primary"
              className="chat-product-context__send"
              onClick={() => handleSendMessage(productContext)}
            >
              Gửi sản phẩm
            </Button>
            <Button
              size="small"
              type="text"
              icon={<CloseCircleFilled className="text-stone-400" />}
              onClick={clearProductContext}
              aria-label="Bỏ qua"
            />
          </div>
        </div>
      )}

      {/* Message Feed container */}
      <div
        ref={scrollRef}
        className="chat-window__feed flex-1 overflow-y-auto px-4 py-3 space-y-1 bg-stone-50/30"
        role="log"
        aria-live="polite"
      >
        {/* Load more indicator */}
        {hasMore && (
          <div className="text-center py-2">
            <Button
              size="small"
              type="text"
              loading={loadingMore}
              onClick={handleLoadOlder}
              className="text-xs text-stone-500 hover:text-stone-800"
            >
              Xem tin nhắn cũ hơn
            </Button>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <Spin size="small" />
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-16 text-stone-400 text-xs">
            <p className="m-0 font-medium">Bắt đầu cuộc trò chuyện với {thread?.partner?.displayName}</p>
            <p className="mt-1 text-[11px]">Hỏi thông tin bánh, đặt hàng số lượng lớn, hoặc yêu cầu bao bì riêng.</p>
          </div>
        ) : (
          messages.map((m) => (
            <MessageBubble
              key={m.id || m.clientMessageId}
              msg={m}
              isOwn={m.senderId === currentUserId}
              isPartnerRead={
                thread?.partnerLastReadMessageId &&
                thread.partnerLastReadMessageId >= m.id
              }
              onRecall={handleRecallMessage}
              onEdit={handleEditMessage}
              onNavigate={onNavigate}
            />
          ))
        )}

        {/* Typing indicator */}
        {isPartnerTyping && (
          <div className="flex items-center gap-2 text-stone-400 text-xs py-1">
            <span className="w-2 h-2 rounded-full bg-stone-400 animate-pulse" />
            <span className="italic">{thread?.partner?.displayName} đang nhập...</span>
          </div>
        )}
      </div>

      {/* Pending attachments preview tray */}
      {pendingFiles.length > 0 && (
        <div className="px-4 py-2 border-t border-stone-200 bg-stone-50 flex items-center gap-2 overflow-x-auto">
          {pendingFiles.map((file, idx) => (
            <div
              key={idx}
              className="relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-stone-200 text-xs flex-shrink-0"
            >
              <span className="truncate max-w-[120px]">{file.name}</span>
              <button
                type="button"
                onClick={() => setPendingFiles((prev) => prev.filter((_, i) => i !== idx))}
                className="text-stone-400 hover:text-red-600 transition-colors"
                aria-label="Xóa tệp"
              >
                ×
              </button>
            </div>
          ))}
          {uploadingFiles && <Spin size="small" className="ml-2" />}
        </div>
      )}

      {/* Composer Input Bar */}
      <div className="chat-window__composer p-3 border-t border-stone-200 bg-white">
        {threadState?.isBlocked ? (
          <div className="text-center py-2 text-xs text-stone-400 italic">
            Cuộc trò chuyện đang bị chặn, không thể gửi tin nhắn.
          </div>
        ) : (
          <div className="chat-window__composer-row flex items-end gap-2">
            {/* Attachment Button */}
            <Upload
              multiple
              showUploadList={false}
              beforeUpload={(file) => {
                if (pendingFiles.length >= 10) {
                  antMessage.warning('Tối đa 10 tệp đính kèm mỗi lần.');
                  return Upload.LIST_IGNORE;
                }
                if (file.size > 10 * 1024 * 1024) {
                  antMessage.error(`Tệp ${file.name} vượt quá giới hạn 10MB.`);
                  return Upload.LIST_IGNORE;
                }
                setPendingFiles((prev) => [...prev, file]);
                return false;
              }}
            >
              <Button
                type="text"
                icon={<PaperClipOutlined className="text-base text-stone-500" />}
                className="hover:text-stone-800"
                aria-label="Đính kèm tệp"
              />
            </Upload>

            {/* Message Textarea */}
            <Input.TextArea
              value={inputBody}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={isCompact ? 'Nhập tin nhắn...' : 'Nhập tin nhắn... (Enter để gửi, Shift+Enter xuống dòng)'}
              autoSize={{ minRows: 1, maxRows: isCompact ? 3 : 5 }}
              className="chat-window__input text-sm rounded-xl py-2 px-3 border-stone-300 focus:border-[#8c1524] hover:border-[#8c1524]"
            />

            {/* Send Button */}
            <Button
              type="primary"
              icon={<SendOutlined />}
              loading={sending}
              onClick={() => handleSendMessage()}
              style={{ backgroundColor: '#8c1524' }}
              className="rounded-xl flex-shrink-0"
              aria-label="Gửi tin nhắn"
            />
          </div>
        )}
      </div>
    </div>
  );
}

