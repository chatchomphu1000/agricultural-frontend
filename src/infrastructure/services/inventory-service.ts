import { createApiService } from './base.service';

// Inventory Types
export interface LowStockProduct {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: number;
}

export interface CategoryStock {
  category: string;
  product_count: number;
  total_stock: number;
  total_value: number;
}

export interface StockSummary {
  total_products: number;
  low_stock_products: number;
  total_stock_value: number;
  categories: CategoryStock[];
}

export interface StockUpdateRequest {
  stock: number;
}

// Inventory API Service
export class InventoryService {
  // ดึงสินค้าที่มีสต็อกต่ำ
  static async getLowStockProducts(threshold?: number): Promise<LowStockProduct[]> {
    const apiService = createApiService();
    const params = new URLSearchParams();
    
    if (threshold) params.append('threshold', threshold.toString());

    const queryString = params.toString();
    const url = queryString ? `/api/inventories/low-stock?${queryString}` : '/api/inventories/low-stock';
    
    return await apiService.get(url);
  }

  // ดึงสรุปสต็อก
  static async getStockSummary(): Promise<StockSummary> {
    const apiService = createApiService();
    return await apiService.get('/api/inventories/summary');
  }

  // อัปเดตสต็อกสินค้า
  static async updateProductStock(id: string, stockData: StockUpdateRequest): Promise<void> {
    const apiService = createApiService();
    await apiService.put(`/api/inventories/${id}/stock`, stockData);
  }
}
