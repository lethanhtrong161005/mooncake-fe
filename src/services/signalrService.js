import * as signalR from '@microsoft/signalr';
import { API_BASE_URL } from '../constants/apiConfiguration';
import { API_ENDPOINTS } from '../constants/apiEndpoints';
import { getValidAccessToken } from './apiClient';

class SignalRManager {
  constructor() {
    this.connection = null;
    this.isConnecting = false;
    this.listeners = new Map();
    this.retryTimer = null;
    this.retryAttempt = 0;
    this.stopped = false;
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
      const baseURL = API_BASE_URL.replace(/\/$/, '');
      const hubUrl = `${baseURL}${API_ENDPOINTS.NOTIFICATIONS.HUB_URL}`;

      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(hubUrl, {
          accessTokenFactory: token ? () => token : getValidAccessToken,
          skipNegotiation: false,
          transport: signalR.HttpTransportType.WebSockets,
        })
        .withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
        .configureLogging(signalR.LogLevel.None)
        .build();

      this.listeners.forEach((callbacks, eventName) => {
        callbacks.forEach((cb) => this.connection.on(eventName, cb));
      });

      this.stopped = false;
      this.connection.onreconnected(() => { this.retryAttempt = 0; });
      this.connection.onclose(() => this.scheduleReconnect());
      await this.connection.start();
      this.retryAttempt = 0;
      return this.connection;
    } catch {
      window.setTimeout(() => this.scheduleReconnect(), 0);
      return null;
    } finally {
      this.isConnecting = false;
    }
  }

  scheduleReconnect() {
    if (this.stopped || this.retryTimer || this.isConnecting) return;
    const delay = Math.min(30000, 1000 * (2 ** this.retryAttempt++));
    this.retryTimer = window.setTimeout(async () => {
      this.retryTimer = null;
      await this.startConnection();
    }, delay);
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
    this.stopped = true;
    window.clearTimeout(this.retryTimer);
    this.retryTimer = null;
    if (this.connection) {
      try {
        await this.connection.stop();
      } catch { /* An already closed connection needs no further cleanup. */ }
      this.connection = null;
    }
  }
}

export const signalRManager = new SignalRManager();

