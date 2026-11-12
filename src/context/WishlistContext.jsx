import { App as AntApp } from 'antd';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useAuth } from '../hooks/useAuth';
import wishlistService from '../services/wishlistService';
import WishlistContext from './wishlistContextStore';

const EMPTY_SET = new Set();

export function WishlistProvider({ children }) {
  const { isLoggedIn, user } = useAuth();
  const { message } = AntApp.useApp();
  const userId = isLoggedIn ? (user?.id ?? null) : null;

  const [state, setState] = useState({
    ownerId: null,
    savedIds: new Set(),
    totalCount: null,
  });
  const [pendingIds, setPendingIds] = useState(() => new Set());

  const prevUserIdRef = useRef(userId);
  const userIdRef = useRef(userId);
  const checkedIdsRef = useRef(new Set());
  const inFlightCheckRef = useRef(new Set());
  const pendingIdsRef = useRef(new Set());
  const checkTimerRef = useRef(null);
  const queuedIdsRef = useRef(new Set());

  const savedIds = state.ownerId === userId ? state.savedIds : EMPTY_SET;
  const totalCount = state.ownerId === userId ? state.totalCount : null;

  useEffect(() => {
    userIdRef.current = userId;
    if (prevUserIdRef.current !== userId) {
      prevUserIdRef.current = userId;
      checkedIdsRef.current.clear();
      inFlightCheckRef.current.clear();
      queuedIdsRef.current.clear();
      pendingIdsRef.current.clear();
      if (checkTimerRef.current) {
        clearTimeout(checkTimerRef.current);
        checkTimerRef.current = null;
      }
    }

    if (!userId) {
      return undefined;
    }

    const controller = new AbortController();
    wishlistService.getPage({ pageSize: 1, signal: controller.signal })
      .then((summary) => {
        if (controller.signal.aborted || userIdRef.current !== userId) return;
        setState((prev) => {
          const baseSaved = prev.ownerId === userId ? prev.savedIds : [];
          const nextSaved = new Set(baseSaved);
          (summary.items || []).forEach((item) => {
            const itemId = item?.productId ?? item?.id;
            if (itemId) nextSaved.add(String(itemId));
          });
          return {
            ownerId: userId,
            savedIds: nextSaved,
            totalCount: Number(summary.totalCount ?? 0),
          };
        });
      })
      .catch(() => {
        // Ignore silent count preload errors when offline or in isolated routes.
      });

    return () => {
      controller.abort();
      if (checkTimerRef.current) {
        clearTimeout(checkTimerRef.current);
        checkTimerRef.current = null;
      }
    };
  }, [userId]);

  const flushCheckQueue = useCallback(async () => {
    const ownerAtStart = userIdRef.current;
    if (!ownerAtStart || queuedIdsRef.current.size === 0) return;

    const batchIds = [...queuedIdsRef.current].filter((id) => (
      !checkedIdsRef.current.has(id) &&
      !inFlightCheckRef.current.has(id)
    ));
    queuedIdsRef.current.clear();

    if (batchIds.length === 0) return;
    batchIds.forEach((id) => inFlightCheckRef.current.add(id));

    try {
      const confirmedSavedIds = await wishlistService.check(batchIds);
      if (userIdRef.current !== ownerAtStart) return;

      batchIds.forEach((id) => checkedIdsRef.current.add(id));
      const confirmedSet = new Set(confirmedSavedIds.map(String));

      setState((prev) => {
        const nextSaved = new Set(prev.ownerId === ownerAtStart ? prev.savedIds : []);
        batchIds.forEach((id) => {
          if (confirmedSet.has(id)) {
            nextSaved.add(id);
          } else {
            nextSaved.delete(id);
          }
        });
        return {
          ownerId: ownerAtStart,
          savedIds: nextSaved,
          totalCount: prev.ownerId === ownerAtStart ? prev.totalCount : null,
        };
      });
    } catch {
      // Leave unchecked so future renders can retry cleanly.
    } finally {
      batchIds.forEach((id) => inFlightCheckRef.current.delete(id));
    }
  }, []);

  const ensureChecked = useCallback((productIds = []) => {
    if (!userId || !Array.isArray(productIds) || productIds.length === 0) {
      return;
    }

    productIds.forEach((rawId) => {
      const normalized = rawId ? String(rawId).trim() : '';
      if (
        normalized &&
        !checkedIdsRef.current.has(normalized) &&
        !inFlightCheckRef.current.has(normalized)
      ) {
        queuedIdsRef.current.add(normalized);
      }
    });

    if (queuedIdsRef.current.size === 0 || checkTimerRef.current) return;

    checkTimerRef.current = setTimeout(() => {
      checkTimerRef.current = null;
      flushCheckQueue();
    }, 16);
  }, [flushCheckQueue, userId]);

  const syncLoadedItems = useCallback((items = [], nextTotalCount = null) => {
    const owner = userIdRef.current;
    if (!owner) return;

    setState((prev) => {
      const nextSaved = new Set(prev.ownerId === owner ? prev.savedIds : []);
      (Array.isArray(items) ? items : []).forEach((item) => {
        const itemId = item?.productId ?? item?.id;
        if (itemId) {
          const normalized = String(itemId).trim();
          nextSaved.add(normalized);
          checkedIdsRef.current.add(normalized);
        }
      });
      return {
        ownerId: owner,
        savedIds: nextSaved,
        totalCount: nextTotalCount !== null && nextTotalCount !== undefined
          ? Number(nextTotalCount)
          : (prev.ownerId === owner ? prev.totalCount : null),
      };
    });
  }, []);

  const toggleProduct = useCallback(async (productId) => {
    const ownerAtStart = userIdRef.current;
    if (!ownerAtStart) {
      message.info('Vui lòng đăng nhập để lưu sản phẩm yêu thích.');
      window.dispatchEvent(new CustomEvent('app:require-login'));
      return { requiresAuth: true, isSaved: false };
    }

    const normalizedId = productId ? String(productId).trim() : '';
    if (!normalizedId || pendingIdsRef.current.has(normalizedId)) {
      return null;
    }

    const wasSaved = savedIds.has(normalizedId);
    pendingIdsRef.current.add(normalizedId);
    setPendingIds(new Set(pendingIdsRef.current));

    setState((prev) => {
      const baseSaved = prev.ownerId === ownerAtStart ? prev.savedIds : EMPTY_SET;
      const nextSaved = new Set(baseSaved);
      if (wasSaved) {
        nextSaved.delete(normalizedId);
      } else {
        nextSaved.add(normalizedId);
      }
      const baseCount = prev.ownerId === ownerAtStart ? prev.totalCount : null;
      return {
        ownerId: ownerAtStart,
        savedIds: nextSaved,
        totalCount: baseCount === null
          ? null
          : Math.max(0, baseCount + (wasSaved ? -1 : 1)),
      };
    });

    try {
      const result = await wishlistService.toggle(normalizedId);
      if (userIdRef.current !== ownerAtStart) return null;

      checkedIdsRef.current.add(normalizedId);
      setState((prev) => {
        const nextSaved = new Set(prev.ownerId === ownerAtStart ? prev.savedIds : []);
        if (result.isSaved) {
          nextSaved.add(normalizedId);
        } else {
          nextSaved.delete(normalizedId);
        }
        return {
          ownerId: ownerAtStart,
          savedIds: nextSaved,
          totalCount: Number(result.totalCount ?? nextSaved.size),
        };
      });

      message.success(
        result.isSaved
          ? 'Đã lưu vào danh sách yêu thích.'
          : 'Đã bỏ khỏi danh sách yêu thích.'
      );
      return result;
    } catch (error) {
      if (userIdRef.current === ownerAtStart) {
        setState((prev) => {
          const nextSaved = new Set(prev.ownerId === ownerAtStart ? prev.savedIds : []);
          if (wasSaved) {
            nextSaved.add(normalizedId);
          } else {
            nextSaved.delete(normalizedId);
          }
          const baseCount = prev.ownerId === ownerAtStart ? prev.totalCount : null;
          return {
            ownerId: ownerAtStart,
            savedIds: nextSaved,
            totalCount: baseCount === null
              ? null
              : Math.max(0, baseCount + (wasSaved ? 1 : -1)),
          };
        });
      }
      message.error(error?.message || 'Không thể cập nhật danh sách yêu thích.');
      return null;
    } finally {
      pendingIdsRef.current.delete(normalizedId);
      setPendingIds(new Set(pendingIdsRef.current));
    }
  }, [message, savedIds]);

  const isSaved = useCallback((productId) => {
    if (!productId || !userId) return false;
    return savedIds.has(String(productId).trim());
  }, [savedIds, userId]);

  const isPending = useCallback((productId) => {
    if (!productId) return false;
    return pendingIds.has(String(productId).trim());
  }, [pendingIds]);

  const value = useMemo(() => ({
    savedIds,
    totalCount,
    pendingIds,
    isSaved,
    isPending,
    toggleProduct,
    ensureChecked,
    syncLoadedItems,
  }), [
    savedIds,
    totalCount,
    pendingIds,
    isSaved,
    isPending,
    toggleProduct,
    ensureChecked,
    syncLoadedItems,
  ]);

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistProvider;
