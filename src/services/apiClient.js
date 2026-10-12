/**
 * Centralized Enterprise HTTP API Client using Axios
 * Fully compatible with ASP.NET Core 8 Clean Architecture Web API
 */

import axios from 'axios';
import storage from '../utils/storage';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5043/api';
const DEFAULT_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 15000;
const IS_DEBUG = import.meta.env.VITE_ENABLE_DEBUG_LOGS === 'true';

// Khởi tạo Axios instance với các thiết lập mặc định
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL.replace(/\/$/, ''),
  timeout: DEFAULT_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/**
 * Request Interceptor:
 * - Tự động đính kèm Bearer JWT Token từ storage
 * - Ghi log phục vụ debug trong môi trường phát triển
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = storage.get('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (IS_DEBUG) {
      console.log(
        `[Axios Request] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`,
        config.data || config.params || ''
      );
    }

    return config;
  },
  (error) => {
    if (IS_DEBUG) {
      console.error('[Axios Request Error]', error);
    }
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor:
 * - Trả về dữ liệu payload (response.data) trực tiếp
 * - Bắt và chuẩn hóa lỗi nghiệp vụ từ ASP.NET Core (ApiResponse<T>)
 * - Tự động dọn session khi token hết hạn (401 Unauthorized)
 */
axiosInstance.interceptors.response.use(
  (response) => {
    if (IS_DEBUG) {
      console.log(
        `[Axios Response] ${response.status} ${response.config.url}`,
        response.data
      );
    }
    // Trả về data envelope trực tiếp để các services sử dụng thuận tiện
    return response.data;
  },
  (error) => {
    const { response, code } = error;

    if (IS_DEBUG) {
      console.warn(
        `[Axios Error] ${response?.status || code} ${error.config?.url}:`,
        response?.data || error.message
      );
    }

    // 1. Xử lý Timeout
    if (code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      const timeoutError = new Error('Yêu cầu kết nối quá hạn (Timeout). Vui lòng thử lại!');
      timeoutError.isTimeout = true;
      return Promise.reject(timeoutError);
    }

    // 2. Xử lý phiên hết hạn (401 Unauthorized)
    if (response?.status === 401) {
      storage.remove('auth_token');
      storage.remove('auth_user');
      // Có thể phát custom event để App/AuthContext lắng nghe nếu cần
      window.dispatchEvent(new CustomEvent('auth:unauthorized'));
    }

    // 3. Chuẩn hóa thông điệp lỗi từ Backend ApiResponse<T>
    const backendMessage =
      response?.data?.message ||
      (Array.isArray(response?.data?.errors) && response?.data?.errors.length > 0
        ? response.data.errors[0]
        : null) ||
      error.message ||
      'Lỗi kết nối máy chủ';

    const customError = new Error(backendMessage);
    customError.status = response?.status;
    customError.data = response?.data;
    customError.errors = response?.data?.errors;
    customError.originalError = error;

    return Promise.reject(customError);
  }
);

/**
 * Enterprise ApiClient Wrapper Class
 */
export class ApiClient {
  constructor(instance = axiosInstance) {
    this.instance = instance;
  }

  /**
   * HTTP GET
   */
  get(endpoint, config = {}) {
    return this.instance.get(endpoint, config);
  }

  /**
   * HTTP POST
   */
  post(endpoint, data, config = {}) {
    return this.instance.post(endpoint, data, config);
  }

  /**
   * HTTP PUT
   */
  put(endpoint, data, config = {}) {
    return this.instance.put(endpoint, data, config);
  }

  /**
   * HTTP PATCH
   */
  patch(endpoint, data, config = {}) {
    return this.instance.patch(endpoint, data, config);
  }

  /**
   * HTTP DELETE
   */
  delete(endpoint, config = {}) {
    return this.instance.delete(endpoint, config);
  }
}

export const apiClient = new ApiClient();
export default apiClient;
