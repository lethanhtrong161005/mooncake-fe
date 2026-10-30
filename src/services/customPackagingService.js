import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

const unwrap = (response) => response?.data ?? response;

export const customPackagingService = {
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
};

export default customPackagingService;
