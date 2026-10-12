import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import storage from '../utils/storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => storage.get('auth_user', null));
  const [token, setToken] = useState(() => storage.get('auth_token', null));
  const [isLoading, setIsLoading] = useState(false);

  const isLoggedIn = !!token && !!user;

  // Sync state if storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setUser(storage.get('auth_user', null));
      setToken(storage.get('auth_token', null));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = async (phone, password, rememberMe) => {
    setIsLoading(true);
    try {
      const res = await authService.login(phone, password, rememberMe);
      const currentUser = storage.get('auth_user');
      const currentToken = storage.get('auth_token');
      setUser(currentUser);
      setToken(currentToken);
      return res;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (googleToken) => {
    setIsLoading(true);
    try {
      const res = await authService.loginWithGoogle(googleToken);
      setUser(storage.get('auth_user'));
      setToken(storage.get('auth_token'));
      return res;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
  };

  const value = {
    user,
    token,
    isLoggedIn,
    isLoading,
    login,
    loginWithGoogle,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
