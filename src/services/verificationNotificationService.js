import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

const unwrap = (response) => response?.data ?? response;
export const verificationNotificationService = {
  async list(page = 1, signal) {
    return unwrap(await apiClient.get(API_ENDPOINTS.NOTIFICATIONS.LIST, {
      params: { category: 'SupplierVerification', page, pageSize: 20 }, signal,
    }));
  },
  async markRead(id) {
    return unwrap(await apiClient.patch(API_ENDPOINTS.NOTIFICATIONS.READ(id), {}));
  },
  async markAllRead(readThroughToken, key) {
    return unwrap(await apiClient.post(API_ENDPOINTS.NOTIFICATIONS.READ_ALL,
      { category: 'SupplierVerification', readThroughToken },
      { headers: { 'Idempotency-Key': key } }));
  },
};
