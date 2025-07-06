import { AuthRepository, ApiResponse } from '../../domain/interfaces';
import { User, AuthTokens, LoginCredentials, RegisterCredentials, LoginResponse } from '../../domain/entities';
import axios from 'axios';

// Create fresh API service each time to avoid SSR issues
const createApiService = () => {
  const axiosInstance = axios.create({
    baseURL: '/api/proxy', // Use Next.js proxy instead of direct backend URL
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('admin_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return {
    async get<T>(url: string): Promise<T> {
      const response = await axiosInstance.get<T>(url);
      return response.data;
    },
    async post<T>(url: string, data?: any): Promise<T> {
      const response = await axiosInstance.post<T>(url, data);
      return response.data;
    },
    setToken(token: string): void {
      if (typeof window !== 'undefined') {
        localStorage.setItem('admin_token', token);
      }
    }
  };
};

export class AuthRepositoryImpl implements AuthRepository {
  async login(credentials: LoginCredentials): Promise<AuthTokens> {
    try {
      const apiService = createApiService();
      
      const response = await apiService.post<LoginResponse>('/api/auth/login', credentials);
      
      // Store token and user data
      apiService.setToken(response.token);
      this.storeUserData(response.user);
      
      return {
        accessToken: response.token,
        refreshToken: undefined // No refresh token in this API
      };
    } catch (error: any) {
      this.handleAuthError(error);
      throw error;
    }
  }

  async register(credentials: RegisterCredentials): Promise<User> {
    try {
      const apiService = createApiService();
      const response = await apiService.post<ApiResponse<User>>('/api/auth/register', credentials);
      return response.data;
    } catch (error: any) {
      this.handleAuthError(error);
      throw error;
    }
  }

  async getProfile(): Promise<User> {
    try {
      const apiService = createApiService();
      const response = await apiService.get<ApiResponse<User>>('/api/auth/profile');
      return response.data;
    } catch (error: any) {
      this.handleAuthError(error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      const apiService = createApiService();
      await apiService.post('/api/auth/logout');
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      this.clearAuthData();
    }
  }

  private storeUserData(user: User): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user_data', JSON.stringify(user));
    }
  }

  private clearAuthData(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('user_data');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  }

  private handleAuthError(error: any): void {
    console.error('Auth error:', error);
    
    if (error.response?.status === 401) {
      this.clearAuthData();
    }
  }
}
