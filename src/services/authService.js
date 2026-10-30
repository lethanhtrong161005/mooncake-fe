/**
 * Authentication Service
 * Communicates with ASP.NET Core backend /api/v1/auth
 */

import { API_ENDPOINTS } from '../constants/apiEndpoints';
import storage from '../utils/storage';
import apiClient, { clearAuthSession } from './apiClient';


export const authService = {
  /**
   * Login with Phone number & Password
   */
  async login(phone, password) {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, {
      phoneNumber: phone.trim().replace(/\s+/g, ''),
      password,
    });
    const { accessToken, refreshToken, user } = response?.data || {};
    if (!accessToken || !refreshToken || !user) {
      throw new Error('Phản hồi đăng nhập không hợp lệ.');
    }
    if (!storage.set('auth_token', accessToken) ||
        !storage.set('auth_refresh_token', refreshToken) ||
        !storage.set('auth_user', user)) {
      clearAuthSession();
      throw new Error('Không thể lưu phiên đăng nhập trên trình duyệt.');
    }
    window.dispatchEvent(new CustomEvent('auth:changed'));
    return response;
  },

  /** Registration uses email verification and never falls back to a simulated success. */
  async register({ phone, password, fullName, email }) {
    return apiClient.post(API_ENDPOINTS.AUTH.REGISTER, {
      phone: phone.trim().replace(/\s+/g, ''),
      password, fullName: fullName?.trim(), email: email.trim(), role: 'Customer',
    });
  },

  async resendVerification(email) {
    return apiClient.post(API_ENDPOINTS.AUTH.RESEND_VERIFICATION, { email: email.trim() });
  },

  async verifyEmail(email, code) {
    return apiClient.post(API_ENDPOINTS.AUTH.VERIFY_EMAIL, { email: email.trim(), code });
  },

  /** Create an authorization URL bound to a one-use backend state. */
  async getGoogleAuthorizationUrl() {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.GOOGLE_AUTHORIZATION_URL, {});
    if (!response?.data?.authorizationUrl || !response?.data?.state) {
      throw new Error('Không thể bắt đầu đăng nhập Google. Vui lòng thử lại.');
    }
    return response.data;
  },

  /** Exchange the Google code for Mooncake tokens. Authentication has no mock fallback. */
  async loginWithGoogle(code, state) {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.GOOGLE_LOGIN, { code, state });
    const { accessToken, refreshToken, user } = response?.data || {};
    if (!accessToken || !refreshToken || !user) {
      throw new Error('Phản hồi đăng nhập không hợp lệ.');
    }
    if (!storage.set('auth_token', accessToken) ||
        !storage.set('auth_refresh_token', refreshToken) ||
        !storage.set('auth_user', user)) {
      clearAuthSession(false);
      throw new Error('Không thể lưu phiên đăng nhập trên trình duyệt.');
    }
    window.dispatchEvent(new CustomEvent('auth:changed'));
    return response;
  },

  /**
   * Logout user and clear tokens
   */
  async logout() {
    const refreshToken = storage.get('auth_refresh_token');
    clearAuthSession(false);
    if (refreshToken) {
      try {
        await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT, { refreshToken });
      } catch {
        // Local logout remains complete if the API is unavailable.
      }
    }
  },

  async getMe() {
    const response = await apiClient.get(API_ENDPOINTS.AUTH.ME);
    return response.data;
  },

  /**
   * Get current authenticated user
   */
  getCurrentUser() {
    return storage.get('auth_user', null);
  },

  /**
   * Check if user is logged in
   */
  isAuthenticated() {
    return !!storage.get('auth_token') && !!storage.get('auth_refresh_token');
  },
};

export default authService;
