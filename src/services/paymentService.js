import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

const unwrap = (response) => response?.data ?? response;

export const paymentService = {
  async create(request, idempotencyKey = crypto.randomUUID()) {
    return unwrap(await apiClient.post(API_ENDPOINTS.PAYMENTS.CREATE, request, {
      headers: { 'Idempotency-Key': idempotencyKey },
    }));
  },
  async listMine() {
    return unwrap(await apiClient.get(API_ENDPOINTS.PAYMENTS.LIST));
  },
  async confirm(paymentId, reason) {
    return unwrap(await apiClient.post(API_ENDPOINTS.PAYMENTS.CONFIRM(paymentId), { reason }));
  },
  async refund(paymentId, reason) {
    return unwrap(await apiClient.post(API_ENDPOINTS.PAYMENTS.REFUND(paymentId), { reason }));
  },
};

export default paymentService;
