export const PUBLIC_ROUTES = new Set(['trang-chu', 'tim-kiem', 'bo-suu-tap-banh', 'san-pham']);

export const CUSTOMER_ROUTES = new Set([
  'dat-hang-thiet-ke', 'dat-hang-doanh-nghiep', 'don-hang-cua-toi',
  'in-an-bao-bi', 'yeu-cau-bao-gia', 'so-sanh-bao-gia', 'so-sanh-thau-rfq',
  'hop-dong-tien-do', 'hop-dong-dien-tu', 'giao-hang-pod', 'van-chuyen-pod',
  'thanh-toan-danh-gia',
  'danh-gia-va-phe-duyet-mau-thu', 'thanh-toan/ket-qua', 'ket-qua-thanh-toan',
  'ho-so-khach-hang',
]);

export const AUTHENTICATED_ROUTES = new Set(['thong-bao', 'san-pham-yeu-thich', 'tin-nhan']);
export const DRIVER_ROUTES = new Set(['driver-delivery-view', 'driver-pod']);

export const ONBOARDING_ROUTES = new Set([
  'dang-ky-nha-cung-cap', 'nha-cung-cap/xac-minh', 'nha-cung-cap/ho-so',
]);

export const SUPPLIER_ROUTES = new Set([
  'nha-cung-cap', 'nha-cung-cap/dashboard', 'nha-cung-cap/thiet-lap-gian-hang',
  'nha-cung-cap/giao-dien-gian-hang', 'nha-cung-cap/quan-ly-san-pham',
  'nha-cung-cap/dau-thau', 'nha-cung-cap/don-hang',
  'nha-cung-cap/quan-ly-don-hang', 'nha-cung-cap/quan-ly-hop-dong',
  'nha-cung-cap/quan-ly-giao-hang', 'nha-cung-cap/khuyen-mai',
  'nha-cung-cap/quan-ly-khuyen-mai', 'nha-cung-cap/tin-nhan',
]);

export const ADMIN_ROUTES = new Set([
  'admin/dashboard', 'admin/phe-duyet', 'admin/van-hanh-giao-dich',
  'admin/kiem-soat-he-thong', 'admin/dieu-khien', 'admin/gian-hang',
  'admin/mau-gian-hang', 'admin/ho-so',
]);

export function isPublicRoute(route) {
  return PUBLIC_ROUTES.has(route) || route.startsWith('san-pham/') || route.startsWith('shop/');
}

export function isKnownRoute(route) {
  return isPublicRoute(route) || AUTHENTICATED_ROUTES.has(route) || DRIVER_ROUTES.has(route) || CUSTOMER_ROUTES.has(route) ||
    ONBOARDING_ROUTES.has(route) || SUPPLIER_ROUTES.has(route) || ADMIN_ROUTES.has(route);
}
