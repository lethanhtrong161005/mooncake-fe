/**
 * Centralized API Endpoints Constants
 * Standardized for ASP.NET Core 8 Web API backend (Clean Architecture)
 */

const API_VERSION = import.meta.env.VITE_API_VERSION || 'v1';

export const API_ENDPOINTS = {
  // Authentication & Users
  AUTH: {
    LOGIN: `/${API_VERSION}/auth/login`,
    REGISTER: `/${API_VERSION}/auth/register`,
    LOGOUT: `/${API_VERSION}/auth/logout`,
    SEND_OTP: `/${API_VERSION}/auth/send-otp`,
    VERIFY_OTP: `/${API_VERSION}/auth/verify-otp`,
    FORGOT_PASSWORD: `/${API_VERSION}/auth/forgot-password`,
    GOOGLE_AUTHORIZATION_URL: `/${API_VERSION}/auth/google/authorization-url`,
    GOOGLE_LOGIN: `/${API_VERSION}/auth/google/login`,
    REFRESH_TOKEN: `/${API_VERSION}/auth/refresh-token`,
    ME: `/${API_VERSION}/auth/me`,
    PROFILE: `/${API_VERSION}/users/profile`,
  },

  // Products & Catalogs
  PRODUCTS: {
    LIST: `/${API_VERSION}/products`,
    DETAILS: (id) => `/${API_VERSION}/products/${id}`,
    FEATURED: `/${API_VERSION}/products/featured`,
    CATEGORIES: `/${API_VERSION}/categories`,
    SUPPLIER_PRODUCTS: (supplierId) => `/${API_VERSION}/suppliers/${supplierId}/products`,
  },

  // B2B RFQ (Request for Quote) & Bidding
  RFQ: {
    CREATE: `/${API_VERSION}/rfq`,
    LIST: `/${API_VERSION}/rfq`,
    DETAILS: (id) => `/${API_VERSION}/rfq/${id}`,
    QUOTES: (rfqId) => `/${API_VERSION}/rfq/${rfqId}/quotes`,
    COMPARE: (rfqId) => `/${API_VERSION}/rfq/${rfqId}/compare`,
    ACCEPT_QUOTE: (rfqId, quoteId) => `/${API_VERSION}/rfq/${rfqId}/quotes/${quoteId}/accept`,
  },

  // Orders & PoD Logistics
  ORDERS: {
    CREATE: `/${API_VERSION}/orders`,
    LIST: `/${API_VERSION}/orders`,
    DETAILS: (id) => `/${API_VERSION}/orders/${id}`,
    CANCEL: (id) => `/${API_VERSION}/orders/${id}/cancel`,
    TRACKING_POD: (id) => `/${API_VERSION}/orders/${id}/tracking`,
    SAMPLE_BOX: `/${API_VERSION}/orders/sample-box`,
  },

  // e-Contract & Escrow Payments
  CONTRACTS: {
    LIST: `/${API_VERSION}/contracts`,
    DETAILS: (id) => `/${API_VERSION}/contracts/${id}`,
    SIGN: (id) => `/${API_VERSION}/contracts/${id}/sign`,
    MILESTONES: (id) => `/${API_VERSION}/contracts/${id}/milestones`,
    ESCROW_STATUS: (id) => `/${API_VERSION}/contracts/${id}/escrow`,
  },

  // Suppliers & Workshops
  SUPPLIERS: {
    LIST: `/${API_VERSION}/suppliers`,
    DETAILS: (id) => `/${API_VERSION}/suppliers/${id}`,
    STORE_SETUP: `/${API_VERSION}/suppliers/store-setup`,
    INVENTORY: `/${API_VERSION}/suppliers/inventory`,
  },

  // Admin Portal & Oversight
  ADMIN: {
    DASHBOARD_STATS: `/${API_VERSION}/admin/dashboard`,
    APPROVE_SUPPLIERS: `/${API_VERSION}/admin/approvals/suppliers`,
    APPROVE_PRODUCTS: `/${API_VERSION}/admin/approvals/products`,
    SYSTEM_CONFIG: `/${API_VERSION}/admin/system/config`,
  },
};

export default API_ENDPOINTS;
