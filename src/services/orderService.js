import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

const unwrap = (response) => response?.data ?? response;

export const orderService = {
  async create(request, idempotencyKey = crypto.randomUUID()) {
    return unwrap(await apiClient.post(API_ENDPOINTS.ORDERS.CREATE, request, {
      headers: { 'Idempotency-Key': idempotencyKey },
    }));
  },
  async listMine() {
    return unwrap(await apiClient.get(API_ENDPOINTS.ORDERS.CUSTOMER_LIST));
  },
  async listSupplierOrders() {
    return unwrap(await apiClient.get(API_ENDPOINTS.ORDERS.SUPPLIER_LIST));
  },
  async get(orderId) {
    return unwrap(await apiClient.get(API_ENDPOINTS.ORDERS.DETAILS(orderId)));
  },
  async cancel(orderId, reason) {
    return unwrap(await apiClient.post(API_ENDPOINTS.ORDERS.CANCEL(orderId), { reason }));
  },
  async confirm(orderId) {
    return unwrap(await apiClient.post(API_ENDPOINTS.ORDERS.CONFIRM(orderId), {}));
  },
  async reject(orderId, reason) {
    return unwrap(await apiClient.post(API_ENDPOINTS.ORDERS.REJECT(orderId), { reason }));
  },
  async startProcessing(orderId) {
    return unwrap(await apiClient.post(API_ENDPOINTS.ORDERS.PROCESSING(orderId), {}));
  },
  async ship(orderId) {
    return unwrap(await apiClient.post(API_ENDPOINTS.ORDERS.SHIP(orderId), {}));
  },
  async confirmDelivery(orderId) {
    return unwrap(await apiClient.post(API_ENDPOINTS.ORDERS.CONFIRM_DELIVERY(orderId), {}));
  },
};

export default orderService;
