import { useCallback, useEffect, useMemo, useState } from 'react';

const readQuery = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    page: Math.max(1, Number(params.get('page')) || 1),
    pageSize: [10, 20, 50, 100].includes(Number(params.get('pageSize')))
      ? Number(params.get('pageSize')) : 10,
    q: params.get('q') || '',
    status: params.get('status') || '',
  };
};

export default function usePagedList(fetcher, { syncUrl = true } = {}) {
  const [query, setQuery] = useState(() => syncUrl ? readQuery() : {
    page: 1, pageSize: 10, q: '', status: '',
  });
  const [search, setSearch] = useState(query.q);
  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    if (!syncUrl) return;
    const updateFromLocation = () => {
      const next = readQuery();
      setQuery((previous) => Object.keys(next).every((key) => previous[key] === next[key])
        ? previous : next);
      setSearch(next.q);
    };
    window.addEventListener('popstate', updateFromLocation);
    return () => {
      window.removeEventListener('popstate', updateFromLocation);
    };
  }, [syncUrl]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setQuery((previous) => search === previous.q ? previous : { ...previous, q: search, page: 1 });
    }, 400);
    return () => window.clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (!syncUrl) return;
    if (query.page === 1 && query.pageSize === 10 && !query.q && !query.status) {
      window.history.replaceState(null, '', window.location.pathname);
      return;
    }
    const params = new URLSearchParams();
    params.set('page', String(query.page));
    params.set('pageSize', String(query.pageSize));
    if (query.q) params.set('q', query.q);
    if (query.status) params.set('status', query.status);
    window.history.replaceState(null, '', `${window.location.pathname}?${params}`);
  }, [query, syncUrl]);

  useEffect(() => {
    const controller = new AbortController();
    queueMicrotask(() => {
      if (!controller.signal.aborted) {
        setLoading(true);
        setError(null);
        setItems([]);
        setTotalCount(0);
      }
    });
    const params = { page: query.page, pageSize: query.pageSize, q: query.q || undefined };
    if (query.status) params.status = query.status;
    fetcher(params, controller.signal)
      .then((result) => {
        if (!controller.signal.aborted) {
          setItems(result.items || []);
          setTotalCount(result.totalCount || 0);
        }
      })
      .catch((failure) => { if (!controller.signal.aborted) setError(failure); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [fetcher, query, revision]);

  const setPage = useCallback((page, pageSize = query.pageSize) => {
    setQuery((previous) => ({ ...previous, page: pageSize === previous.pageSize ? page : 1, pageSize }));
  }, [query.pageSize]);
  const setStatus = useCallback((status) => {
    setQuery((previous) => ({ ...previous, status, page: 1 }));
  }, []);
  const refresh = useCallback(() => setRevision((value) => value + 1), []);
  const reset = useCallback(() => {
    setSearch('');
    setQuery({ page: 1, pageSize: 10, q: '', status: '' });
  }, []);

  return useMemo(() => ({ items, totalCount, loading, error, query, search, setSearch,
    setPage, setStatus, refresh, reset }),
  [items, totalCount, loading, error, query, search, setPage, setStatus, refresh, reset]);
}
