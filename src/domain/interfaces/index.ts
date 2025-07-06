import { User, Product, AuthTokens, LoginCredentials, RegisterCredentials, CreateProductRequest, UpdateProductRequest } from '../entities';

export interface AuthRepository {
  login(credentials: LoginCredentials): Promise<AuthTokens>;
  register(credentials: RegisterCredentials): Promise<User>;
  getProfile(): Promise<User>;
  logout(): Promise<void>;
}

export interface ProductRepository {
  getAll(): Promise<Product[]>;
  getById(id: string): Promise<Product>;
  create(product: CreateProductRequest): Promise<Product>;
  update(product: UpdateProductRequest): Promise<Product>;
  delete(id: string): Promise<void>;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
