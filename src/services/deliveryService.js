import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

const unwrap = (response) => response?.data?.data ?? response?.data ?? response;
const toListPage = (response, params = {}) => {
  const result = unwrap(response);
  if (!Array.isArray(result)) return result;

  const query = String(params.q || '').trim().toLocaleLowerCase();
  const filtered = result.filter((delivery) => {
    const searchable = `${delivery.deliveryNumber || ''} ${delivery.deliveryCode || ''} ${delivery.contractNumber || ''} ${delivery.trackingCode || ''}`;
    return (!query || searchable.toLocaleLowerCase().includes(query)) &&
      (!params.status || delivery.status === params.status);
  });
  const page = Math.max(1, Number(params.page) || 1);
  const pageSize = Math.max(1, Number(params.pageSize) || 10);
  const start = (page - 1) * pageSize;
  return { items: filtered.slice(start, start + pageSize), totalCount: filtered.length };
};

export const deliveryService = {
  async listMine() {
    return unwrap(await apiClient.get(API_ENDPOINTS.DELIVERIES.LIST));
  },
  async listMinePaged(params = {}, signal) {
    return toListPage(await apiClient.get(API_ENDPOINTS.DELIVERIES.LIST, { params, signal }), params);
  },

  async get(id) {
    return unwrap(await apiClient.get(API_ENDPOINTS.DELIVERIES.DETAILS(id)));
  },

  async getByContract(contractId) {
    return unwrap(await apiClient.get(API_ENDPOINTS.DELIVERIES.BY_CONTRACT(contractId)));
  },

  async getByOrder(orderId) {
    return unwrap(await apiClient.get(API_ENDPOINTS.DELIVERIES.BY_ORDER(orderId)));
  },

  async create(payload) {
    return unwrap(await apiClient.post(API_ENDPOINTS.DELIVERIES.CREATE, payload));
  },

  async updateStatus(id, status, notes = '', actualDeliveryDate = null) {
    return unwrap(
      await apiClient.put(API_ENDPOINTS.DELIVERIES.STATUS(id), {
        status,
        notes,
        actualDeliveryDate,
      })
    );
  },

  async updateCarrierInfo(id, payload) {
    return unwrap(await apiClient.put(API_ENDPOINTS.DELIVERIES.CARRIER_INFO(id), payload));
  },

  async uploadProofImage(file) {
    const formData = new FormData();
    formData.append('file', file);
    return unwrap(
      await apiClient.post(API_ENDPOINTS.ORDERS.CUSTOM_PACKAGING_UPLOAD_LOGO, formData, {
        timeout: 60000,
      })
    );
  },

  async submitProof(deliveryId, payload) {
    return unwrap(await apiClient.post(API_ENDPOINTS.DELIVERIES.PROOFS(deliveryId), payload));
  },

  async getProofs(deliveryId) {
    return unwrap(await apiClient.get(API_ENDPOINTS.DELIVERIES.PROOFS(deliveryId)));
  },

  async verifyProof(proofId) {
    return unwrap(await apiClient.get(API_ENDPOINTS.DELIVERIES.VERIFY_PROOF(proofId)));
  },

  async getShareLink(deliveryId) {
    return unwrap(await apiClient.get(API_ENDPOINTS.DELIVERIES.SHARE_LINK(deliveryId)));
  },

  async createShareLink(deliveryId, payload = { expiresInHours: 24, reshare: false }) {
    return unwrap(await apiClient.post(API_ENDPOINTS.DELIVERIES.SHARE_LINK(deliveryId), payload));
  },

  async revokeShareLink(deliveryId) {
    return unwrap(await apiClient.delete(API_ENDPOINTS.DELIVERIES.SHARE_LINK(deliveryId)));
  },

  async getPublicByToken(token) {
    return unwrap(
      await apiClient.get(API_ENDPOINTS.DELIVERIES.PUBLIC_DRIVER(token), {
        skipAuthHeader: true,
        skipAuthRefresh: true,
      })
    );
  },

  async uploadPublicProofPhoto(token, file) {
    const formData = new FormData();
    formData.append('file', file);
    return unwrap(
      await apiClient.post(API_ENDPOINTS.DELIVERIES.PUBLIC_DRIVER_UPLOAD_PHOTO(token), formData, {
        skipAuthHeader: true,
        skipAuthRefresh: true,
        timeout: 60000,
      })
    );
  },

  async submitPublicProof(token, payload) {
    return unwrap(
      await apiClient.post(API_ENDPOINTS.DELIVERIES.PUBLIC_DRIVER_PROOFS(token), payload, {
        skipAuthHeader: true,
        skipAuthRefresh: true,
        timeout: 30000,
      })
    );
  },
};

export default deliveryService;
