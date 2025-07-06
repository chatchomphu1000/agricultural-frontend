'use client';

import { useState, useEffect } from 'react';
import { InventoryService, LowStockProduct, StockSummary, StockUpdate } from '../../../infrastructure/services/inventory.service';

interface InventoryItem {
  id: number;
  name: string;
  category: string;
  currentStock: number;
  minStock: number;
  lastUpdated: string;
  supplier: string;
  price: number;
}

export default function InventoryManagement() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [lowStockItems, setLowStockItems] = useState<LowStockProduct[]>([]);
  const [stockSummary, setStockSummary] = useState<StockSummary | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [stockUpdate, setStockUpdate] = useState({ quantity: 0, type: 'add' });
  const [filterType, setFilterType] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  // Load inventory data
  useEffect(() => {
    loadInventoryData();
  }, []);

  // Clear notification after 3 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const loadInventoryData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Load all inventory data
      const [lowStockData, summaryData] = await Promise.all([
        InventoryService.getLowStockProducts(),
        InventoryService.getStockSummary()
      ]);
      
      setLowStockItems(lowStockData);
      setStockSummary(summaryData);
      
      // Create inventory items from summary data (mock implementation)
      // In a real app, you'd have a separate endpoint for full inventory
      const inventoryItems: InventoryItem[] = summaryData.byCategory.flatMap(cat => 
        // Mock items for each category
        Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, i) => ({
          id: Math.random(),
          name: `${cat.category} Product ${i + 1}`,
          category: cat.category,
          currentStock: Math.floor(Math.random() * 100),
          minStock: Math.floor(Math.random() * 20) + 10,
          lastUpdated: new Date().toISOString().split('T')[0],
          supplier: 'Mock Supplier Ltd.',
          price: Math.random() * 50 + 10
        }))
      );
      
      setInventory(inventoryItems);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load inventory data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStockUpdate = async () => {
    if (!selectedItem) return;
    
    try {
      const updateData: StockUpdate = {
        stock: stockUpdate.type === 'add' 
          ? selectedItem.currentStock + stockUpdate.quantity
          : selectedItem.currentStock - stockUpdate.quantity
      };
      
      await InventoryService.updateProductStock(selectedItem.id, updateData);
      
      // Update local state
      setInventory(prev => prev.map(item => 
        item.id === selectedItem.id 
          ? { ...item, currentStock: updateData.stock, lastUpdated: new Date().toISOString().split('T')[0] }
          : item
      ));
      
      setNotification({ message: 'Stock updated successfully!', type: 'success' });
      setShowUpdateModal(false);
      setSelectedItem(null);
      setStockUpdate({ quantity: 0, type: 'add' });
      
      // Refresh data
      loadInventoryData();
    } catch (err) {
      setNotification({ 
        message: err instanceof Error ? err.message : 'Failed to update stock', 
        type: 'error' 
      });
    }
  };

  const getStockStatus = (item: InventoryItem) => {
    if (item.currentStock === 0) {
      return { status: 'Out of Stock', color: 'bg-red-100 text-red-800', priority: 'critical' };
    }
    if (item.currentStock < item.minStock) {
      return { status: 'Low Stock', color: 'bg-orange-100 text-orange-800', priority: 'warning' };
    }
    return { status: 'In Stock', color: 'bg-green-100 text-green-800', priority: 'normal' };
  };

  const filteredInventory = inventory.filter(item => {
    const stockInfo = getStockStatus(item);
    switch (filterType) {
      case 'low':
        return stockInfo.priority === 'warning';
      case 'out':
        return stockInfo.priority === 'critical';
      case 'normal':
        return stockInfo.priority === 'normal';
      default:
        return true;
    }
  });

  const openUpdateModal = (item: InventoryItem) => {
    setSelectedItem(item);
    setShowUpdateModal(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Notification */}
      {notification && (
        <div className={`p-4 rounded-md ${notification.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
          {notification.message}
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{error}</span>
          <button 
            onClick={() => setError(null)}
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
          >
            <span className="sr-only">Dismiss</span>
            ×
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
        <button
          onClick={loadInventoryData}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium"
        >
          Refresh Data
        </button>
      </div>

      {/* Summary Cards */}
      {stockSummary && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{stockSummary.totalProducts}</p>
              </div>
              <div className="text-blue-600">📦</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
                <p className="text-2xl font-bold text-orange-600">{stockSummary.lowStockItems}</p>
              </div>
              <div className="text-orange-600">⚠️</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600">{stockSummary.outOfStockItems}</p>
              </div>
              <div className="text-red-600">❌</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-green-600">${stockSummary.totalValue.toFixed(2)}</p>
              </div>
              <div className="text-green-600">💰</div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-md font-medium ${
              filterType === 'all' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Items ({inventory.length})
          </button>
          <button
            onClick={() => setFilterType('low')}
            className={`px-4 py-2 rounded-md font-medium ${
              filterType === 'low' 
                ? 'bg-orange-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Low Stock ({inventory.filter(item => getStockStatus(item).priority === 'warning').length})
          </button>
          <button
            onClick={() => setFilterType('out')}
            className={`px-4 py-2 rounded-md font-medium ${
              filterType === 'out' 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Out of Stock ({inventory.filter(item => getStockStatus(item).priority === 'critical').length})
          </button>
          <button
            onClick={() => setFilterType('normal')}
            className={`px-4 py-2 rounded-md font-medium ${
              filterType === 'normal' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Normal Stock ({inventory.filter(item => getStockStatus(item).priority === 'normal').length})
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Min Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Supplier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.map((item) => {
                const stockInfo = getStockStatus(item);
                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-500">${item.price.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.currentStock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.minStock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${stockInfo.color}`}>
                        {stockInfo.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.supplier}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => openUpdateModal(item)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Update Stock
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredInventory.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">No inventory items found matching your criteria.</div>
          </div>
        )}
      </div>

      {/* Update Modal */}
      {showUpdateModal && selectedItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowUpdateModal(false)}></div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      Update Stock: {selectedItem.name}
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-sm text-gray-600">Current Stock: <span className="font-semibold">{selectedItem.currentStock}</span></p>
                        <p className="text-sm text-gray-600">Minimum Stock: <span className="font-semibold">{selectedItem.minStock}</span></p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Action</label>
                        <div className="flex space-x-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="updateType"
                              value="add"
                              checked={stockUpdate.type === 'add'}
                              onChange={(e) => setStockUpdate({...stockUpdate, type: e.target.value})}
                              className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-900">Add Stock</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="updateType"
                              value="subtract"
                              checked={stockUpdate.type === 'subtract'}
                              onChange={(e) => setStockUpdate({...stockUpdate, type: e.target.value})}
                              className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-900">Remove Stock</span>
                          </label>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Quantity</label>
                        <input
                          type="number"
                          min="1"
                          required
                          value={stockUpdate.quantity}
                          onChange={(e) => setStockUpdate({...stockUpdate, quantity: parseInt(e.target.value)})}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div className="bg-blue-50 p-3 rounded-md">
                        <p className="text-sm text-blue-700">
                          New stock will be: {' '}
                          <span className="font-semibold">
                            {stockUpdate.type === 'add' 
                              ? selectedItem.currentStock + stockUpdate.quantity
                              : selectedItem.currentStock - stockUpdate.quantity}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleStockUpdate}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Update Stock
                </button>
                <button
                  onClick={() => setShowUpdateModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
