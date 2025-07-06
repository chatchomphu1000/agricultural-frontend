import { apiService } from './api.service';

// Inventory/Stock API Types
export interface StockUpdate {
  stock: number;
}

export interface LowStockProduct {
  id: number;
  name: string;
  currentStock: number;
  minStock: number;
  category: string;
}

export interface StockSummary {
  totalProducts: number;
  lowStockItems: number;
  outOfStockItems: number;
  totalValue: number;
  byCategory: {
    category: string;
    count: number;
    totalStock: number;
  }[];
}

// Inventory API Service
export class InventoryService {
  // อัปเดตจำนวน stock ของสินค้า
  static async updateProductStock(productId: number, stockData: StockUpdate): Promise<void> {
    try {
      return await apiService.put(`/api/products/${productId}/stock`, stockData);
    } catch (error) {
      console.error('Update stock error:', error);
      throw error;
    }
  }

  // ดึงรายการสินค้าที่ใกล้หมดสต็อก
  static async getLowStockProducts(): Promise<LowStockProduct[]> {
    try {
      return await apiService.get('/api/products/low-stock');
    } catch (error) {
      console.error('Get low stock products error:', error);
      throw error;
    }
  }

  // ดึงสรุปจำนวน stock ทั้งหมด
  static async getStockSummary(): Promise<StockSummary> {
    try {
      return await apiService.get('/api/stock/summary');
    } catch (error) {
      console.error('Get stock summary error:', error);
      throw error;
    }
  }
}
