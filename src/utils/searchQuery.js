import {
  ALLOWED_SORTS,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  DEFAULT_SORT,
  MAX_PAGE_NUMBER,
} from '../constants/productSearch.js';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const CIPHER_KEY = 'NguyetPhoB2B2026';

function toBase64Url(hexStr) {
  if (typeof btoa === 'function') {
    return btoa(hexStr).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  return hexStr;
}

function fromBase64Url(token) {
  if (typeof atob === 'function') {
    const normalized = token.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4);
    return atob(padded);
  }
  return token;
}

function xorEncode(plainText) {
  const xoredHex = Array.from(String(plainText))
    .map((ch, i) =>
      (ch.charCodeAt(0) ^ CIPHER_KEY.charCodeAt(i % CIPHER_KEY.length))
        .toString(16)
        .padStart(2, '0')
    )
    .join('');
  return toBase64Url(xoredHex);
}

function xorDecode(token) {
  if (!token || typeof token !== 'string') return null;
  try {
    const xoredHex = fromBase64Url(token);
    if (!/^[0-9a-f]+$/i.test(xoredHex) || xoredHex.length % 2 !== 0) {
      return null;
    }
    let decoded = '';
    for (let i = 0; i < xoredHex.length; i += 2) {
      const byte = Number.parseInt(xoredHex.slice(i, i + 2), 16);
      const keyChar = CIPHER_KEY.charCodeAt((i / 2) % CIPHER_KEY.length);
      decoded += String.fromCharCode(byte ^ keyChar);
    }
    return decoded;
  } catch {
    return null;
  }
}

export const ENCODED_PAGE_NUMBER_PARAM = xorEncode('pn_b2b');
export const ENCODED_PAGE_SIZE_PARAM = xorEncode('ps_b2b');

export function encodePageNumber(page = DEFAULT_PAGE_NUMBER) {
  const validPage = parsePositiveInt(page, DEFAULT_PAGE_NUMBER, 1, MAX_PAGE_NUMBER);
  const sig = ((validPage * 2654435761) ^ 0x7f4a7c15) >>> 0;
  return xorEncode(`pn:${validPage}:${sig.toString(16)}`);
}

export function decodePageNumber(token) {
  const decoded = xorDecode(token);
  if (!decoded) return DEFAULT_PAGE_NUMBER;
  const [prefix, pageStr, sigHex] = decoded.split(':');
  if (prefix !== 'pn') return DEFAULT_PAGE_NUMBER;
  const parsedPage = Number.parseInt(pageStr, 10);
  if (Number.isNaN(parsedPage) || parsedPage < 1 || parsedPage > MAX_PAGE_NUMBER) {
    return DEFAULT_PAGE_NUMBER;
  }
  const expectedSig = (((parsedPage * 2654435761) ^ 0x7f4a7c15) >>> 0).toString(16);
  return sigHex === expectedSig ? parsedPage : DEFAULT_PAGE_NUMBER;
}

export function encodePageSize(size = DEFAULT_PAGE_SIZE) {
  const validSize = Number(size) || DEFAULT_PAGE_SIZE;
  const sig = ((validSize * 31337) ^ 0x9e3779b9) >>> 0;
  return xorEncode(`ps:${validSize}:${sig.toString(16)}`);
}

export function decodePageSize(token) {
  const decoded = xorDecode(token);
  if (!decoded) return DEFAULT_PAGE_SIZE;
  const [prefix, sizeStr, sigHex] = decoded.split(':');
  if (prefix !== 'ps') return DEFAULT_PAGE_SIZE;
  const parsedSize = Number.parseInt(sizeStr, 10);
  const expectedSig = (((parsedSize * 31337) ^ 0x9e3779b9) >>> 0).toString(16);
  if (sigHex !== expectedSig) return DEFAULT_PAGE_SIZE;
  return parsedSize === DEFAULT_PAGE_SIZE ? parsedSize : DEFAULT_PAGE_SIZE;
}

function parsePositiveInt(raw, fallback, min = 1, max = MAX_PAGE_NUMBER) {
  if (raw == null || raw === '') return fallback;
  const parsed = Number.parseInt(String(raw), 10);
  if (Number.isNaN(parsed) || parsed < min || parsed > max) return fallback;
  return parsed;
}

function parseOptionalPrice(raw) {
  if (raw == null || raw === '') return null;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed < 0 || parsed > 9999999999) return null;
  return Math.round(parsed);
}

function parseListParam(params, keys, maxItems = 20) {
  const collected = [];
  keys.forEach((key) => {
    params.getAll(key).forEach((entry) => {
      String(entry || '')
        .split(',')
        .map((part) => part.trim())
        .filter(Boolean)
        .forEach((item) => {
          if (!collected.includes(item)) collected.push(item);
        });
    });
  });
  return collected.slice(0, maxItems);
}

export function createDefaultSearchState() {
  return {
    q: '',
    categoryIds: [],
    regionCodes: [],
    minPrice: null,
    maxPrice: null,
    minReputation: null,
    maxMinOrderQty: null,
    supportsCustomPackaging: false,
    inStockOnly: false,
    sort: DEFAULT_SORT,
    pageNumber: DEFAULT_PAGE_NUMBER,
    pageSize: DEFAULT_PAGE_SIZE,
  };
}

export function parseSearchQuery(hashOrSearch = '') {
  const raw = String(hashOrSearch || '');
  const qIndex = raw.indexOf('?');
  const queryString = qIndex >= 0 ? raw.slice(qIndex + 1) : '';
  const params = new URLSearchParams(queryString);

  const rawQ = (params.get('q') ?? '').trim().slice(0, 100);
  const categoryIds = parseListParam(params, ['categoryIds', 'categoryId']).filter(
    (id) => UUID_REGEX.test(id)
  );
  const regionCodes = parseListParam(params, ['regionCodes', 'regions', 'region'])
    .map((code) => code.toUpperCase())
    .filter((code) => code.length >= 2 && code.length <= 20);

  let minPrice = parseOptionalPrice(params.get('minPrice'));
  let maxPrice = parseOptionalPrice(params.get('maxPrice'));
  if (minPrice != null && maxPrice != null && minPrice > maxPrice) {
    const temp = minPrice;
    minPrice = maxPrice;
    maxPrice = temp;
  }

  const rawRep = params.get('minReputation');
  const parsedRep = rawRep != null && rawRep !== '' ? Number(rawRep) : null;
  const minReputation =
    parsedRep != null && Number.isFinite(parsedRep) && parsedRep > 0 && parsedRep <= 100
      ? parsedRep
      : null;

  const rawMoq = params.get('maxMinOrderQty');
  const parsedMoq = rawMoq != null && rawMoq !== '' ? Number.parseInt(rawMoq, 10) : null;
  const maxMinOrderQty =
    parsedMoq != null && Number.isFinite(parsedMoq) && parsedMoq >= 1 && parsedMoq <= 1000000
      ? parsedMoq
      : null;

  const supportsCustomPackaging =
    params.get('supportsCustomPackaging') === 'true' || params.get('custom') === 'true';
  const inStockOnly = params.get('inStockOnly') === 'true';

  const rawSort = params.get('sort') ?? DEFAULT_SORT;
  const sort = ALLOWED_SORTS.has(rawSort) ? rawSort : DEFAULT_SORT;

  const encodedPageToken = params.get(ENCODED_PAGE_NUMBER_PARAM);
  const pageNumber = encodedPageToken
    ? decodePageNumber(encodedPageToken)
    : DEFAULT_PAGE_NUMBER;

  const pageSize = decodePageSize(params.get(ENCODED_PAGE_SIZE_PARAM));

  return {
    q: rawQ,
    categoryIds,
    regionCodes,
    minPrice,
    maxPrice,
    minReputation,
    maxMinOrderQty,
    supportsCustomPackaging,
    inStockOnly,
    sort,
    pageNumber,
    pageSize,
  };
}

export function buildSearchHash(state) {
  const params = new URLSearchParams();
  const q = (state.q ?? '').trim().slice(0, 100);
  if (q) params.set('q', q);

  if (Array.isArray(state.categoryIds) && state.categoryIds.length > 0) {
    params.set('categoryIds', state.categoryIds.join(','));
  }
  if (Array.isArray(state.regionCodes) && state.regionCodes.length > 0) {
    params.set('regionCodes', state.regionCodes.join(','));
  }
  if (state.minPrice != null && state.minPrice > 0) {
    params.set('minPrice', String(state.minPrice));
  }
  if (state.maxPrice != null && state.maxPrice > 0) {
    params.set('maxPrice', String(state.maxPrice));
  }
  if (state.minReputation != null && state.minReputation > 0) {
    params.set('minReputation', String(state.minReputation));
  }
  if (state.maxMinOrderQty != null && state.maxMinOrderQty > 0) {
    params.set('maxMinOrderQty', String(state.maxMinOrderQty));
  }
  if (state.supportsCustomPackaging) {
    params.set('supportsCustomPackaging', 'true');
  }
  if (state.inStockOnly) {
    params.set('inStockOnly', 'true');
  }
  if (state.sort && state.sort !== DEFAULT_SORT) {
    params.set('sort', state.sort);
  }

  params.set(
    ENCODED_PAGE_NUMBER_PARAM,
    encodePageNumber(state.pageNumber || DEFAULT_PAGE_NUMBER)
  );
  params.set(
    ENCODED_PAGE_SIZE_PARAM,
    encodePageSize(state.pageSize || DEFAULT_PAGE_SIZE)
  );

  const query = params.toString();
  return query ? `#tim-kiem?${query}` : '#tim-kiem';
}

export function toApiSearchParams(state) {
  const pageNumber = state.pageNumber || DEFAULT_PAGE_NUMBER;
  const pageSize = Number(state.pageSize) || DEFAULT_PAGE_SIZE;
  const q = (state.q ?? '').trim().slice(0, 100);

  return {
    q: q || undefined,
    categoryIds: state.categoryIds?.length ? state.categoryIds : undefined,
    regionCodes: state.regionCodes?.length ? state.regionCodes : undefined,
    minPrice: state.minPrice != null && state.minPrice > 0 ? state.minPrice : undefined,
    maxPrice: state.maxPrice != null && state.maxPrice > 0 ? state.maxPrice : undefined,
    minReputation:
      state.minReputation != null && state.minReputation > 0 ? state.minReputation : undefined,
    maxMinOrderQty:
      state.maxMinOrderQty != null && state.maxMinOrderQty > 0 ? state.maxMinOrderQty : undefined,
    supportsCustomPackaging: state.supportsCustomPackaging ? true : undefined,
    inStockOnly: state.inStockOnly ? true : undefined,
    sort: state.sort || DEFAULT_SORT,
    page: pageNumber,
    pageNumber,
    pageSize,
  };
}

export function countActiveFilters(state) {
  let count = 0;
  if (state.q?.trim()) count += 1;
  if (state.categoryIds?.length) count += state.categoryIds.length;
  if (state.regionCodes?.length) count += state.regionCodes.length;
  if (state.minPrice != null || state.maxPrice != null) count += 1;
  if (state.minReputation != null && state.minReputation > 0) count += 1;
  if (state.maxMinOrderQty != null && state.maxMinOrderQty > 0) count += 1;
  if (state.supportsCustomPackaging) count += 1;
  if (state.inStockOnly) count += 1;
  return count;
}
