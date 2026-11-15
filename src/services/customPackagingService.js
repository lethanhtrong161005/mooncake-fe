import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

const unwrap = (response) => response?.data ?? response;

export const customPackagingService = {
  async uploadLogo(file) {
    const formData = new FormData();
    formData.append('file', file);
    const res = await apiClient.post(API_ENDPOINTS.ORDERS.CUSTOM_PACKAGING_UPLOAD_LOGO, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 60000,
    });
    return unwrap(res)?.data ?? unwrap(res);
  },
  async create(orderId, request) {
    return unwrap(await apiClient.post(API_ENDPOINTS.ORDERS.CUSTOM_PACKAGING(orderId), request));
  },
  async get(orderId) {
    return unwrap(await apiClient.get(API_ENDPOINTS.ORDERS.CUSTOM_PACKAGING(orderId)));
  },
  async submitRevision(orderId, request) {
    return unwrap(await apiClient.post(API_ENDPOINTS.ORDERS.PACKAGING_REVISIONS(orderId), request));
  },
  async reviewRevision(orderId, revisionId, request) {
    return unwrap(await apiClient.post(
      API_ENDPOINTS.ORDERS.REVIEW_PACKAGING_REVISION(orderId, revisionId),
      request,
    ));
  },
  calculateMockupRevisionInfo(packaging) {
    const revisions = packaging?.revisions || [];
    const nextRevisionNumber = revisions.length > 0
      ? Math.max(...revisions.map((r) => r.revisionNumber || 0)) + 1
      : 1;
    const editNumber = Math.max(0, nextRevisionNumber - 1);
    const freeLimit = packaging?.freeRevisionsLimit ?? 3;
    const freeRemaining = Math.max(0, (freeLimit + 1) - nextRevisionNumber);
    const isSurchargeAllowed = nextRevisionNumber >= 5;

    return {
      nextRevisionNumber,
      editNumber,
      freeRemaining,
      freeLimit,
      isSurchargeAllowed,
      displayText: `Lần sửa thứ ${editNumber} (miễn phí còn ${freeRemaining})`,
    };
  },
};

export default customPackagingService;
