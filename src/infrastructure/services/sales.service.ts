import axios from 'axios';

// Create a simple API service function
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
    }
  };
};

// Sales & Reports API Types
export interface SalesSummary {
  totalSales: number;
  totalRevenue: number;
  avgOrderValue: number;
  salesGrowth: number;
  topSellingProduct: string;
}

export interface SalesRecord {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  total: number;
  dateSold: string;
  category: string;
}

export interface ProductSales {
  productId: number;
  productName: string;
  totalQuantity: number;
  totalRevenue: number;
  salesCount: number;
}

export interface SalesFilters {
  from?: string;
  to?: string;
  productId?: number;
  category?: string;
}

// Sales API Service
export class SalesService {
  // ดึงยอดขายและรายได้รวมของเดือนนี้
  static async getSalesSummary(): Promise<SalesSummary> {
    const apiService = createApiService();
    return apiService.get('/api/sales/summary');
  }

  // ดึงรายการขายตามช่วงเวลา
  static async getSales(filters?: SalesFilters): Promise<SalesRecord[]> {
    const apiService = createApiService();
    const params = new URLSearchParams();
    if (filters?.from) params.append('from', filters.from);
    if (filters?.to) params.append('to', filters.to);
    if (filters?.productId) params.append('productId', filters.productId.toString());
    if (filters?.category) params.append('category', filters.category);

    const queryString = params.toString();
    const url = queryString ? `/api/sales?${queryString}` : '/api/sales';
    
    return apiService.get(url);
  }

  // ยอดขายแยกตามสินค้า
  static async getSalesByProduct(): Promise<ProductSales[]> {
    const apiService = createApiService();
    return apiService.get('/api/sales/by-product');
  }

  // ดาวน์โหลดรายงานเป็น CSV/PDF
  static async exportSalesReport(format: 'csv' | 'pdf' = 'csv'): Promise<Blob> {
    const response = await fetch(`/api/proxy/api/sales/export?format=${format}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Export failed');
    }

    return response.blob();
  }

  // Helper method สำหรับดาวน์โหลดไฟล์
  static downloadFile(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
}
