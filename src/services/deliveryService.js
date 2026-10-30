import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

const unwrap = (response) => response?.data?.data ?? response?.data ?? response;

export const deliveryService = {
  async listMine() {
    return unwrap(await apiClient.get(API_ENDPOINTS.DELIVERIES.LIST));
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

  async submitProof(deliveryId, payload) {
    return unwrap(await apiClient.post(API_ENDPOINTS.DELIVERIES.PROOFS(deliveryId), payload));
  },

  async getProofs(deliveryId) {
    return unwrap(await apiClient.get(API_ENDPOINTS.DELIVERIES.PROOFS(deliveryId)));
  },

  async verifyProof(proofId) {
    return unwrap(await apiClient.get(API_ENDPOINTS.DELIVERIES.VERIFY_PROOF(proofId)));
  },
};

export default deliveryService;
