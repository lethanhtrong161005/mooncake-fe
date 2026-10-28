import { useCallback, useEffect, useRef, useState } from 'react';
import { App } from 'antd';

export function useShopResource(loader) {
  const [state, setState] = useState({ data: null, error: null, loading: true });
  const [revision, setRevision] = useState(0);
  const reload = useCallback(() => setRevision((value) => value + 1), []);
  useEffect(() => {
    const controller = new AbortController();
    Promise.resolve().then(() => {
      if (controller.signal.aborted) return;
      setState((previous) => ({ ...previous, loading: true, error: null }));
      return loader(controller.signal);
    }).then((data) => {
      if (!controller.signal.aborted) setState({ data, error: null, loading: false });
    }).catch((error) => {
      if (!controller.signal.aborted) setState((previous) => ({ ...previous, error, loading: false }));
    });
    return () => controller.abort();
  }, [loader, revision]);
  return { ...state, reload };
}

export function useShopMutation() {
  const running = useRef(false);
  const attempt = useRef({ fingerprint: '', key: '' });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const run = async (operation, payload, callback) => {
    if (running.current) return { ok: false };
    running.current = true; setBusy(true); setError(null);
    const fingerprint = JSON.stringify({ operation, payload });
    if (attempt.current.fingerprint !== fingerprint) attempt.current = { fingerprint, key: crypto.randomUUID() };
    try {
      const data = await callback(attempt.current.key);
      attempt.current = { fingerprint: '', key: '' };
      return { ok: true, data };
    } catch (failure) { setError(failure); return { ok: false, error: failure }; }
    finally { running.current = false; setBusy(false); }
  };
  return { run, busy, error, clearError: () => setError(null) };
}

export function useDirtyExit(dirty) {
  const { modal } = App.useApp();
  useEffect(() => {
    if (!dirty) return;
    const handler = (event) => { event.preventDefault(); event.returnValue = ''; };
    const navigate = (event) => {
      event.preventDefault();
      modal.confirm({ title: 'Rời trang và bỏ thay đổi chưa lưu?', onOk: () => event.detail.proceed() });
    };
    window.addEventListener('beforeunload', handler);
    window.addEventListener('app:before-navigate', navigate);
    return () => { window.removeEventListener('beforeunload', handler); window.removeEventListener('app:before-navigate', navigate); };
  }, [dirty, modal]);
}
