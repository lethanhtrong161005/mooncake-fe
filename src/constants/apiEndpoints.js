/**
 * Centralized API Endpoints Constants
 * Standardized for ASP.NET Core 8 Web API backend (Clean Architecture)
 */

export { VERIFICATION_HUB_URL } from './apiConfiguration';

const API_VERSION = import.meta.env.VITE_API_VERSION || 'v1';

export const API_ENDPOINTS = {
  SHOPS: {
    MINE: `/${API_VERSION}/shops/me`,
    MEDIA: `/${API_VERSION}/shops/me/media`,
    APPEARANCE: `/${API_VERSION}/shops/me/appearance`,
    VISIBILITY: `/${API_VERSION}/shops/me/visibility`,
    PREVIEW: `/${API_VERSION}/shops/me/preview`,
    TEMPLATES: `/${API_VERSION}/shop-templates`,
    PUBLIC: (slug) => `/${API_VERSION}/shops/${encodeURIComponent(slug)}`,
    PRODUCTS: (slug) => `/${API_VERSION}/shops/${encodeURIComponent(slug)}/products`,
    CATEGORIES: (slug) => `/${API_VERSION}/shops/${encodeURIComponent(slug)}/categories`,
    REVIEWS: (slug) => `/${API_VERSION}/shops/${encodeURIComponent(slug)}/reviews`,
    ADMIN: `/${API_VERSION}/admin/shops`,
    ADMIN_DETAIL: (id) => `/${API_VERSION}/admin/shops/${id}`,
    MODERATE: (id) => `/${API_VERSION}/admin/shops/${id}/status`,
    ADMIN_TEMPLATES: `/${API_VERSION}/admin/shop-templates`,
    ADMIN_TEMPLATE: (id) => `/${API_VERSION}/admin/shop-templates/${id}`,
    TEMPLATE_AVAILABILITY: (id) => `/${API_VERSION}/admin/shop-templates/${id}/availability`,
    TEMPLATE_PREMIUM: (id) => `/${API_VERSION}/admin/shop-templates/${id}/premium`,
    TEMPLATE_MEDIA: `/${API_VERSION}/admin/shop-templates/media`,
  },
  // Authentication & Users
  AUTH: {
    LOGIN: `/${API_VERSION}/auth/login`,
    REGISTER: `/${API_VERSION}/auth/register`,
    LOGOUT: `/${API_VERSION}/auth/logout`,
    RESEND_VERIFICATION: `/${API_VERSION}/auth/resend-verification`,
    VERIFY_EMAIL: `/${API_VERSION}/auth/verify-email`,
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
    AUTOCOMPLETE: `/${API_VERSION}/products/autocomplete`,
    RECOMMENDATIONS: `/${API_VERSION}/products/recommendations`,
    RELATED: (id) => `/${API_VERSION}/products/${id}/related`,
    VIEW: (id) => `/${API_VERSION}/products/${id}/views`,
    CATEGORIES: `/${API_VERSION}/categories`,
    REGIONS: `/${API_VERSION}/regions`,
    MINE: `/${API_VERSION}/suppliers/me/products`,
    MINE_DETAIL: (id) => `/${API_VERSION}/suppliers/me/products/${id}`,
    VARIANTS: (id) => `/${API_VERSION}/suppliers/me/products/${id}/variants`,
    VARIANT: (id, variantId) => `/${API_VERSION}/suppliers/me/products/${id}/variants/${variantId}`,
    INVENTORY: (id, variantId) => `/${API_VERSION}/suppliers/me/products/${id}/variants/${variantId}/inventory-adjustments`,
    GALLERY: (id) => `/${API_VERSION}/suppliers/me/products/${id}/gallery`,
    PUBLICATION: (id) => `/${API_VERSION}/suppliers/me/products/${id}/publication`,
    MEDIA: `/${API_VERSION}/suppliers/me/product-media`,
  },

  // B2B RFQ (Request for Quote) & Bidding
  RFQ: {
    CREATE: `/${API_VERSION}/rfqs`,
    LIST: `/${API_VERSION}/rfqs/mine`,
    SUPPLIER_LIST: `/${API_VERSION}/rfqs/supplier`,
    DETAILS: (id) => `/${API_VERSION}/rfqs/${id}`,
    PUBLISH: (id) => `/${API_VERSION}/rfqs/${id}/publish`,
    CANCEL: (id) => `/${API_VERSION}/rfqs/${id}/cancel`,
    SUGGESTED_SUPPLIERS: (id) => `/${API_VERSION}/rfqs/${id}/suggested-suppliers`,
    INVITATIONS: (id) => `/${API_VERSION}/rfqs/${id}/invitations`,
    DECLINE: (id) => `/${API_VERSION}/rfqs/${id}/decline`,
    BIDS: (id) => `/${API_VERSION}/rfqs/${id}/bids`,
    CANCEL_BID: (rfqId, bidId) => `/${API_VERSION}/rfqs/${rfqId}/bids/${bidId}/cancel`,
    ACCEPT_BID: (rfqId, bidId) => `/${API_VERSION}/rfqs/${rfqId}/bids/${bidId}/accept`,
  },

  // Orders & PoD Logistics
  ORDERS: {
    CREATE: `/${API_VERSION}/orders`,
    QUOTE_PREVIEW: `/${API_VERSION}/orders/quote-preview`,
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
    CUSTOM_PACKAGING: (id) => `/${API_VERSION}/orders/${id}/custom-packaging`,
    PACKAGING_REVISIONS: (id) => `/${API_VERSION}/orders/${id}/custom-packaging/revisions`,
    REVIEW_PACKAGING_REVISION: (id, revisionId) =>
      `/${API_VERSION}/orders/${id}/custom-packaging/revisions/${revisionId}/review`,
  },

  // e-Contract & Escrow Payments
  CONTRACTS: {
    LIST: `/${API_VERSION}/contracts/mine`,
    DETAILS: (id) => `/${API_VERSION}/contracts/${id}`,
    SIGN: (id) => `/${API_VERSION}/contracts/${id}/sign`,
    SIGNATURE_OTP: (id) => `/${API_VERSION}/contracts/${id}/signature-otp`,
    SUBMIT_FOR_SIGNATURE: (id) => `/${API_VERSION}/contracts/${id}/submit-for-signature`,
    MILESTONES: (id) => `/${API_VERSION}/contracts/${id}/milestones`,
    SUBMIT_PROGRESS: (id, milestoneId) => `/${API_VERSION}/contracts/${id}/milestones/${milestoneId}/submit-progress`,
    VERIFY_MILESTONE: (id, milestoneId) => `/${API_VERSION}/contracts/${id}/milestones/${milestoneId}/verify`,
    EXTENSION_REQUEST: (id) => `/${API_VERSION}/contracts/${id}/extension-request`,
    EXTENSION_RESPOND: (id) => `/${API_VERSION}/contracts/${id}/extension-request/respond`,
    DISPUTE: (id) => `/${API_VERSION}/contracts/${id}/dispute`,
    REQUEST_FINAL_ACCEPTANCE: (id) => `/${API_VERSION}/contracts/${id}/request-final-acceptance`,
    CONFIRM_FINAL_ACCEPTANCE: (id) => `/${API_VERSION}/contracts/${id}/confirm-final-acceptance`,
  },
  ADMIN_CONTRACTS: {
    RESOLVE_DISPUTE: (id) => `/${API_VERSION}/admin/contracts/${id}/resolve-dispute`,
  },

  // Logistics & Proof of Delivery (PoD)
  DELIVERIES: {
    LIST: `/${API_VERSION}/deliveries`,
    DETAILS: (id) => `/${API_VERSION}/deliveries/${id}`,
    CREATE: `/${API_VERSION}/deliveries`,
    STATUS: (id) => `/${API_VERSION}/deliveries/${id}/status`,
    CARRIER_INFO: (id) => `/${API_VERSION}/deliveries/${id}/carrier-info`,
    BY_CONTRACT: (contractId) => `/${API_VERSION}/deliveries/contract/${contractId}`,
    BY_ORDER: (orderId) => `/${API_VERSION}/deliveries/order/${orderId}`,
    PROOFS: (deliveryId) => `/${API_VERSION}/deliveries/${deliveryId}/proofs`,
    PROOF_DETAILS: (proofId) => `/${API_VERSION}/deliveries/proofs/${proofId}`,
    VERIFY_PROOF: (proofId) => `/${API_VERSION}/deliveries/proofs/${proofId}/verify`,
  },

  PAYMENTS: {
    CREATE: `/${API_VERSION}/payments`,
    LIST: `/${API_VERSION}/payments/mine`,
    CONFIRM: (id) => `/${API_VERSION}/payments/${id}/confirm`,
    REFUND: (id) => `/${API_VERSION}/payments/${id}/refund`,
    VNPAY_CREATE_URL: `/${API_VERSION}/payments/vnpay/create-url`,
    ORDER_VNPAY_URL: `/${API_VERSION}/payments/orders/vnpay-url`,
    CONTRACT_VNPAY_URL: `/${API_VERSION}/payments/contracts/vnpay-url`,
    BANK_TRANSFER: `/${API_VERSION}/payments/bank-transfer`,
    VNPAY_RETURN: `/${API_VERSION}/payments/vnpay/return-callback`,
    UPLOAD_EVIDENCE: (id) => `/${API_VERSION}/payments/${id}/evidence`,
    ESCROW_SUMMARY: `/${API_VERSION}/payments/escrow/summary`,
  },

  // Suppliers & Workshops
  SUPPLIERS: {
    LIST: `/${API_VERSION}/suppliers`,
    DETAILS: (id) => `/${API_VERSION}/suppliers/${id}`,
    APPLY: `/${API_VERSION}/suppliers/me/apply`,
    START_ONBOARDING: `/${API_VERSION}/suppliers/me/onboarding`,
    MY_PROFILE: `/${API_VERSION}/suppliers/me`,
    DOCUMENTS: `/${API_VERSION}/suppliers/me/documents`,
    DOCUMENT: (id) => `/${API_VERSION}/suppliers/me/documents/${id}`,
    DOCUMENT_CONTENT: (id) => `/${API_VERSION}/suppliers/documents/${id}/content`,
    APPLICATIONS: `/${API_VERSION}/suppliers/applications`,
    VERIFICATION: (id) => `/${API_VERSION}/suppliers/${id}/verification`,
    HISTORY: (id) => `/${API_VERSION}/suppliers/${id}/history`,
    MY_HISTORY: `/${API_VERSION}/suppliers/me/history`,
    SUBMISSION: (profileId, submissionId) => profileId ?
      `/${API_VERSION}/suppliers/${profileId}/submissions/${submissionId}` :
      `/${API_VERSION}/suppliers/me/submissions/${submissionId}`,
    REVOKE: (id) => `/${API_VERSION}/suppliers/${id}/revoke`,
    PENDING: `/${API_VERSION}/suppliers/pending`,
    REVIEW: (profileId) => `/${API_VERSION}/suppliers/${profileId}/review`,
    PROMOTIONS: `/${API_VERSION}/supplier/promotions`,
    PROMOTION: (id) => `/${API_VERSION}/supplier/promotions/${id}`,
  },

  // Admin Portal & Oversight
  NOTIFICATIONS: {
    LIST: `/${API_VERSION}/notifications`,
    READ: (id) => `/${API_VERSION}/notifications/${id}/read`,
    READ_ALL: `/${API_VERSION}/notifications/read-all`,
  },
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

  // Module 8: Reviews & Reputation Management
  REVIEWS: {
    TRANSACTION: `/${API_VERSION}/reviews/transaction`,
    ELIGIBLE_ORDERS: `/${API_VERSION}/reviews/transaction/eligible-orders`,
    TRANSACTION_REPLY: (reviewId) => `/${API_VERSION}/reviews/transaction/${reviewId}/reply`,
    SHOP_REVIEWS: (slug) => `/${API_VERSION}/reviews/shops/${encodeURIComponent(slug)}`,
    SUPPLIER_REPUTATION: (supplierId) => `/${API_VERSION}/reviews/suppliers/${supplierId}/reputation`,
    ADMIN_ADJUST_REPUTATION: (supplierId) => `/${API_VERSION}/reviews/admin/suppliers/${supplierId}/reputation/adjustment`,
    ADMIN_MODERATE: (reviewId) => `/${API_VERSION}/reviews/admin/${reviewId}/moderate`,
    PRODUCT_REVIEWS: (productId) => `/${API_VERSION}/products/${productId}/reviews`,
    PRODUCT_ELIGIBLE_ITEMS: (productId) => `/${API_VERSION}/products/${productId}/eligible-order-items`,
    PRODUCT_REVIEW_LIKE: (reviewId) => `/${API_VERSION}/products/reviews/${reviewId}/like`,
    PRODUCT_REVIEW_REPLY: (reviewId) => `/${API_VERSION}/products/reviews/${reviewId}/reply`,
  },

  // Module 9: AI Chatbot & Sales Analytics
  AI: {
    CHAT_SESSIONS: `/${API_VERSION}/ai/chat/sessions`,
    CHAT_MESSAGES: `/${API_VERSION}/ai/chat/messages`,
    CHAT_HISTORY: (sessionToken) => `/${API_VERSION}/ai/chat/sessions/${encodeURIComponent(sessionToken)}/history`,
    CHAT_END: (sessionToken) => `/${API_VERSION}/ai/chat/sessions/${encodeURIComponent(sessionToken)}`,
    ANALYTICS_GENERATE: `/${API_VERSION}/ai/analytics/generate`,
    ANALYTICS_REPORTS: `/${API_VERSION}/ai/analytics/reports`,
    ANALYTICS_REPORT_DETAIL: (id) => `/${API_VERSION}/ai/analytics/reports/${id}`,
    ANALYTICS_DASHBOARD_SUMMARY: `/${API_VERSION}/ai/analytics/dashboard-summary`,
  },

  // Module 11: Real-time Notifications, Admin Operations & Reports
  NOTIFICATIONS: {
    LIST: `/${API_VERSION}/notifications`,
    UNREAD_COUNT: `/${API_VERSION}/notifications/unread-count`,
    MARK_READ: (id) => `/${API_VERSION}/notifications/${id}/read`,
    MARK_ALL_READ: `/${API_VERSION}/notifications/read-all`,
    PREFERENCES: `/${API_VERSION}/notifications/preferences`,
    HUB_URL: `/${API_VERSION}/hubs/notifications`,
  },
  DISPUTES: {
    LIST: `/${API_VERSION}/admin/disputes`,
    RESOLVE: (id) => `/${API_VERSION}/admin/disputes/${id}/resolve`,
    CONTRACT_RESOLVE: (contractId) => `/${API_VERSION}/admin/contracts/${contractId}/resolve-dispute`,
  },
  REPORTS: {
    DASHBOARD_METRICS: `/${API_VERSION}/reports/dashboard-metrics`,
    CONVERSION_FUNNEL: `/${API_VERSION}/reports/conversion-funnel`,
    TOP_SUPPLIERS: `/${API_VERSION}/reports/top-suppliers`,
    EXPORT: `/${API_VERSION}/reports/export`,
    AI_SUMMARY: `/${API_VERSION}/reports/ai-summary`,
  },
};

export default API_ENDPOINTS;
