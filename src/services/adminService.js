import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

const unwrap = (res) => (res && res.data !== undefined ? (res.data?.data !== undefined ? res.data.data : res.data) : res);

export const adminService = {
  async getDisputes(params = {}) {
    const response = await apiClient.get(API_ENDPOINTS.DISPUTES.LIST, { params });
    return unwrap(response);
  },

  async resolveDispute(disputeId, payload) {
    const response = await apiClient.post(API_ENDPOINTS.DISPUTES.RESOLVE(disputeId), payload);
    return unwrap(response);
  },

  async getSystemConfigs() {
    const response = await apiClient.get('/v1/admin/system-config');
    return unwrap(response);
  },

  async updateSystemConfig(key, valueJson, description) {
    const response = await apiClient.put(`/v1/admin/system-config/${encodeURIComponent(key)}`, {
      valueJson,
      description,
    });
    return unwrap(response);
  },
};

export default adminService;
