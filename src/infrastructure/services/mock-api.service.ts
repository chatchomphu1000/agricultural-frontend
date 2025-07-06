import { ApiResponse } from '../../domain/interfaces';

// Mock API Service - simulates backend responses
class MockApiService {
  private delay(ms: number = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async get<T>(url: string): Promise<T> {
    await this.delay();
    
    // Mock responses based on URL
    if (url === '/api/products') {
      return {
        data: [
          {
            id: '1',
            name: 'Organic Rice',
            description: 'Premium quality organic rice',
            price: 25.99,
            category: 'Grains',
            imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
            stock: 150,
            isActive: true,
            createdAt: new Date('2024-01-15'),
            updatedAt: new Date('2024-01-15')
          },
          {
            id: '2',
            name: 'Fresh Wheat',
            description: 'High-quality wheat for baking',
            price: 18.50,
            category: 'Grains',
            imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400',
            stock: 8,
            isActive: true,
            createdAt: new Date('2024-01-10'),
            updatedAt: new Date('2024-01-10')
          },
          {
            id: '3',
            name: 'Sweet Corn',
            description: 'Sweet and tender corn',
            price: 12.99,
            category: 'Vegetables',
            imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400',
            stock: 0,
            isActive: true,
            createdAt: new Date('2024-01-05'),
            updatedAt: new Date('2024-01-05')
          },
          {
            id: '4',
            name: 'Soybeans',
            description: 'Protein-rich soybeans',
            price: 22.75,
            category: 'Legumes',
            imageUrl: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=400',
            stock: 45,
            isActive: true,
            createdAt: new Date('2024-01-20'),
            updatedAt: new Date('2024-01-20')
          }
        ]
      } as T;
    }
    
    if (url.startsWith('/api/products/')) {
      const id = url.split('/').pop();
      return {
        data: {
          id,
          name: 'Mock Product',
          description: 'Mock product description',
          price: 25.99,
          category: 'Grains',
          imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
          stock: 100,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      } as T;
    }
    
    if (url === '/api/stock/summary') {
      return {
        totalProducts: 4,
        lowStockItems: 2,
        outOfStockItems: 1,
        totalValue: 15234.56,
        byCategory: [
          { category: 'Grains', count: 2, totalStock: 158 },
          { category: 'Vegetables', count: 1, totalStock: 0 },
          { category: 'Legumes', count: 1, totalStock: 45 }
        ]
      } as T;
    }
    
    if (url === '/api/products/low-stock') {
      return [
        {
          id: 2,
          name: 'Fresh Wheat',
          currentStock: 8,
          minStock: 20,
          category: 'Grains'
        },
        {
          id: 3,
          name: 'Sweet Corn',
          currentStock: 0,
          minStock: 15,
          category: 'Vegetables'
        }
      ] as T;
    }
    
    if (url === '/api/sales/summary') {
      return {
        totalSales: 1247,
        totalRevenue: 52341.88,
        avgOrderValue: 42.05,
        salesGrowth: 15.8,
        topSellingProduct: 'Organic Rice'
      } as T;
    }
    
    if (url === '/api/sales') {
      return [
        {
          id: 1,
          productId: 1,
          productName: 'Organic Rice',
          quantity: 12,
          price: 25.99,
          total: 311.88,
          dateSold: '2024-01-15',
          category: 'Grains'
        },
        {
          id: 2,
          productId: 2,
          productName: 'Fresh Wheat',
          quantity: 8,
          price: 18.50,
          total: 148.00,
          dateSold: '2024-01-14',
          category: 'Grains'
        }
      ] as T;
    }
    
    if (url === '/api/sales/by-product') {
      return [
        {
          productId: 1,
          productName: 'Organic Rice',
          totalQuantity: 120,
          totalRevenue: 3118.80,
          salesCount: 45
        },
        {
          productId: 2,
          productName: 'Fresh Wheat',
          totalQuantity: 85,
          totalRevenue: 1572.50,
          salesCount: 32
        }
      ] as T;
    }
    
    throw new Error(`Mock API: Endpoint not found: ${url}`);
  }

  async post<T>(url: string, data: any): Promise<T> {
    await this.delay();
    
    if (url === '/api/auth/login') {
      const { email, password } = data;
      
      // Mock login validation
      if (email === 'admin@agricultural.com' && password === 'password123') {
        return {
          token: 'mock-jwt-token-12345',
          user: {
            id: '1',
            email: 'admin@agricultural.com',
            name: 'Admin User',
            role: 'Admin',
            is_active: true,
            created_at: '2024-01-01',
            updated_at: '2024-01-01'
          }
        } as T;
      } else {
        throw new Error('Invalid credentials');
      }
    }
    
    if (url === '/api/products') {
      // Mock product creation
      return {
        data: {
          id: Date.now().toString(),
          ...data,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      } as T;
    }
    
    throw new Error(`Mock API: Endpoint not found: ${url}`);
  }

  async put<T>(url: string, data: any): Promise<T> {
    await this.delay();
    
    if (url.startsWith('/api/products/') && url.endsWith('/stock')) {
      return { message: 'Stock updated successfully' } as T;
    }
    
    if (url.startsWith('/api/products/')) {
      const id = url.split('/')[3];
      return {
        data: {
          id,
          ...data,
          updatedAt: new Date()
        }
      } as T;
    }
    
    throw new Error(`Mock API: Endpoint not found: ${url}`);
  }

  async delete<T>(url: string): Promise<T> {
    await this.delay();
    
    if (url.startsWith('/api/products/')) {
      return { message: 'Product deleted successfully' } as T;
    }
    
    throw new Error(`Mock API: Endpoint not found: ${url}`);
  }

  getBaseURL(): string {
    return 'http://localhost:8082';
  }

  // Mock export functionality
  async exportSalesReport(format: 'csv' | 'pdf'): Promise<Blob> {
    await this.delay();
    
    let content: string;
    let mimeType: string;
    
    if (format === 'csv') {
      content = `Product,Category,Quantity,Price,Total,Date
Organic Rice,Grains,12,25.99,311.88,2024-01-15
Fresh Wheat,Grains,8,18.50,148.00,2024-01-14
Sweet Corn,Vegetables,6,12.99,77.94,2024-01-13`;
      mimeType = 'text/csv';
    } else {
      content = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj
2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj
3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj
4 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
100 700 Td
(Sales Report) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000206 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
300
%%EOF`;
      mimeType = 'application/pdf';
    }
    
    return new Blob([content], { type: mimeType });
  }
}

export const mockApiService = new MockApiService();
