import { ProductRepository, ApiResponse } from '../../domain/interfaces';
import { Product, CreateProductRequest, UpdateProductRequest } from '../../domain/entities';
import { apiService } from '../services/api.service';

export class ProductRepositoryImpl implements ProductRepository {
  async getAll(): Promise<Product[]> {
    const response = await apiService.get<ApiResponse<Product[]>>('/api/products');
    return response.data;
  }

  async getById(id: string): Promise<Product> {
    const response = await apiService.get<ApiResponse<Product>>(`/api/products/${id}`);
    return response.data;
  }

  async create(product: CreateProductRequest): Promise<Product> {
    const response = await apiService.post<ApiResponse<Product>>('/api/products', product);
    return response.data;
  }

  async update(product: UpdateProductRequest): Promise<Product> {
    const response = await apiService.put<ApiResponse<Product>>(`/api/products/${product.id}`, product);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await apiService.delete(`/api/products/${id}`);
  }
}
