import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { getValidAccessToken } from './apiClient';
import { VERIFICATION_HUB_URL } from '../constants/apiEndpoints';

export function createVerificationConnection(onEvent, onStatus) {
  const connection = new HubConnectionBuilder()
    .withUrl(VERIFICATION_HUB_URL, { accessTokenFactory: getValidAccessToken })
    .withAutomaticReconnect([0, 2000, 10000, 30000])
    .configureLogging(LogLevel.None)
    .build();
  let stopped = false;
  let timer;
  let attempts = 0;
  const events = ['SupplierVerificationChanged', 'SupplierQueueChanged', 'NotificationCreated', 'NotificationRead'];
  events.forEach((name) => connection.on(name, (event) => onEvent(name, event)));
  connection.onreconnecting(() => onStatus('reconnecting'));
  connection.onreconnected(() => { attempts = 0; onStatus('connected'); onEvent('catch-up', {}); });
  const start = async () => {
    if (stopped) return;
    try {
      onStatus('connecting');
      await connection.start();
      if (stopped) { await connection.stop(); return; }
      attempts = 0;
      onStatus('connected');
      onEvent('catch-up', {});
    } catch {
      if (!stopped) {
        onStatus('offline');
        if (attempts < 8) {
          timer = window.setTimeout(start, Math.min(30000, 1000 * 2 ** attempts++) + Math.random() * 1000);
        }
      }
    }
  };
  connection.onclose(() => { if (!stopped) { attempts = 0; timer = window.setTimeout(start, 5000); onStatus('offline'); } });
  return {
    start,
    async stop() {
      stopped = true;
      window.clearTimeout(timer);
      events.forEach((name) => connection.off(name));
      await connection.stop();
    },
  };
}
