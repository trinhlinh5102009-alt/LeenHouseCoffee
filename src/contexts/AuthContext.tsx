// app/contexts/AuthContext.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/authService';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  role: 'CUSTOMER' | 'ADMIN' | 'STAFF';
  loyaltyPoints: number;
  isActive: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user from AsyncStorage khi app khởi động
  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const [storedToken, storedUser] = await AsyncStorage.multiGet(['token', 'user']);
      
      if (storedToken[1] && storedUser[1]) {
        setToken(storedToken[1]);
        setUser(JSON.parse(storedUser[1]));
      }
    } catch (error) {
      console.error('Error loading auth:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // Gọi API login
      const response = await authService.login({ email, password });

      if (response.success && response.data) {
        const { token, user } = response.data;

        // Lưu vào state
        setToken(token);
        setUser(user);

        // Lưu vào AsyncStorage
        await AsyncStorage.multiSet([
          ['token', token],
          ['user', JSON.stringify(user)],
        ]);
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Parse error message từ backend
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error('Không thể kết nối đến server. Vui lòng thử lại.');
      }
    }
  };

  const register = async (name: string, email: string, password: string, phone?: string) => {
    try {
      // Gọi API register
      const response = await authService.register({ 
        name, 
        email, 
        password,
        phone 
      });

      if (response.success && response.data) {
        const { token, user } = response.data;

        // Lưu vào state
        setToken(token);
        setUser(user);

        // Lưu vào AsyncStorage
        await AsyncStorage.multiSet([
          ['token', token],
          ['user', JSON.stringify(user)],
        ]);
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error: any) {
      console.error('Register error:', error);
      
      // Parse error message từ backend
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error('Không thể kết nối đến server. Vui lòng thử lại.');
      }
    }
  };

  const logout = async () => {
    try {
      // Clear state
      setUser(null);
      setToken(null);

      // Clear AsyncStorage
      await AsyncStorage.multiRemove(['token', 'user']);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value: AuthContextType = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user && !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}