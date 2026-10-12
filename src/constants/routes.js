/**
 * Centralized Route & Navigation Keys Constants
 */

export const ROUTES = {
  // Customer Routes
  HOME: 'trang-chu',
  SEARCH: 'tim-kiem',
  PRODUCT_DETAILS: 'san-pham',
  ORDER_DESIGN: 'dat-hang-thiet-ke',
  PACKAGING_LOGO: 'in-an-bao-bi',
  RFQ_BIDDING: 'so-sanh-bao-gia',
  CONTRACTS: 'hop-dong-tien-do',
  DELIVERY_POD: 'van-chuyen-pod',
  PAYMENT_RATING: 'thanh-toan-danh-gia',
  CUSTOMER_PROFILE: 'ho-so-khach-hang',
  NOTIFICATIONS: 'thong-bao',

  // Supplier Routes
  SUPPLIER_STORE_SETUP: 'nha-cung-cap/thiet-lap-gian-hang',
  SUPPLIER_PRODUCTS: 'nha-cung-cap/quan-ly-san-pham',
  SUPPLIER_BIDDING: 'nha-cung-cap/dau-thau',
  SUPPLIER_ORDERS: 'nha-cung-cap/don-hang',
  SUPPLIER_CONTRACTS: 'nha-cung-cap/hop-dong',
  SUPPLIER_DELIVERY: 'nha-cung-cap/giao-hang',
  SUPPLIER_PROFILE: 'nha-cung-cap/ho-so',

  // Admin Routes
  ADMIN_DASHBOARD: 'admin/dashboard',
  ADMIN_APPROVALS: 'admin/phe-duyet',
  ADMIN_TRADING: 'admin/giao-dich',
  ADMIN_SYSTEM: 'admin/he-thong',
  ADMIN_CONTROLLER: 'admin/kiem-soat',
  ADMIN_PROFILE: 'admin/ho-so',

  // Popups / Modals
  AUTH_LOGIN: 'dang-nhap',
  AUTH_REGISTER: 'dang-ky',
};

// Aliases mapping for backward compatibility
export const ROUTE_ALIASES = {
  'bo-suu-tap-banh': ROUTES.SEARCH,
  'san-pham-co-san': ROUTES.SEARCH,
  'dat-hang-doanh-nghiep': ROUTES.ORDER_DESIGN,
  'yeu-cau-bao-gia': ROUTES.PACKAGING_LOGO,
  'so-sanh-thau-rfq': ROUTES.RFQ_BIDDING,
  'bao-gia-va-so-sanh-thau': ROUTES.RFQ_BIDDING,
  'dang-ky-mau-thu': ROUTES.PRODUCT_DETAILS,
  'danh-gia-va-phe-duyet-mau-thu': ROUTES.PAYMENT_RATING,
  'hop-dong-dien-tu': ROUTES.CONTRACTS,
  'electric-contact': ROUTES.CONTRACTS,
};

export default ROUTES;
