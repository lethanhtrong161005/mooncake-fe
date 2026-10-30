import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

const unwrap = (response) => response?.data ?? response;

export const supplierService = {
  async startOnboarding() {
    return unwrap(await apiClient.post(API_ENDPOINTS.SUPPLIERS.START_ONBOARDING, {}));
  },
  async apply(request, key) {
    return unwrap(await apiClient.post(API_ENDPOINTS.SUPPLIERS.APPLY, request, {
      headers: { 'Idempotency-Key': key },
    }));
  },
  async getMyProfile(config = {}) {
    return unwrap(await apiClient.get(API_ENDPOINTS.SUPPLIERS.MY_PROFILE, config));
  },
  async listPendingApplications() {
    return unwrap(await apiClient.get(API_ENDPOINTS.SUPPLIERS.PENDING));
  },
  async reviewApplication(profileId, request, key) {
    return unwrap(await apiClient.post(API_ENDPOINTS.SUPPLIERS.REVIEW(profileId), request, {
      headers: { 'Idempotency-Key': key },
    }));
  },
  async listApplications(params = {}, signal) {
    return unwrap(await apiClient.get(API_ENDPOINTS.SUPPLIERS.APPLICATIONS, { params, signal }));
  },
  async getVerification(id) {
    return unwrap(await apiClient.get(API_ENDPOINTS.SUPPLIERS.VERIFICATION(id)));
  },
  async getSubmission(profileId, submissionId) {
    return unwrap(await apiClient.get(API_ENDPOINTS.SUPPLIERS.SUBMISSION(profileId, submissionId)));
  },
  async history(profileId, page = 1, signal) {
    return unwrap(await apiClient.get(profileId ? API_ENDPOINTS.SUPPLIERS.HISTORY(profileId) :
      API_ENDPOINTS.SUPPLIERS.MY_HISTORY, { params: { page, pageSize: 20 }, signal }));
  },
  async revoke(id, request, key) {
    return unwrap(await apiClient.post(API_ENDPOINTS.SUPPLIERS.REVOKE(id), request, {
      headers: { 'Idempotency-Key': key },
    }));
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
