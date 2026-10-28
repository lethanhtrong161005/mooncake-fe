import { useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';
import storage from '../utils/storage';
import AuthContext from './authContextStore';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => storage.get('auth_user', null));
  const [token, setToken] = useState(() => storage.get('auth_token', null));
  const [isLoading, setIsLoading] = useState(false);
  const [isRestoring, setIsRestoring] = useState(() => !!storage.get('auth_token'));
  const refreshCurrentUser = useCallback(async () => {
    const expectedUserId = storage.get('auth_user')?.id;
    if (!expectedUserId || !storage.get('auth_token')) return null;
    const current = await authService.getMe();
    if (storage.get('auth_user')?.id === expectedUserId && storage.get('auth_token')) {
      storage.set('auth_user', current);
      setUser(current);
    }
    return current;
  }, []);

  const isLoggedIn = !!token && !!user && !!storage.get('auth_refresh_token');

  // Sync state if storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setUser(storage.get('auth_user', null));
      setToken(storage.get('auth_token', null));
    };
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('auth:changed', handleStorageChange);
    window.addEventListener('auth:unauthorized', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth:changed', handleStorageChange);
      window.removeEventListener('auth:unauthorized', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (!storage.get('auth_token') || !storage.get('auth_refresh_token')) {
      queueMicrotask(() => setIsRestoring(false));
      return;
    }
    Promise.resolve().then(refreshCurrentUser).catch(() => {
      // The client clears an expired session when refresh fails.
    }).finally(() => setIsRestoring(false));
  }, [refreshCurrentUser]);

  const login = async (phone, password) => {
    setIsLoading(true);
    try {
      const res = await authService.login(phone, password);
      const currentUser = storage.get('auth_user');
      const currentToken = storage.get('auth_token');
      setUser(currentUser);
      setToken(currentToken);
      return res;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (code, state) => {
    setIsLoading(true);
    try {
      const res = await authService.loginWithGoogle(code, state);
      setUser(storage.get('auth_user'));
      setToken(storage.get('auth_token'));
      return res;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    const logoutRequest = authService.logout();
    setUser(null);
    setToken(null);
    await logoutRequest;
  };

  const value = {
    user,
    token,
    isLoggedIn,
    isLoading,
    isRestoring,
    refreshCurrentUser,
    login,
    loginWithGoogle,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
