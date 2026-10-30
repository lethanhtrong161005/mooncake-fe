/** Centralized Axios client with one refresh request for concurrent 401 responses. */

import axios from 'axios';
import { API_ENDPOINTS } from '../constants/apiEndpoints';
import { API_BASE_URL } from '../constants/apiConfiguration';
import storage from '../utils/storage';

const DEFAULT_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 15000;
const IS_DEBUG = import.meta.env.VITE_ENABLE_DEBUG_LOGS === 'true';
const AUTH_PATHS = [
  API_ENDPOINTS.AUTH.LOGIN,
  API_ENDPOINTS.AUTH.REGISTER,
  API_ENDPOINTS.AUTH.REFRESH_TOKEN,
  API_ENDPOINTS.AUTH.LOGOUT,
  API_ENDPOINTS.AUTH.RESEND_VERIFICATION,
  API_ENDPOINTS.AUTH.VERIFY_EMAIL,
  API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
  API_ENDPOINTS.AUTH.GOOGLE_LOGIN,
  API_ENDPOINTS.AUTH.GOOGLE_AUTHORIZATION_URL,
];

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL.replace(/\/$/, ''),
  timeout: DEFAULT_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

let refreshPromise = null;

export const clearAuthSession = (showLogin = true) => {
  storage.remove('auth_token');
  storage.remove('auth_refresh_token');
  storage.remove('auth_user');
  window.dispatchEvent(new CustomEvent(showLogin ? 'auth:unauthorized' : 'auth:changed'));
};

const saveTokenPair = ({ accessToken, refreshToken }) => {
  if (!accessToken || !refreshToken) {
    throw new Error('Phản hồi xác thực không hợp lệ.');
  }
  if (!storage.set('auth_token', accessToken) ||
      !storage.set('auth_refresh_token', refreshToken)) {
    clearAuthSession();
    throw new Error('Không thể lưu phiên đăng nhập trên trình duyệt.');
  }
  window.dispatchEvent(new CustomEvent('auth:changed'));
};

export const refreshAccessToken = () => {
  if (refreshPromise) return refreshPromise;

  const currentRefreshToken = storage.get('auth_refresh_token');
  if (!currentRefreshToken) {
    return Promise.reject(new Error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.'));
  }

  refreshPromise = axiosInstance.post(
    API_ENDPOINTS.AUTH.REFRESH_TOKEN,
    { refreshToken: currentRefreshToken },
    { skipAuthHeader: true, skipAuthRefresh: true }
  ).then((response) => {
    if (storage.get('auth_refresh_token') !== currentRefreshToken) {
      throw new Error('Phiên đăng nhập đã kết thúc.');
    }
    saveTokenPair(response?.data || {});
    return response.data.accessToken;
  }).finally(() => {
    refreshPromise = null;
  });

  return refreshPromise;
};

axiosInstance.interceptors.request.use((config) => {
  if (config.data instanceof FormData) config.headers.delete('Content-Type');
  if (!config.skipAuthHeader && !AUTH_PATHS.includes(config.url)) {
    const token = storage.get('auth_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }

  if (IS_DEBUG) {
    console.log(`[Axios Request] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const { response, config = {}, code } = error;
    const isAuthPath = AUTH_PATHS.includes(config.url);
    const refreshToken = storage.get('auth_refresh_token');

    if (response?.status === 401 && !isAuthPath && !config.skipAuthRefresh &&
        !config.authRetried && refreshToken) {
      config.authRetried = true;
      try {
        const sentToken = config.headers?.Authorization?.replace(/^Bearer /, '');
        const currentToken = storage.get('auth_token');
        const nextToken = sentToken && currentToken && sentToken !== currentToken
          ? currentToken : await refreshAccessToken();
        config.headers.Authorization = `Bearer ${nextToken}`;
        return await axiosInstance(config);
      } catch (refreshError) {
        if (storage.get('auth_refresh_token') === refreshToken) clearAuthSession();
        if (refreshError?.status === 401) throw refreshError;
        throw new Error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.', {
          cause: refreshError,
        });
      }
    }

    if (response?.status === 401 && !isAuthPath && !config.skipAuthRefresh &&
        storage.get('auth_token')) {
      clearAuthSession();
    }

    let responseData = response?.data;
    if (responseData instanceof Blob && responseData.type.includes('json')) {
      try { responseData = JSON.parse(await responseData.text()); } catch { /* Keep the generic transport error. */ }
    }
    let message = responseData?.message || responseData?.errors?.[0];
    if (!message && response?.status === 401) {
      message = 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.';
    }
    if (!message && (code === 'ECONNABORTED' || error.message?.includes('timeout'))) {
      message = 'Kết nối quá thời gian chờ. Vui lòng thử lại.';
    }
    if (!message && !response) {
      message = 'Không thể kết nối đến máy chủ. Vui lòng thử lại.';
    }
    const normalized = new Error(message || 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại sau.');
    normalized.status = response?.status;
    normalized.errorCode = responseData?.errorCode;
    normalized.retryAfter = response?.headers?.['retry-after'];
    normalized.data = response?.data;
    normalized.originalError = error;
    return Promise.reject(normalized);
  }
);

export class ApiClient {
  constructor(instance = axiosInstance) {
    this.instance = instance;
  }

  get(endpoint, config = {}) {
    return this.instance.get(endpoint, config);
  }

  post(endpoint, data, config = {}) {
    return this.instance.post(endpoint, data, config);
  }

  put(endpoint, data, config = {}) {
    return this.instance.put(endpoint, data, config);
  }

  patch(endpoint, data, config = {}) {
    return this.instance.patch(endpoint, data, config);
  }

  delete(endpoint, config = {}) {
    return this.instance.delete(endpoint, config);
  }
}

export const apiClient = new ApiClient();
export const getValidAccessToken = async () => {
  const token = storage.get('auth_token');
  if (!token || !storage.get('auth_refresh_token')) throw new Error('Session ended.');
  try {
    const encoded = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const expires = JSON.parse(atob(encoded)).exp;
    if (Number(expires) * 1000 > Date.now() + 30000) return token;
  } catch { /* Refresh an unreadable or expiring token through the regular single-flight request. */ }
  return refreshAccessToken();
};
export default apiClient;
