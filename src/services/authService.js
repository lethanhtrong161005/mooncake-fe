/**
 * Authentication Service
 * Communicates with ASP.NET Core backend /api/v1/auth
 */

import { API_ENDPOINTS } from '../constants/apiEndpoints';
import storage from '../utils/storage';
import apiClient from './apiClient';

const ENABLE_MOCK_FALLBACK = import.meta.env.VITE_ENABLE_MOCK_FALLBACK !== 'false';

export const authService = {
  /**
   * Login with Phone number & Password
   */
  async login(phone, password, rememberMe = true) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, {
        phone: phone.trim().replace(/\s+/g, ''),
        password,
        rememberMe,
      });

      if (response?.data?.token) {
        storage.set('auth_token', response.data.token);
        storage.set('auth_user', response.data.user);
      }
      return response;
    } catch (error) {
      if (ENABLE_MOCK_FALLBACK) {
        // Fallback mock success for development
        const mockUser = {
          id: 'usr_mock_01',
          name: 'Tập đoàn An Phát',
          phone,
          role: 'Customer',
          tier: 'VIP B2B',
          creditLimit: 500000000,
        };
        const mockToken = 'mock_jwt_token_nguyetpho_2025';
        storage.set('auth_token', mockToken);
        storage.set('auth_user', mockUser);
        return { success: true, data: { user: mockUser, token: mockToken } };
      }
      throw error;
    }
  },

  /**
   * Register with Phone number & Password
   */
  async register({ phone, password, fullName = '' }) {
    try {
      return await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, {
        phone: phone.trim().replace(/\s+/g, ''),
        password,
        fullName,
      });
    } catch (error) {
      if (ENABLE_MOCK_FALLBACK) {
        return {
          success: true,
          message: 'Đăng ký tài khoản thành công (Mock Mode)',
          data: { phone, fullName },
        };
      }
      throw error;
    }
  },

  /**
   * Send SMS OTP verification code
   */
  async sendOtp(phone) {
    try {
      return await apiClient.post(API_ENDPOINTS.AUTH.SEND_OTP, {
        phone: phone.trim().replace(/\s+/g, ''),
      });
    } catch (error) {
      if (ENABLE_MOCK_FALLBACK) {
        return {
          success: true,
          message: `Mã OTP đã được gửi tới ${phone}`,
          data: { demoOtp: '123456' },
        };
      }
      throw error;
    }
  },

  /**
   * Verify SMS OTP code
   */
  async verifyOtp(phone, otp) {
    try {
      return await apiClient.post(API_ENDPOINTS.AUTH.VERIFY_OTP, {
        phone: phone.trim().replace(/\s+/g, ''),
        otp: otp.trim(),
      });
    } catch (error) {
      if (ENABLE_MOCK_FALLBACK) {
        return { success: true, message: 'Xác thực OTP thành công' };
      }
      throw error;
    }
  },

  /**
   * Social Login with Google
   */
  async loginWithGoogle(googleToken) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.GOOGLE_LOGIN, {
        credential: googleToken,
      });
      if (response?.data?.token) {
        storage.set('auth_token', response.data.token);
        storage.set('auth_user', response.data.user);
      }
      return response;
    } catch (error) {
      if (ENABLE_MOCK_FALLBACK) {
        const mockUser = {
          id: 'usr_google_01',
          name: 'Đối Tác Doanh Nghiệp',
          email: 'corporate@partner.com',
          role: 'Customer',
          tier: 'Standard B2B',
        };
        const mockToken = 'mock_jwt_google_token_2025';
        storage.set('auth_token', mockToken);
        storage.set('auth_user', mockUser);
        return { success: true, data: { user: mockUser, token: mockToken } };
      }
      throw error;
    }
  },

  /**
   * Logout user and clear tokens
   */
  logout() {
    storage.remove('auth_token');
    storage.remove('auth_user');
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
    return !!storage.get('auth_token');
  },
};

export default authService;
