import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

const unwrap = (response) => response?.data ?? response;

export const supplierService = {
  async apply(request) {
    return unwrap(await apiClient.post(API_ENDPOINTS.SUPPLIERS.APPLY, request));
  },
  async getMyProfile() {
    return unwrap(await apiClient.get(API_ENDPOINTS.SUPPLIERS.MY_PROFILE));
  },
  async listPendingApplications() {
    return unwrap(await apiClient.get(API_ENDPOINTS.SUPPLIERS.PENDING));
  },
  async reviewApplication(profileId, request) {
    return unwrap(await apiClient.post(API_ENDPOINTS.SUPPLIERS.REVIEW(profileId), request));
  },
  async listPromotions() {
    return unwrap(await apiClient.get(API_ENDPOINTS.SUPPLIERS.PROMOTIONS));
  },
  async createPromotion(request) {
    return unwrap(await apiClient.post(API_ENDPOINTS.SUPPLIERS.PROMOTIONS, request));
  },
  async updatePromotion(promotionId, request) {
    return unwrap(await apiClient.put(API_ENDPOINTS.SUPPLIERS.PROMOTION(promotionId), request));
  },
  async deletePromotion(promotionId) {
    return unwrap(await apiClient.delete(API_ENDPOINTS.SUPPLIERS.PROMOTION(promotionId)));
  },
};

export default supplierService;
