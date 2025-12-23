// app/services/authService.ts
import api from './api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    tokenType: string;
    user: {
      id: number;
      name: string;
      email: string;
      phone: string | null;
      role: 'CUSTOMER' | 'ADMIN' | 'STAFF';
      loyaltyPoints: number;
      isActive: boolean;
    };
  };
  timestamp: string;
}

export const authService = {
  /**
   * Login user
   * POST /api/auth/login
   */
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  /**
   * Register new user
   * POST /api/auth/register
   */
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  /**
   * Get current user profile
   * GET /api/client/profile
   */
  getProfile: async () => {
    const response = await api.get('/client/profile');
    return response.data;
  },

  /**
   * Test connection
   */
  testConnection: async () => {
    try {
      const response = await api.get('/test/hello');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};