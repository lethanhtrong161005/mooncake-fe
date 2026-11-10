import * as signalR from '@microsoft/signalr';
import { API_ENDPOINTS } from '../constants/apiEndpoints';
import { API_BASE_URL } from '../constants/apiConfiguration';
import storage from '../utils/storage';

class SignalRManager {
  constructor() {
    this.connection = null;
    this.isConnecting = false;
    this.listeners = new Map();
  }

  async startConnection(token) {
    const resolvedToken = token || storage.get('auth_token');
    if (!resolvedToken) {
      return null;
    }
    if (this.connection?.state === signalR.HubConnectionState.Connected) {
      return this.connection;
    }
    if (this.isConnecting) return null;

    try {
      this.isConnecting = true;
      const hubUrl = new URL(
        `${API_BASE_URL.replace(/\/$/, '')}${API_ENDPOINTS.NOTIFICATIONS.HUB_URL}`,
        window.location.origin,
      ).href;

      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(hubUrl, {
          accessTokenFactory: () => token || storage.get('auth_token') || '',
          skipNegotiation: false,
          transport: signalR.HttpTransportType.WebSockets,
        })
        .withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
        .configureLogging(signalR.LogLevel.None)
        .build();

      this.listeners.forEach((callbacks, eventName) => {
        callbacks.forEach((cb) => this.connection.on(eventName, cb));
      });

      await this.connection.start();
      return this.connection;
    } catch {
      return null;
    } finally {
      this.isConnecting = false;
    }
  }

  on(eventName, callback) {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Set());
    }
    this.listeners.get(eventName).add(callback);

    if (this.connection) {
      this.connection.on(eventName, callback);
    }
  }

  off(eventName, callback) {
    if (this.listeners.has(eventName)) {
      this.listeners.get(eventName).delete(callback);
    }
    if (this.connection) {
      this.connection.off(eventName, callback);
    }
  }

  async stopConnection() {
    if (this.connection) {
      try {
        await this.connection.stop();
      } catch { /* An already closed connection needs no further cleanup. */ }
      this.connection = null;
    }
  }
}

export const signalRManager = new SignalRManager();

