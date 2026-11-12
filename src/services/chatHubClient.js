import { HubConnectionBuilder, LogLevel, HubConnectionState } from '@microsoft/signalr';
import { getValidAccessToken } from './apiClient';
import { CHAT_HUB_URL } from '../constants/apiEndpoints';

const CHAT_EVENTS = [
  'MessageCreated',
  'MessageEdited',
  'MessageRecalled',
  'ReadUpdated',
  'UnreadChanged',
  'ThreadUpdated',
  'Typing',
  'PresenceChanged',
];

export function createChatConnection(onEvent, onStatus) {
  const connection = new HubConnectionBuilder()
    .withUrl(CHAT_HUB_URL, {
      accessTokenFactory: getValidAccessToken,
    })
    .withAutomaticReconnect([0, 2000, 5000, 15000, 30000])
    .configureLogging(LogLevel.None)
    .build();

  let isStopped = false;
  let reconnectTimer = null;
  let retryCount = 0;

  CHAT_EVENTS.forEach((eventName) => {
    connection.on(eventName, (payload) => {
      onEvent?.(eventName, payload);
    });
  });

  connection.onreconnecting(() => {
    onStatus?.('reconnecting');
  });

  connection.onreconnected(() => {
    retryCount = 0;
    onStatus?.('connected');
    onEvent?.('catch-up', {});
  });

  const start = async () => {
    if (isStopped || connection.state === HubConnectionState.Connected) {
      return;
    }

    try {
      onStatus?.('connecting');
      await connection.start();
      if (isStopped) {
        await connection.stop();
        return;
      }
      retryCount = 0;
      onStatus?.('connected');
      onEvent?.('catch-up', {});
    } catch {
      if (!isStopped) {
        onStatus?.('offline');
        if (retryCount < 8) {
          const delay = Math.min(30000, 1000 * (2 ** retryCount++)) + Math.random() * 1000;
          reconnectTimer = window.setTimeout(start, delay);
        }
      }
    }
  };

  connection.onclose(() => {
    if (!isStopped) {
      retryCount = 0;
      reconnectTimer = window.setTimeout(start, 5000);
      onStatus?.('offline');
    }
  });

  return {
    start,
    async stop() {
      isStopped = true;
      if (reconnectTimer) {
        window.clearTimeout(reconnectTimer);
      }
      CHAT_EVENTS.forEach((eventName) => connection.off(eventName));
      if (connection.state !== HubConnectionState.Disconnected) {
        await connection.stop();
      }
    },
    async joinThread(threadId) {
      if (connection.state === HubConnectionState.Connected && threadId) {
        try {
          await connection.invoke('JoinThread', threadId);
        } catch {
          // Non-blocking invocation
        }
      }
    },
    async leaveThread(threadId) {
      if (connection.state === HubConnectionState.Connected && threadId) {
        try {
          await connection.invoke('LeaveThread', threadId);
        } catch {
          // Non-blocking invocation
        }
      }
    },
    async sendTyping(threadId, isTyping) {
      if (connection.state === HubConnectionState.Connected && threadId) {
        try {
          await connection.invoke('SendTyping', threadId, isTyping);
        } catch {
          // Non-blocking invocation
        }
      }
    },
    getState() {
      return connection.state;
    },
  };
}

export default createChatConnection;

