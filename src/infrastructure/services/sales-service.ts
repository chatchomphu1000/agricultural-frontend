import { createApiService } from './base.service';
import { Product } from './product.service';

// Sales Types
export interface Sale {
  id: string;
  product_id: string;
  product: Product;
  quantity: number;
  price: number;
  total: number;
  date_sold: string;
  created_at: string;
  updated_at: string;
}

export interface CreateSaleRequest {
  product_id: string;
  quantity: number;
  price: number;
}

export interface SalesSummary {
  total_sales: number;
  total_revenue: number;
  total_items: number;
  period: string;
}

export interface ProductSales {
  product_id: string;
  product_name: string;
  total_sold: number;
  total_revenue: number;
}

// Sales API Service
export class SalesService {
  // ดึงรายการขาย
  static async getSales(filters?: {
    from?: string;
    to?: string;
    product_id?: string;
    page?: number;
    limit?: number;
  }): Promise<Sale[]> {
    const apiService = createApiService();
    const params = new URLSearchParams();
    
    if (filters?.from) params.append('from', filters.from);
    if (filters?.to) params.append('to', filters.to);
    if (filters?.product_id) params.append('product_id', filters.product_id);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const queryString = params.toString();
    const url = queryString ? `/api/sales?${queryString}` : '/api/sales';
    
    return await apiService.get(url);
  }

  // สร้างรายการขายใหม่
  static async createSale(saleData: CreateSaleRequest): Promise<Sale> {
    const apiService = createApiService();
    return await apiService.post('/api/sales', saleData);
  }

  // ดึงสรุปยอดขาย
  static async getSalesSummary(from?: string, to?: string): Promise<SalesSummary> {
    const apiService = createApiService();
    const params = new URLSearchParams();
    
    if (from) params.append('from', from);
    if (to) params.append('to', to);

    const queryString = params.toString();
    const url = queryString ? `/api/sales/summary?${queryString}` : '/api/sales/summary';
    
    return await apiService.get(url);
  }

  // ดึงยอดขายตามสินค้า
  static async getSalesByProduct(from?: string, to?: string): Promise<ProductSales[]> {
    const apiService = createApiService();
    const params = new URLSearchParams();
    
    if (from) params.append('from', from);
    if (to) params.append('to', to);

    const queryString = params.toString();
    const url = queryString ? `/api/sales/by-product?${queryString}` : '/api/sales/by-product';
    
    return await apiService.get(url);
  }

  // ส่งออกข้อมูลยอดขาย
  static async exportSales(from?: string, to?: string, format: string = 'csv'): Promise<string> {
    const apiService = createApiService();
    const params = new URLSearchParams();
    
    if (from) params.append('from', from);
    if (to) params.append('to', to);
    params.append('format', format);

    const queryString = params.toString();
    const url = `/api/sales/export?${queryString}`;
    
    return await apiService.get(url);
  }
}
