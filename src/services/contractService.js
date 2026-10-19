import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

const unwrap = (response) => response?.data ?? response;

export const contractService = {
  async listMine() {
    return unwrap(await apiClient.get(API_ENDPOINTS.CONTRACTS.LIST));
  },
  async get(contractId) {
    return unwrap(await apiClient.get(API_ENDPOINTS.CONTRACTS.DETAILS(contractId)));
  },
  async requestSignatureOtp(contractId) {
    return unwrap(await apiClient.post(API_ENDPOINTS.CONTRACTS.SIGNATURE_OTP(contractId), {}));
  },
  async submitForSignature(contractId) {
    return unwrap(await apiClient.post(API_ENDPOINTS.CONTRACTS.SUBMIT_FOR_SIGNATURE(contractId), {}));
  },
  async sign(contractId, otpCode, confirmTerms) {
    return unwrap(await apiClient.post(API_ENDPOINTS.CONTRACTS.SIGN(contractId), {
      otpCode,
      confirmTerms,
    }));
  },
};

export default contractService;
