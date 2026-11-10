export const DEFAULT_PAGE_NUMBER = 1;
export const DEFAULT_PAGE_SIZE = 9;
export const MAX_PAGE_NUMBER = 1000;
export const PAGE_SIZE_OPTIONS = [9, 18, 36, 72];
export const DEFAULT_SORT = 'relevance';
export const DEFAULT_PRICE_CEILING = 5000000;
export const PRICE_STEP = 10000;

export const SORT_OPTIONS = [
  { value: 'relevance', label: 'Liên quan nhất' },
  { value: 'bestSelling', label: 'Bán chạy nhất' },
  { value: 'newest', label: 'Mới nhất' },
  { value: 'priceAsc', label: 'Giá tăng dần' },
  { value: 'priceDesc', label: 'Giá giảm dần' },
  { value: 'rating', label: 'Đánh giá cao nhất' },
  { value: 'reputation', label: 'Uy tín gian hàng' },
];

export const ALLOWED_SORTS = new Set(SORT_OPTIONS.map((item) => item.value));

export const REPUTATION_OPTIONS = [
  { value: 0, label: 'Tất cả mức uy tín' },
  { value: 80, label: 'Từ 80 điểm trở lên' },
  { value: 90, label: 'Từ 90 điểm (Uy tín cao)' },
  { value: 95, label: 'Từ 95 điểm (Xuất sắc)' },
];

export const MOQ_OPTIONS = [
  { value: 0, label: 'Mọi quy mô đơn hàng' },
  { value: 10, label: 'MOQ ≤ 10 hộp (Đặt linh hoạt)' },
  { value: 20, label: 'MOQ ≤ 20 hộp' },
  { value: 50, label: 'MOQ ≤ 50 hộp' },
  { value: 100, label: 'MOQ ≤ 100 hộp' },
];

export const REGION_LABELS = {
  HCM: 'TP. Hồ Chí Minh',
  HN: 'Hà Nội',
  DN: 'Đà Nẵng',
  'VN-SG': 'TP. Hồ Chí Minh',
  'VN-HN': 'Hà Nội',
  'VN-DN': 'Đà Nẵng',
};

export function resolveRegionLabel(code, fallbackLabel) {
  if (!code) return '';
  return REGION_LABELS[code] ?? fallbackLabel ?? code;
}

