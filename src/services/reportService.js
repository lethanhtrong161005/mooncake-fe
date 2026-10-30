import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

const unwrap = (res) => (res && res.data !== undefined ? (res.data?.data !== undefined ? res.data.data : res.data) : res);

export const reportService = {
  async getDashboardMetrics(timeframe = 'this_month') {
    const response = await apiClient.get(API_ENDPOINTS.REPORTS.DASHBOARD_METRICS, { params: { timeframe } });
    return unwrap(response);
  },

  async getConversionFunnel(timeframe = 'this_month') {
    const response = await apiClient.get(API_ENDPOINTS.REPORTS.CONVERSION_FUNNEL, { params: { timeframe } });
    return unwrap(response);
  },

  async getTopSuppliers() {
    const response = await apiClient.get(API_ENDPOINTS.REPORTS.TOP_SUPPLIERS);
    return unwrap(response);
  },

  async exportReport(format = 'csv') {
    const response = await apiClient.get(API_ENDPOINTS.REPORTS.EXPORT, {
      params: { format },
      responseType: 'blob',
    });
    return unwrap(response);
  },
};

export default reportService;
