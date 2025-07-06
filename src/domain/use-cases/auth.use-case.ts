import { AuthRepository } from '../interfaces';
import { LoginCredentials, RegisterCredentials, User, AuthTokens } from '../entities';

export class AuthUseCase {
  constructor(private authRepository: AuthRepository) {}

  async login(credentials: LoginCredentials): Promise<AuthTokens> {
    if (!credentials.email || !credentials.password) {
      throw new Error('Email and password are required');
    }

    if (!this.isValidEmail(credentials.email)) {
      throw new Error('Invalid email format');
    }

    return await this.authRepository.login(credentials);
  }

  async register(credentials: RegisterCredentials): Promise<User> {
    if (!credentials.email || !credentials.password || !credentials.name) {
      throw new Error('Email, password, and name are required');
    }

    if (!this.isValidEmail(credentials.email)) {
      throw new Error('Invalid email format');
    }

    if (credentials.password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    return await this.authRepository.register(credentials);
  }

  async getProfile(): Promise<User> {
    return await this.authRepository.getProfile();
  }

  async logout(): Promise<void> {
    await this.authRepository.logout();
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
