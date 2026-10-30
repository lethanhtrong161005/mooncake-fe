import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { verificationNotificationService as service } from '../services/verificationNotificationService';
import { createVerificationConnection } from '../services/verificationRealtimeService';
import { VerificationNotificationContext } from './verificationNotificationStore';

export function VerificationNotificationProvider({ children }) {
  const { user, isLoggedIn, refreshCurrentUser } = useAuth();
  const [inbox, setInbox] = useState(null);
  const [status, setStatus] = useState('offline');
  const [workflowVersion, setWorkflowVersion] = useState(0);
  const [error, setError] = useState('');
  const activeUser = useRef(null);
  const session = useRef(0);
  const inboxRequest = useRef(0);
  const refresh = useCallback(async () => {
    const id = activeUser.current;
    const epoch = session.current;
    const request = ++inboxRequest.current;
    if (!id) return;
    try {
      const data = await service.list();
      if (activeUser.current === id && session.current === epoch && inboxRequest.current === request) { setInbox(data); setError(''); }
    } catch {
      if (activeUser.current === id && session.current === epoch && inboxRequest.current === request) setError('Không thể tải thông báo.');
    }
  }, []);
  useEffect(() => {
    session.current++;
    activeUser.current = isLoggedIn ? user?.id : null;
    if (!activeUser.current) {
      queueMicrotask(() => { setInbox(null); setStatus('offline'); });
      return;
    }
    let active = true;
    let refreshTimer;
    let needsAuth = false;
    const seen = new Map();
    const invalidate = (name, event) => {
      if (!active) return;
      const key = event.eventId ? `${name}:${event.eventId}` : null;
      if (key && seen.has(key)) return;
      if (key) { seen.set(key, true); if (seen.size > 256) seen.delete(seen.keys().next().value); }
      needsAuth ||= name === 'SupplierVerificationChanged' || name === 'catch-up';
      window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => {
        if (!active) return;
        refresh();
        setWorkflowVersion((value) => value + 1);
        if (needsAuth) refreshCurrentUser().catch(() => {});
        needsAuth = false;
      }, 250);
    };
    const connection = createVerificationConnection(invalidate, (next) => {
      if (active) setStatus(next);
    });
    Promise.resolve().then(refresh);
    connection.start();
    const focus = () => {
      if (active && !document.hidden) {
        invalidate('catch-up', {});
      }
    };
    window.addEventListener('focus', focus);
    document.addEventListener('visibilitychange', focus);
    return () => {
      active = false; activeUser.current = null;
      window.clearTimeout(refreshTimer);
      window.removeEventListener('focus', focus);
      document.removeEventListener('visibilitychange', focus);
      connection.stop();
    };
  }, [isLoggedIn, user?.id, refresh, refreshCurrentUser]);
  useEffect(() => {
    if (!isLoggedIn || status === 'connected') return;
    const timer = window.setInterval(() => {
      if (!document.hidden) {
        refresh();
        setWorkflowVersion((value) => value + 1);
        refreshCurrentUser().catch(() => {});
      }
    }, 30000 + Math.random() * 5000);
    return () => window.clearInterval(timer);
  }, [isLoggedIn, status, refresh, refreshCurrentUser]);
  return <VerificationNotificationContext.Provider value={{
    inbox, unreadCount: inbox?.unreadCount || 0, status, workflowVersion, refresh, error,
  }}>{children}</VerificationNotificationContext.Provider>;
}
