import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

const unwrap = (response) => response?.data ?? response;

export const adminService = {
  async getDashboard() {
    return unwrap(await apiClient.get(API_ENDPOINTS.ADMIN.DASHBOARD_STATS));
  },
  async listSystemConfig() {
    return unwrap(await apiClient.get(API_ENDPOINTS.ADMIN.SYSTEM_CONFIG));
  },
  async setSystemConfig(key, valueJson, description = null) {
    return unwrap(await apiClient.put(API_ENDPOINTS.ADMIN.SYSTEM_CONFIG_ITEM(encodeURIComponent(key)), {
      valueJson,
      description,
    }));
  },
  async listAuditLogs(params = {}) {
    return unwrap(await apiClient.get(API_ENDPOINTS.ADMIN.AUDIT_LOGS, { params }));
  },
  async listShops() {
    return unwrap(await apiClient.get(API_ENDPOINTS.ADMIN.SHOPS));
  },
  async setShopStatus(shopId, status) {
    return unwrap(await apiClient.patch(API_ENDPOINTS.ADMIN.SHOP_STATUS(shopId), { status }));
  },
  async listDepositRules() {
    return unwrap(await apiClient.get(API_ENDPOINTS.ADMIN.CONTRACT_DEPOSIT_RULES));
  },
  async createDepositRule(request) {
    return unwrap(await apiClient.post(API_ENDPOINTS.ADMIN.CONTRACT_DEPOSIT_RULES, request));
  },
  async updateDepositRule(ruleId, request) {
    return unwrap(await apiClient.put(API_ENDPOINTS.ADMIN.CONTRACT_DEPOSIT_RULE(ruleId), request));
  },
  async updateUser(userId, request) {
    return unwrap(await apiClient.patch(API_ENDPOINTS.ADMIN.USER(userId), request));
  },
};

export default adminService;
