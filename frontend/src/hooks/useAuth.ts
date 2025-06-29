import { useState, useEffect } from 'react';

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
}

interface UseAuthReturn extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: any) => Promise<void>;
}

export const useAuth = (): UseAuthReturn => {
  const [state, setState] = useState<AuthState>({
    token: localStorage.getItem('token'),
    user: null,
    loading: true,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Simulate API call to verify token and get user data
      setTimeout(() => {
        setState(prev => ({
          ...prev,
          user: {
            id: '1',
            name: 'Quantum User',
            email: 'user@quantum.ai',
            tier: 'NEURAL',
            level: 47,
            accuracy: 87.3,
            profit: 24750,
          },
          loading: false,
        }));
      }, 1000);
    } else {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const login = async (username: string, password: string): Promise<void> => {
    setState(prev => ({ ...prev, loading: true }));

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const mockToken = 'mock_jwt_token_' + Date.now();
      const mockUser: User = {
        id: '1',
        name: 'Quantum User',
        email: username,
        tier: 'NEURAL',
        level: 47,
        accuracy: 87.3,
        profit: 24750,
      };

      localStorage.setItem('token', mockToken);
      setState({
        token: mockToken,
        user: mockUser,
        loading: false,
      });
    } catch (error) {
      setState(prev => ({ ...prev, loading: false }));
      throw error;
    }
  };

  const logout = (): void => {
    localStorage.removeItem('token');
    setState({
      token: null,
      user: null,
      loading: false,
    });
  };

  const register = async (userData: any): Promise<void> => {
    setState(prev => ({ ...prev, loading: true }));

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockToken = 'mock_jwt_token_' + Date.now();
      const mockUser: User = {
        id: '1',
        name: userData.name,
        email: userData.email,
        tier: 'STARTER',
        level: 1,
        accuracy: 0,
        profit: 0,
      };

      localStorage.setItem('token', mockToken);
      setState({
        token: mockToken,
        user: mockUser,
        loading: false,
      });
    } catch (error) {
      setState(prev => ({ ...prev, loading: false }));
      throw error;
    }
  };

  return {
    ...state,
    login,
    logout,
    register,
  };
};
