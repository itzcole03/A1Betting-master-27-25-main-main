/**
 * 🚀 PHASE 5: Real Authentication Hook
 * 
 * Replaces mock authentication with real backend integration:
 * - Real JWT token management
 * - Backend API authentication calls
 * - Automatic token refresh
 * - Proper error handling
 */

import { useCallback, useEffect, useState } from 'react';
import { ApiError, apiService } from '../services/ApiService';

interface User {
  id: string;
  name: string;
  email: string;
  tier: string;
  level: number;
  accuracy: number;
  profit: number;
}

interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

interface UseAuthReturn extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: any) => Promise<void>;
  refreshToken: () => Promise<void>;
  clearError: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const [state, setState] = useState<AuthState>({
    token: apiService.getAuthToken(),
    user: null,
    loading: true,
    error: null,
  });

  /**
   * Clear authentication error
   */
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  /**
   * Verify token and get user data on mount
   */
  const verifyToken = useCallback(async () => {
    const token = apiService.getAuthToken();
    
    if (!token) {
      setState(prev => ({ ...prev, loading: false }));
      return;
    }

    try {
//       console.log('🔐 Verifying authentication token...');
      
      // Try to get user profile to verify token
      const response = await apiService.get('/api/auth/profile');
      
      setState(prev => ({
        ...prev,
        user: response.data,
        loading: false,
        error: null,
      }));

//       console.log('✅ Authentication verified:', response.data);

    } catch (error) {
//       console.error('❌ Token verification failed:', error);
      
      // Clear invalid token
      apiService.setAuthToken(null);
      setState(prev => ({
        ...prev,
        token: null,
        user: null,
        loading: false,
        error: 'Session expired. Please log in again.',
      }));
    }
  }, []);

  /**
   * Initialize authentication state
   */
  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  /**
   * Login with real backend authentication
   */
  const login = async (username: string, password: string): Promise<void> => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
//       console.log('🚀 Attempting login for:', username);

      const response = await apiService.login({ username, password });
      
      const { token, user } = response.data;

      // Set token in API service and local storage
      apiService.setAuthToken(token);

      setState({
        token,
        user,
        loading: false,
        error: null,
      });

//       console.log('✅ Login successful:', user);

    } catch (error) {
//       console.error('❌ Login failed:', error);
      
      const apiError = error as ApiError;
      
      setState(prev => ({
        ...prev,
        loading: false,
        error: apiError.message || 'Login failed. Please check your credentials.',
      }));

      throw error;
    }
  };

  /**
   * Logout and clear authentication
   */
  const logout = (): void => {
//     console.log('🚪 Logging out...');

    // Call backend logout endpoint (fire and forget)
    apiService.logout().catch(error => {
//       console.warn('⚠️ Logout API call failed:', error);
    });

    // Clear local state immediately
    apiService.setAuthToken(null);
    setState({
      token: null,
      user: null,
      loading: false,
      error: null,
    });

//     console.log('✅ Logout complete');
  };

  /**
   * Register new user account
   */
  const register = async (userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<void> => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
//       console.log('📝 Attempting registration for:', userData.email);

      const response = await apiService.post('/api/auth/register', userData);
      
      const { token, user } = response.data;

      // Set token in API service and local storage
      apiService.setAuthToken(token);

      setState({
        token,
        user,
        loading: false,
        error: null,
      });

//       console.log('✅ Registration successful:', user);

    } catch (error) {
//       console.error('❌ Registration failed:', error);
      
      const apiError = error as ApiError;
      
      setState(prev => ({
        ...prev,
        loading: false,
        error: apiError.message || 'Registration failed. Please try again.',
      }));

      throw error;
    }
  };

  /**
   * Refresh authentication token
   */
  const refreshToken = async (): Promise<void> => {
    try {
//       console.log('🔄 Refreshing authentication token...');

      const response = await apiService.refreshToken();
      const { token } = response.data;

      // Update token in API service and local storage
      apiService.setAuthToken(token);

      setState(prev => ({
        ...prev,
        token,
        error: null,
      }));

//       console.log('✅ Token refreshed successfully');

    } catch (error) {
//       console.error('❌ Token refresh failed:', error);
      
      // Force logout on refresh failure
      logout();
      
      throw error;
    }
  };

  return {
    ...state,
    login,
    logout,
    register,
    refreshToken,
    clearError,
  };
};



`
