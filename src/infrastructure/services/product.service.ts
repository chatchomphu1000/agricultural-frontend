import { createApiService } from './base.service';

// Product API Types
export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category: string;
  brand?: string;
  image_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface CreateCategoryRequest {
  name: string;
}

export interface CreateProductRequest {
  name: string;
  description?: string;
  price: number;
  stock: number;
  category: string;
  brand?: string;
  image_url?: string;
  is_active?: boolean;
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  category?: string;
  brand?: string;
  image_url?: string;
  is_active?: boolean;
}

export interface ProductFilters {
  category?: string;
  search?: string;
  brand?: string;
  is_active?: boolean;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}

export interface ProductsResponse {
  limit: number;
  page: number;
  products: Product[];
  total: number;
  total_pages: number;
}

// Product API Service
export class ProductService {
  // ดึงรายการสินค้าทั้งหมด
  static async getProducts(filters?: ProductFilters): Promise<ProductsResponse> {
    const apiService = createApiService();
    const params = new URLSearchParams();
    
    if (filters?.category) params.append('category', filters.category);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.brand) params.append('brand', filters.brand);
    if (filters?.is_active !== undefined) params.append('is_active', filters.is_active.toString());
    if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const queryString = params.toString();
    const url = queryString ? `/api/products?${queryString}` : '/api/products';
    
    return await apiService.get(url);
  }

  // ดึงสินค้าตาม ID
  static async getProductById(id: string): Promise<Product> {
    const apiService = createApiService();
    return await apiService.get(`/api/products/${id}`);
  }

  // สร้างสินค้าใหม่
  static async createProduct(productData: CreateProductRequest): Promise<Product> {
    const apiService = createApiService();
    return await apiService.post('/api/products', productData);
  }

  // อัปเดตสินค้า
  static async updateProduct(id: string, productData: UpdateProductRequest): Promise<Product> {
    const apiService = createApiService();
    return await apiService.put(`/api/products/${id}`, productData);
  }

  // ลบสินค้า
  static async deleteProduct(id: string): Promise<void> {
    const apiService = createApiService();
    await apiService.delete(`/api/products/${id}`);
  }

  // อัปเดต stock
  static async updateStock(id: string, stock: number): Promise<Product> {
    const apiService = createApiService();
    return await apiService.put(`/api/products/${id}/stock`, { stock });
  }

  // ดึงหมวดหมู่สินค้า
  static async getCategories(): Promise<string[]> {
    const apiService = createApiService();
    const response: { categories: Category[] } = await apiService.get('/api/categories');
    // Convert Category objects to string array
    return response.categories.map(category => category.name);
  }

  // สร้างหมวดหมู่ใหม่
  static async createCategory(categoryData: CreateCategoryRequest): Promise<Category> {
    const apiService = createApiService();
    return await apiService.post('/api/categories', categoryData);
  }

  // ดึงหมวดหมู่ทั้งหมด (รายละเอียดเต็ม)
  static async getCategoriesDetailed(): Promise<Category[]> {
    const apiService = createApiService();
    const response: { categories: Category[] } = await apiService.get('/api/categories');
    return response.categories;
  }

  // ลบหมวดหมู่
  static async deleteCategory(id: string): Promise<void> {
    const apiService = createApiService();
    await apiService.delete(`/api/categories/${id}`);
  }

  // ดึงหมวดหมู่ตาม ID
  static async getCategoryById(id: string): Promise<Category> {
    const apiService = createApiService();
    return await apiService.get(`/api/categories/${id}`);
  }
}
