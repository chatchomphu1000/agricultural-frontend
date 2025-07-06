import { ProductRepository } from '../interfaces';
import { Product, CreateProductRequest, UpdateProductRequest } from '../entities';

export class ProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.getAll();
  }

  async getProductById(id: string): Promise<Product> {
    if (!id) {
      throw new Error('Product ID is required');
    }
    return await this.productRepository.getById(id);
  }

  async createProduct(product: CreateProductRequest): Promise<Product> {
    this.validateProduct(product);
    return await this.productRepository.create(product);
  }

  async updateProduct(product: UpdateProductRequest): Promise<Product> {
    if (!product.id) {
      throw new Error('Product ID is required');
    }
    
    // Validate only the fields that are being updated
    if (product.name !== undefined && !product.name.trim()) {
      throw new Error('Product name is required');
    }
    
    if (product.price !== undefined && product.price <= 0) {
      throw new Error('Product price must be greater than 0');
    }
    
    if (product.stock !== undefined && product.stock < 0) {
      throw new Error('Product stock cannot be negative');
    }

    return await this.productRepository.update(product);
  }

  async deleteProduct(id: string): Promise<void> {
    if (!id) {
      throw new Error('Product ID is required');
    }
    await this.productRepository.delete(id);
  }

  private validateProduct(product: CreateProductRequest): void {
    if (!product.name || !product.name.trim()) {
      throw new Error('Product name is required');
    }

    if (!product.description || !product.description.trim()) {
      throw new Error('Product description is required');
    }

    if (!product.category || !product.category.trim()) {
      throw new Error('Product category is required');
    }

    if (product.price <= 0) {
      throw new Error('Product price must be greater than 0');
    }

    if (product.stock < 0) {
      throw new Error('Product stock cannot be negative');
    }
  }
}
