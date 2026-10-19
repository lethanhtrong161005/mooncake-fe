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
    CREATE: `/${API_VERSION}/rfqs`,
    LIST: `/${API_VERSION}/rfqs/mine`,
    DETAILS: (id) => `/${API_VERSION}/rfqs/${id}`,
    PUBLISH: (id) => `/${API_VERSION}/rfqs/${id}/publish`,
    CANCEL: (id) => `/${API_VERSION}/rfqs/${id}/cancel`,
    INVITATIONS: (id) => `/${API_VERSION}/rfqs/${id}/invitations`,
    DECLINE: (id) => `/${API_VERSION}/rfqs/${id}/decline`,
    BIDS: (id) => `/${API_VERSION}/rfqs/${id}/bids`,
    CANCEL_BID: (rfqId, bidId) => `/${API_VERSION}/rfqs/${rfqId}/bids/${bidId}/cancel`,
    ACCEPT_BID: (rfqId, bidId) => `/${API_VERSION}/rfqs/${rfqId}/bids/${bidId}/accept`,
  },

  // Orders & PoD Logistics
  ORDERS: {
    CREATE: `/${API_VERSION}/orders`,
    LIST: `/${API_VERSION}/orders`,
    DETAILS: (id) => `/${API_VERSION}/orders/${id}`,
    CANCEL: (id) => `/${API_VERSION}/orders/${id}/cancel`,
    CUSTOMER_LIST: `/${API_VERSION}/orders/mine`,
    SUPPLIER_LIST: `/${API_VERSION}/orders/supplier`,
    CONFIRM: (id) => `/${API_VERSION}/orders/${id}/confirm`,
    REJECT: (id) => `/${API_VERSION}/orders/${id}/reject`,
    PROCESSING: (id) => `/${API_VERSION}/orders/${id}/processing`,
    SHIP: (id) => `/${API_VERSION}/orders/${id}/ship`,
    CONFIRM_DELIVERY: (id) => `/${API_VERSION}/orders/${id}/delivery/confirm`,
  },

  // e-Contract & Escrow Payments
  CONTRACTS: {
    LIST: `/${API_VERSION}/contracts/mine`,
    DETAILS: (id) => `/${API_VERSION}/contracts/${id}`,
    SIGN: (id) => `/${API_VERSION}/contracts/${id}/sign`,
    SIGNATURE_OTP: (id) => `/${API_VERSION}/contracts/${id}/signature-otp`,
    SUBMIT_FOR_SIGNATURE: (id) => `/${API_VERSION}/contracts/${id}/submit-for-signature`,
  },

  PAYMENTS: {
    CREATE: `/${API_VERSION}/payments`,
    LIST: `/${API_VERSION}/payments/mine`,
    CONFIRM: (id) => `/${API_VERSION}/payments/${id}/confirm`,
    REFUND: (id) => `/${API_VERSION}/payments/${id}/refund`,
  },

  // Suppliers & Workshops
  SUPPLIERS: {
    LIST: `/${API_VERSION}/suppliers`,
    DETAILS: (id) => `/${API_VERSION}/suppliers/${id}`,
    APPLY: `/${API_VERSION}/suppliers/me/apply`,
    MY_PROFILE: `/${API_VERSION}/suppliers/me`,
    PENDING: `/${API_VERSION}/suppliers/pending`,
    REVIEW: (profileId) => `/${API_VERSION}/suppliers/${profileId}/review`,
    PROMOTIONS: `/${API_VERSION}/supplier/promotions`,
    PROMOTION: (id) => `/${API_VERSION}/supplier/promotions/${id}`,
  },

  // Admin Portal & Oversight
  ADMIN: {
    DASHBOARD_STATS: `/${API_VERSION}/admin/dashboard`,
    SYSTEM_CONFIG: `/${API_VERSION}/admin/system-config`,
    SYSTEM_CONFIG_ITEM: (key) => `/${API_VERSION}/admin/system-config/${key}`,
    AUDIT_LOGS: `/${API_VERSION}/admin/audit-logs`,
    SHOPS: `/${API_VERSION}/admin/shops`,
    SHOP_STATUS: (shopId) => `/${API_VERSION}/admin/shops/${shopId}/status`,
    CONTRACT_DEPOSIT_RULES: `/${API_VERSION}/admin/contract-deposit-rules`,
    CONTRACT_DEPOSIT_RULE: (ruleId) => `/${API_VERSION}/admin/contract-deposit-rules/${ruleId}`,
    USER: (userId) => `/${API_VERSION}/admin/users/${userId}`,
  },
};

export default API_ENDPOINTS;
