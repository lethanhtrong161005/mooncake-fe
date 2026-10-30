import { useCallback, useEffect, useRef, useState } from 'react';
import { verificationError } from '../constants/supplierVerification';

export function useVerificationResource(loader, externalRevision = 0) {
  const [state, setState] = useState({ data: null, isLoading: true, error: '' });
  const [revision, setRevision] = useState(0);
  const reload = useCallback(() => setRevision((value) => value + 1), []);
  const generation = useRef(0);
  useEffect(() => {
    const current = ++generation.current;
    const controller = new AbortController();
    Promise.resolve().then(() => {
      if (!controller.signal.aborted) setState((previous) => ({ ...previous, isLoading: true, error: '' }));
      return loader(controller.signal);
    }).then((data) => {
      if (!controller.signal.aborted && generation.current === current) {
        setState({ data, isLoading: false, error: '' });
      }
    }).catch((error) => {
      if (!controller.signal.aborted && generation.current === current) {
        setState((previous) => ({ ...previous, isLoading: false, error: verificationError(error) }));
      }
    });
    return () => controller.abort();
  }, [loader, revision, externalRevision]);
  return { ...state, reload };
}

export function useVerificationMutation() {
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState('');
  const pending = useRef(false);
  const attempt = useRef({ fingerprint: '', key: '' });
  const run = async (operation, payload, action) => {
    if (pending.current) return { ok: false };
    pending.current = true;
    setIsBusy(true);
    setError('');
    const fingerprint = JSON.stringify({ operation, payload });
    if (attempt.current.fingerprint !== fingerprint) {
      attempt.current = { fingerprint, key: crypto.randomUUID() };
    }
    try {
      const data = await action(attempt.current.key);
      attempt.current = { fingerprint: '', key: '' };
      return { ok: true, data };
    } catch (failure) {
      setError(verificationError(failure));
      return { ok: false, error: failure };
    } finally {
      pending.current = false;
      setIsBusy(false);
    }
  };
  return { run, isBusy, error, clearError: () => setError('') };
}
