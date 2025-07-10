export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select';
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
}

export interface NavigationItem {
  name: string;
  href: string;
  icon?: string;
  current?: boolean;
}

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

export interface ProductSales {
  productId: number;
  productName: string;
  totalSales: number;
  totalRevenue: number;
  category: string;
  salesCount: number;
  avgPrice: number;
}

export interface StockSummary {
  totalProducts: number;
  lowStockItems: number;
  outOfStockItems: number;
  totalValue: number;
  byCategory: Array<{
    category: string;
    count: number;
    totalStock: number;
  }>;
}

export interface SalesSummary {
  totalSales: number;
  totalRevenue: number;
  avgOrderValue: number;
  salesGrowth: number;
  topSellingProduct: string;
}

export interface Notification {
  id: number;
  type: 'warning' | 'error' | 'info' | 'success';
  message: string;
  time: string;
}
