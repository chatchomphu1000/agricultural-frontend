'use client';

import { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { InventoryService, StockSummary } from '../../../infrastructure/services/inventory.service';
import { SalesService, SalesSummary, ProductSales } from '../../../infrastructure/services/sales.service';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function DashboardOverview() {
  const [stockSummary, setStockSummary] = useState<StockSummary | null>(null);
  const [salesSummary, setSalesSummary] = useState<SalesSummary | null>(null);
  const [productSales, setProductSales] = useState<ProductSales[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [salesData, setSalesData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Sales',
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1,
      },
    ],
  });

  const [notifications] = useState([
    { id: 1, type: 'warning', message: 'Wheat stock is running low (8 units remaining)', time: '2 hours ago' },
    { id: 2, type: 'info', message: 'New product "Organic Rice" added successfully', time: '4 hours ago' },
    { id: 3, type: 'error', message: 'Corn is out of stock', time: '1 day ago' },
  ]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Mock data for now (until services are fixed)
      const mockStockData: StockSummary = {
        totalProducts: 150,
        lowStockItems: 12,
        outOfStockItems: 3,
        totalValue: 145000,
        byCategory: [
          { category: 'Seeds', count: 45, totalStock: 1200 },
          { category: 'Fertilizers', count: 35, totalStock: 800 },
          { category: 'Tools', count: 28, totalStock: 150 },
          { category: 'Pesticides', count: 42, totalStock: 600 }
        ]
      };

      const mockSalesData: SalesSummary = {
        totalSales: 1250,
        totalRevenue: 125000,
        avgOrderValue: 100,
        salesGrowth: 12.5,
        topSellingProduct: 'Organic Fertilizer'
      };

      const mockProductSalesData: ProductSales[] = [
        { productId: 1, productName: 'Organic Fertilizer', totalSales: 150, totalRevenue: 15000, category: 'Fertilizers', salesCount: 150, avgPrice: 100 },
        { productId: 2, productName: 'Tomato Seeds', totalSales: 120, totalRevenue: 12000, category: 'Seeds', salesCount: 120, avgPrice: 100 },
        { productId: 3, productName: 'Garden Hose', totalSales: 85, totalRevenue: 8500, category: 'Tools', salesCount: 85, avgPrice: 100 },
        { productId: 4, productName: 'Insecticide', totalSales: 95, totalRevenue: 9500, category: 'Pesticides', salesCount: 95, avgPrice: 100 }
      ];

      setStockSummary(mockStockData);
      setSalesSummary(mockSalesData);
      setProductSales(mockProductSalesData);
      
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Create chart data from API response
  const productSalesChartData = {
    labels: productSales.map(item => item.productName),
    datasets: [
      {
        data: productSales.map(item => item.totalRevenue),
        backgroundColor: [
          '#10B981',
          '#3B82F6',
          '#F59E0B',
          '#EF4444',
          '#8B5CF6',
        ],
        borderWidth: 2,
      },
    ],
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex">
          <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <p className="text-red-800">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-3xl font-bold text-gray-900">{stockSummary?.totalProducts || 0}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Total value: ${stockSummary?.totalValue.toLocaleString() || 0}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
              <p className="text-3xl font-bold text-orange-600">{stockSummary?.lowStockItems || 0}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">{stockSummary?.outOfStockItems || 0} out of stock</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sales</p>
              <p className="text-3xl font-bold text-green-600">{salesSummary?.totalSales || 0}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">This month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
              <p className="text-3xl font-bold text-purple-600">${salesSummary?.totalRevenue.toLocaleString() || 0}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">+{salesSummary?.salesGrowth || 0}% from last month</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Sales</h3>
          <Bar 
            data={salesData} 
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Sales by Month',
                },
              },
            }}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Product Sales Distribution</h3>
          {productSales.length > 0 ? (
            <Pie 
              data={productSalesChartData} 
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                  title: {
                    display: true,
                    text: 'Top Selling Products',
                  },
                },
              }}
            />
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">
              No sales data available
            </div>
          )}
        </div>
      </div>

      {/* Top Selling Product */}
      {salesSummary?.topSellingProduct && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Top Selling Product</h3>
          <p className="text-2xl font-bold text-green-600">{salesSummary.topSellingProduct}</p>
          <p className="text-sm text-gray-500">Average order value: ${salesSummary.avgOrderValue?.toFixed(2) || 0}</p>
        </div>
      )}

      {/* Stock by Category */}
      {stockSummary?.byCategory && stockSummary.byCategory.length > 0 && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Stock by Category</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stockSummary.byCategory.map((category, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900">{category.category}</h4>
                  <p className="text-sm text-gray-600">{category.count} products</p>
                  <p className="text-sm text-gray-600">{category.totalStock} units in stock</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Notifications */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Notifications</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {notifications.map((notification) => (
            <div key={notification.id} className="px-6 py-4">
              <div className="flex items-start">
                <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                  notification.type === 'warning' ? 'bg-yellow-400' :
                  notification.type === 'error' ? 'bg-red-400' : 'bg-blue-400'
                }`} />
                <div className="ml-3 flex-1">
                  <p className="text-sm text-gray-900">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
