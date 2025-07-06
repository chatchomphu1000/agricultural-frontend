import { createApiService } from './base.service';

// Auth Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role?: string;
}

// Auth API Service
export class AuthService {
  // เข้าสู่ระบบ
  static async login(loginData: LoginRequest): Promise<LoginResponse> {
    const apiService = createApiService();
    return await apiService.post('/api/auth/login', loginData);
  }

  // สมัครสมาชิก
  static async register(userData: CreateUserRequest): Promise<User> {
    const apiService = createApiService();
    return await apiService.post('/api/auth/register', userData);
  }

  // ดึงโปรไฟล์ผู้ใช้
  static async getProfile(): Promise<User> {
    const apiService = createApiService();
    return await apiService.get('/api/auth/profile');
  }

  // ออกจากระบบ (ลบ token จาก localStorage)
  static logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
    }
  }

  // ตรวจสอบว่ามี token หรือไม่
  static isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('admin_token');
  }

  // เก็บ token ลง localStorage
  static setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_token', token);
    }
  }

  // ดึง token จาก localStorage
  static getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('admin_token');
  }
}
