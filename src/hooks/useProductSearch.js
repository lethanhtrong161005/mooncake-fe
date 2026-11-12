import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  DEFAULT_PAGE_SIZE,
  DEFAULT_PRICE_CEILING,
  resolveRegionLabel,
} from '../constants/productSearch';
import productService from '../services/productService';
import {
  buildSearchUrl,
  countActiveFilters,
  createDefaultSearchState,
  parseSearchQuery,
  toApiSearchParams,
} from '../utils/searchQuery';

const DEFAULT_REGIONS = [
  { code: 'HCM', name: 'TP. Hồ Chí Minh' },
  { code: 'HN', name: 'Hà Nội' },
  { code: 'DN', name: 'Đà Nẵng' },
];

export function useProductSearch() {
  const [searchState, setSearchState] = useState(() =>
    parseSearchQuery(typeof window !== 'undefined' ? window.location.href : '')
  );
  const [keywordDraft, setKeywordDraft] = useState(() => searchState.q);
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [regions, setRegions] = useState(DEFAULT_REGIONS);
  const [rawSuggestions, setRawSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [priceCeiling, setPriceCeiling] = useState(0);
  const [reloadTick, setReloadTick] = useState(0);

  const debounceRef = useRef(null);

  const applySearchUpdate = useCallback((updater) => {
    setSearchState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      if (buildSearchUrl(prev) === buildSearchUrl(next)) return prev;
      setIsLoading(true);
      setError(null);
      return next;
    });
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    productService
      .categories(controller.signal)
      .then((res) => {
        if (Array.isArray(res)) setCategories(res);
      })
      .catch(() => { });

    productService
      .regions(controller.signal)
      .then((res) => {
        if (Array.isArray(res) && res.length > 0) setRegions(res);
      })
      .catch(() => { });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const nextUrl = buildSearchUrl(searchState);
    if (typeof window !== 'undefined' && `${window.location.pathname}${window.location.search}` !== nextUrl) {
      window.history.replaceState(null, '', nextUrl);
    }
  }, [searchState]);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const handleLocationChange = () => {
      if (window.location.pathname !== '/tim-kiem') return;
      const parsed = parseSearchQuery(window.location.href);
      const canonicalUrl = buildSearchUrl(parsed);
      if (`${window.location.pathname}${window.location.search}` !== canonicalUrl) {
        window.history.replaceState(null, '', canonicalUrl);
      }
      setSearchState((prev) => {
        if (buildSearchUrl(prev) === canonicalUrl) return prev;
        setKeywordDraft(parsed.q);
        setIsLoading(true);
        setError(null);
        return parsed;
      });
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const apiParams = toApiSearchParams(searchState);

    productService
      .search(apiParams, controller.signal)
      .then((response) => {
        if (controller.signal.aborted) return;
        const total = Number(response?.totalCount || 0);
        const currentOffset = (searchState.pageNumber - 1) * searchState.pageSize;

        if (total > 0 && currentOffset >= total && searchState.pageNumber > 1) {
          const maxValidPage = Math.max(1, Math.ceil(total / searchState.pageSize));
          if (maxValidPage !== searchState.pageNumber) {
            setIsLoading(true);
            setSearchState((prev) => ({ ...prev, pageNumber: maxValidPage }));
            return;
          }
        }

        setData(response);
        setError(null);
        const facetMax = Number(response?.facets?.maxPrice || 0);
        if (facetMax > 0) {
          setPriceCeiling((prev) => Math.max(prev, facetMax));
        }
        setIsLoading(false);
      })
      .catch((err) => {
        if (
          controller.signal.aborted ||
          err?.name === 'CanceledError' ||
          err?.code === 'ERR_CANCELED' ||
          err?.originalError?.name === 'CanceledError' ||
          err?.originalError?.code === 'ERR_CANCELED'
        ) {
          return;
        }
        const message =
          err?.response?.data?.message ||
          err?.message ||
          'Không thể tải danh sách sản phẩm. Vui lòng thử lại.';
        setError(message);
        setIsLoading(false);
      });

    return () => controller.abort();
  }, [searchState, reloadTick]);

  useEffect(() => {
    const trimmed = (keywordDraft || '').trim();
    if (trimmed.length < 2) {
      return undefined;
    }
    const controller = new AbortController();
    const timer = setTimeout(() => {
      productService
        .autocomplete({ q: trimmed, limit: 6 }, controller.signal)
        .then((res) => {
          const items = Array.isArray(res?.suggestions)
            ? res.suggestions
            : Array.isArray(res)
              ? res
              : [];
          setRawSuggestions(
            items
              .map((item) => (typeof item === 'string' ? item : item?.text || item?.name))
              .filter(Boolean)
          );
        })
        .catch(() => { });
    }, 250);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [keywordDraft]);

  const handleKeywordChange = useCallback(
    (nextValue) => {
      const val = String(nextValue ?? '').slice(0, 100);
      setKeywordDraft(val);
      if (val.trim().length < 2) {
        setRawSuggestions([]);
      }
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        const normalized = val.trim();
        applySearchUpdate((prev) => {
          if (prev.q === normalized) return prev;
          return { ...prev, q: normalized, pageNumber: 1 };
        });
      }, 400);
    },
    [applySearchUpdate]
  );

  const submitKeyword = useCallback(
    (overrideValue) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      const raw = overrideValue !== undefined ? overrideValue : keywordDraft;
      const normalized = String(raw ?? '').trim().slice(0, 100);
      setKeywordDraft(normalized);
      if (normalized.length < 2) {
        setRawSuggestions([]);
      }
      applySearchUpdate((prev) => ({
        ...prev,
        q: normalized,
        pageNumber: 1,
      }));
    },
    [applySearchUpdate, keywordDraft]
  );

  const updateFilters = useCallback(
    (patch) => {
      applySearchUpdate((prev) => ({
        ...prev,
        ...patch,
        pageNumber: 1,
      }));
    },
    [applySearchUpdate]
  );

  const setCategoryIds = useCallback(
    (categoryIds) => updateFilters({ categoryIds }),
    [updateFilters]
  );

  const toggleCategory = useCallback(
    (categoryId) => {
      applySearchUpdate((prev) => {
        const exists = prev.categoryIds.includes(categoryId);
        const next = exists
          ? prev.categoryIds.filter((id) => id !== categoryId)
          : [...prev.categoryIds, categoryId];
        return { ...prev, categoryIds: next, pageNumber: 1 };
      });
    },
    [applySearchUpdate]
  );

  const setRegionCodes = useCallback(
    (regionCodes) => updateFilters({ regionCodes }),
    [updateFilters]
  );

  const toggleRegion = useCallback(
    (regionCode) => {
      applySearchUpdate((prev) => {
        const exists = prev.regionCodes.includes(regionCode);
        const next = exists
          ? prev.regionCodes.filter((code) => code !== regionCode)
          : [...prev.regionCodes, regionCode];
        return { ...prev, regionCodes: next, pageNumber: 1 };
      });
    },
    [applySearchUpdate]
  );

  const setPriceRange = useCallback(
    (minPrice, maxPrice) => {
      let resolvedMin = minPrice != null && minPrice > 0 ? Math.round(minPrice) : null;
      let resolvedMax = maxPrice != null && maxPrice > 0 ? Math.round(maxPrice) : null;
      if (resolvedMin != null && resolvedMax != null && resolvedMin > resolvedMax) {
        const temp = resolvedMin;
        resolvedMin = resolvedMax;
        resolvedMax = temp;
      }
      updateFilters({ minPrice: resolvedMin, maxPrice: resolvedMax });
    },
    [updateFilters]
  );

  const setMinReputation = useCallback(
    (minReputation) => {
      const val = Number(minReputation);
      updateFilters({ minReputation: val > 0 ? val : null });
    },
    [updateFilters]
  );

  const setMaxMinOrderQty = useCallback(
    (maxMinOrderQty) => {
      const val = Number(maxMinOrderQty);
      updateFilters({ maxMinOrderQty: val > 0 ? val : null });
    },
    [updateFilters]
  );

  const setSupportsCustomPackaging = useCallback(
    (supportsCustomPackaging) =>
      updateFilters({ supportsCustomPackaging: Boolean(supportsCustomPackaging) }),
    [updateFilters]
  );

  const setInStockOnly = useCallback(
    (inStockOnly) => updateFilters({ inStockOnly: Boolean(inStockOnly) }),
    [updateFilters]
  );

  const setSort = useCallback(
    (sort) => updateFilters({ sort }),
    [updateFilters]
  );

  const setPagination = useCallback(
    (nextPage) => {
      applySearchUpdate((prev) => ({
        ...prev,
        pageSize: DEFAULT_PAGE_SIZE,
        pageNumber: nextPage,
      }));
    },
    [applySearchUpdate]
  );

  const resetAllFilters = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setKeywordDraft('');
    setRawSuggestions([]);
    applySearchUpdate(() => createDefaultSearchState());
  }, [applySearchUpdate]);

  const retry = useCallback(() => {
    setIsLoading(true);
    setError(null);
    setReloadTick((prev) => prev + 1);
  }, []);

  const categoryOptions = useMemo(() => {
    const facetCategories = Array.isArray(data?.facets?.categories)
      ? data.facets.categories
      : [];
    const facetMap = new Map(
      facetCategories.map((item) => [String(item.value), item])
    );

    if (categories.length === 0) {
      return facetCategories.map((item) => ({
        value: String(item.value),
        label: item.label,
        count: Number(item.count || 0),
      }));
    }

    const merged = categories.map((cat) => {
      const id = String(cat.id || cat.value);
      const facet = facetMap.get(id);
      return {
        value: id,
        label: cat.name || cat.label || facet?.label || id,
        count: facet ? Number(facet.count || 0) : null,
      };
    });

    facetCategories.forEach((facet) => {
      const id = String(facet.value);
      if (!merged.some((item) => item.value === id)) {
        merged.push({
          value: id,
          label: facet.label,
          count: Number(facet.count || 0),
        });
      }
    });

    return merged;
  }, [categories, data]);

  const regionOptions = useMemo(() => {
    const facetRegions = Array.isArray(data?.facets?.regions)
      ? data.facets.regions
      : [];
    const facetMap = new Map(
      facetRegions.map((item) => [String(item.value).toUpperCase(), item])
    );

    const baseList = regions.length > 0 ? regions : DEFAULT_REGIONS;
    const merged = baseList.map((reg) => {
      const code = String(reg.code || reg.value || '').toUpperCase();
      const facet = facetMap.get(code);
      return {
        value: code,
        label: resolveRegionLabel(code, reg.name || reg.label || facet?.label),
        count: facet ? Number(facet.count || 0) : null,
      };
    });

    facetRegions.forEach((facet) => {
      const code = String(facet.value || '').toUpperCase();
      if (code && !merged.some((item) => item.value === code)) {
        merged.push({
          value: code,
          label: resolveRegionLabel(code, facet.label),
          count: Number(facet.count || 0),
        });
      }
    });

    return merged;
  }, [regions, data]);

  const effectiveCeiling = useMemo(() => {
    const rawMax = Math.max(
      priceCeiling,
      Number(data?.facets?.maxPrice || 0),
      Number(searchState.maxPrice || 0)
    );
    return rawMax > 0 ? rawMax : DEFAULT_PRICE_CEILING;
  }, [priceCeiling, data, searchState.maxPrice]);

  const activeFilterCount = useMemo(
    () => countActiveFilters(searchState),
    [searchState]
  );

  const suggestions =
    (keywordDraft || '').trim().length >= 2 ? rawSuggestions : [];

  return {
    searchState,
    keywordDraft,
    suggestions,
    items: Array.isArray(data?.items) ? data.items : [],
    totalCount: Number(data?.totalCount || 0),
    facets: data?.facets || {},
    categoryOptions,
    regionOptions,
    effectiveCeiling,
    activeFilterCount,
    isLoading,
    error,
    handleKeywordChange,
    submitKeyword,
    setCategoryIds,
    toggleCategory,
    setRegionCodes,
    toggleRegion,
    setPriceRange,
    setMinReputation,
    setMaxMinOrderQty,
    setSupportsCustomPackaging,
    setInStockOnly,
    setSort,
    setPagination,
    resetAllFilters,
    retry,
  };
}

export default useProductSearch;
