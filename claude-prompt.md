# Agricultural Product Management System - Clean Architecture

## 🌾 Project Overview
Modern Next.js application with clean architecture for managing agricultural products. Features JWT authentication, admin panel, and responsive design with agricultural theming.

**Backend API**: `http://localhost:8082`  
**Swagger Documentation**: `http://localhost:8082/swagger/index.html`

## 🏗️ Architecture

### Clean Architecture Layers
```
src/
├── app/                    # Next.js App Router (Pages)
├── domain/                # Business Logic Layer
│   ├── entities/          # Domain entities & types
│   ├── use-cases/         # Business logic
│   └── interfaces/        # Repository contracts
├── infrastructure/        # External Layer
│   ├── repositories/      # Data access implementations
│   └── services/          # External services (API, etc.)
├── presentation/          # UI Layer
│   ├── components/        # Reusable UI components
│   └── store/            # State management
└── shared/               # Shared utilities
    ├── types/            # TypeScript types
    ├── constants/        # Application constants
    └── utils/            # Utility functions
```

## 🚀 Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Forms**: React Hook Form
- **Authentication**: JWT
- **State**: React Hooks

## ✅ Implemented Features

### 🔐 Authentication System
- **Admin Login** (`/admin/login`)
  - Email/password authentication
  - Password visibility toggle
  - Form validation with React Hook Form
  - JWT token management
  - Error handling for 401/400 status codes

- **Admin Dashboard** (`/admin/dashboard`)
  - Protected route with middleware
  - User profile display
  - Logout functionality

- **Route Protection**
  - Middleware-based access control
  - Automatic redirection to login
  - JWT token validation

### 📊 Admin Dashboard (Fully API Integrated)
- **Dashboard Overview**
  - Real-time metrics from API (stock summary, sales data)
  - Interactive charts with Chart.js/react-chartjs-2
  - Key performance indicators (KPIs)
  - Visual data representation with modern UI

- **Product Management** (Complete API Integration)
  - Full CRUD operations with backend API
  - Product listing with search and category filters
  - Stock status indicators (In Stock, Low Stock, Out of Stock)
  - Image upload support (URL-based)
  - Form validation and error handling
  - Success/error notifications
  - Loading states and error boundaries
  - Real-time data synchronization

- **Inventory Management** (Complete API Integration)
  - Stock level monitoring with real-time data
  - Low stock alerts and notifications
  - Stock update functionality (add/remove)
  - Inventory summary cards with API data
  - Filtering by stock status (All, Low Stock, Out of Stock, Normal)
  - Supplier information display
  - API integration for stock management
  - Real-time stock calculations

- **Sales & Reports** (Complete API Integration)
  - Sales analytics with interactive charts
  - Revenue tracking and growth metrics
  - Product performance analysis
  - Customizable date range filters (monthly, custom range, all time)
  - Category-wise sales breakdown
  - Top products ranking
  - Downloadable reports (CSV/PDF) with blob handling
  - Export functionality with API integration
  - Multiple chart types (Bar, Line, Pie)

- **Settings Management**
  - User profile and preferences
  - System configuration options

### 🎨 UI/UX Components
- **Custom 404 Page** (`/not-found.tsx`)
  - Animated design with agricultural theme
  - Responsive layout
  - Navigation back to home

- **Modern Interface**
  - Clean, professional design
  - Green agricultural color scheme
  - Smooth animations and transitions
  - Mobile-responsive layout
  - Loading spinners and skeleton screens
  - Toast notifications for user feedback
  - Modal dialogs for form interactions
  - Accessible color contrast and typography
  - Interactive hover states and animations

### 🔧 Technical Implementation
- **Clean Architecture** pattern implementation
- **Domain-driven design** with entities and use cases
- **Repository pattern** for data access
- **State management** with Zustand
- **TypeScript** for type safety
- **Error boundaries** and comprehensive error handling
- **API service layer** abstraction
- **Real-time data synchronization** with backend
- **Responsive design** with mobile-first approach

## 🔧 API Integration

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration  
- `GET /api/auth/profile` - Get user profile (protected)
- `POST /api/auth/logout` - User logout

### Products Endpoints (Fully Integrated)
- `GET /api/products` - List all products (public)
- `GET /api/products/:id` - Get product details (public)
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Inventory/Stock Endpoints (Fully Integrated)
- `PUT /api/products/:id/stock` - Update product stock
- `GET /api/products/low-stock` - Get low stock products
- `GET /api/stock/summary` - Get stock summary (total, low stock, out of stock)

### Sales & Reports Endpoints (Fully Integrated)
- `GET /api/sales/summary` - Get sales summary (total sales, revenue, growth)
- `GET /api/sales` - Get sales records with filters (date range, category, product)
- `GET /api/sales/by-product` - Get sales by product
- `GET /api/sales/export` - Export sales report (CSV/PDF)

### Service Layer Implementation
- **ProductRepository** - Uses product use-case and repository pattern
- **InventoryService** - Handles stock management operations
- **SalesService** - Manages sales data and reporting
- **API Service** - Centralized HTTP client with error handling
- **Error Handling** - Comprehensive error boundaries and user feedback

### System Endpoints
- `GET /health` - Health check
- `GET /swagger/index.html` - API documentation

## 📁 File Structure

### Core Files
```
src/
├── app/
│   ├── admin/
│   │   ├── login/page.tsx       # Admin login page
│   │   └── dashboard/page.tsx   # Admin dashboard main page
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── not-found.tsx            # Custom 404 page
├── domain/
│   ├── entities/
│   │   └── index.ts             # Product, User, API types
│   ├── interfaces/
│   │   └── index.ts             # Repository contracts
│   └── use-cases/
│       ├── auth.use-case.ts     # Authentication business logic
│       └── product.use-case.ts  # Product business logic
├── infrastructure/
│   ├── repositories/
│   │   ├── auth.repository.ts   # Auth data access
│   │   └── product.repository.ts # Product data access
│   └── services/
│       ├── api.service.ts       # HTTP client service
│       ├── inventory.service.ts # Inventory API service
│       └── sales.service.ts     # Sales API service
├── presentation/
│   ├── components/
│   │   ├── admin/
│   │   │   ├── DashboardLayout.tsx      # Admin layout wrapper
│   │   │   ├── DashboardOverview.tsx    # Dashboard home (API integrated)
│   │   │   ├── ProductManagement.tsx    # Product CRUD (API integrated)
│   │   │   ├── InventoryManagement.tsx  # Stock management (API integrated)
│   │   │   ├── ReportsSection.tsx       # Sales reports (API integrated)
│   │   │   └── Settings.tsx             # Settings page
│   │   └── ui/
│   │       └── LoadingSpinner.tsx       # Loading component
│   └── store/
│       ├── auth.store.ts        # Authentication state
│       └── product.store.ts     # Product state management
└── shared/
    ├── constants/
    │   └── index.ts             # App constants
    ├── types/
    │   └── index.ts             # Shared TypeScript types
    └── utils/
        └── auth.utils.ts        # Authentication utilities
```

### Key Files Updated
- **ProductManagement.tsx** - Complete API integration with CRUD operations
- **InventoryManagement.tsx** - Real-time stock management with API
- **ReportsSection.tsx** - Sales analytics with chart integration
- **DashboardOverview.tsx** - Live dashboard with API data
- **inventory.service.ts** - New service for inventory management
- **sales.service.ts** - New service for sales and reporting
- **product.store.ts** - Enhanced state management for products
│   ├── page.tsx                 # Home page
│   └── layout.tsx               # Root layout
├── domain/
│   ├── entities/index.ts        # User, LoginCredentials, etc.
│   ├── interfaces/index.ts      # Repository interfaces
│   └── use-cases/
│       └── auth.use-case.ts     # Authentication business logic
├── infrastructure/
│   ├── repositories/
│   │   └── auth.repository.ts   # Auth API implementation
│   └── services/
│       └── api.service.ts       # HTTP client with interceptors
├── presentation/
│   ├── components/
│   │   └── ui/
│   │       └── LoadingSpinner.tsx
│   └── store/
│       └── auth.store.ts
├── shared/
│   ├── types/index.ts           # TypeScript definitions
│   ├── constants/index.ts       # App constants
│   └── utils/
│       └── auth.utils.ts        # Authentication utilities
└── middleware.ts                # Route protection middleware
```

## 🛠️ Development Guidelines

### Code Style
- Use functional components with hooks
- Implement proper TypeScript typing
- Follow clean architecture principles
- Use consistent naming conventions
- Add JSDoc for complex functions

### Error Handling
- Comprehensive error handling in API calls
- User-friendly error messages
- Proper HTTP status code handling
- Graceful degradation for failed requests

### Security
- JWT token management
- Protected routes with middleware
- Input validation and sanitization
- Secure localStorage usage

## 📝 Common Tasks

### Adding New Features
1. **Domain Layer**: Define entities and interfaces
2. **Use Cases**: Implement business logic
3. **Infrastructure**: Create repository implementations
4. **Presentation**: Build UI components
5. **Integration**: Connect with hooks and state
6. **Testing**: Add error handling and validation

### File Patterns
- **Components**: `src/presentation/components/`
- **Pages**: `src/app/` (App Router)
- **Business Logic**: `src/domain/use-cases/`
- **API Calls**: `src/infrastructure/repositories/`
- **Types**: `src/shared/types/`
- **Utils**: `src/shared/utils/`

## 🔐 Environment Variables
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8082
```

## 🎨 Design System
- **Colors**: Green-based agricultural theme
- **Typography**: Modern, readable fonts
- **Spacing**: Consistent Tailwind spacing
- **Components**: Reusable UI components
- **Animations**: Smooth transitions and loading states

## 📋 Best Practices
1. **Clean Architecture**: Maintain separation of concerns
2. **TypeScript**: Use strict typing throughout
3. **Error Handling**: Implement comprehensive error handling
4. **Performance**: Optimize images and lazy load components
5. **Accessibility**: Use proper ARIA labels and semantic HTML
6. **Testing**: Write unit tests for business logic
7. **Documentation**: Keep code well-documented

## 🚀 Getting Started
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎯 Current Status

### ✅ COMPLETED (Recently Updated)
- **Full API Integration** - All dashboard components now use real backend APIs
- **Product Management** - Complete CRUD with API integration, search, filters
- **Inventory Management** - Real-time stock management with API integration
- **Sales & Reports** - Complete analytics with charts and export functionality
- **Error Handling** - Comprehensive error boundaries and user feedback
- **Loading States** - Loading spinners and skeleton screens throughout
- **Notifications** - Toast notifications for all user actions
- **State Management** - Zustand store integration for products
- **TypeScript** - Full type safety across all components
- **Responsive Design** - Mobile-first approach with modern UI

### 🚀 Ready for Production
- Modern admin dashboard with full API integration
- Real-time data synchronization
- Comprehensive error handling and user feedback
- Mobile-responsive design
- Clean architecture implementation
- Type-safe development with TypeScript
- Chart visualizations for analytics
- Export functionality (CSV/PDF)
- Stock management with alerts
- Search and filtering capabilities

### 🔗 Development Server
- Application running on: `http://localhost:3001`
- Backend API: `http://localhost:8082`
- Swagger docs: `http://localhost:8082/swagger/index.html`

### � Mock Mode Support
- **Automatic Fallback**: When backend is unavailable, app uses mock API
- **Demo Mode Notification**: Orange banner indicates mock mode
- **Full Functionality**: All features work with realistic mock data
- **Seamless Transition**: Automatically switches to real backend when available
- **Mock Data**: Includes sample products, sales data, and inventory
- **Export Support**: Mock CSV/PDF generation for testing

### �🛠️ Next Steps (Optional Enhancements)
- File upload for product images (currently URL-based)
- Real-time notifications with WebSockets
- Advanced reporting with custom date ranges
- User management interface
- Audit logging for admin actions
- Multi-language support
- Performance monitoring dashboard

---

**Note**: This is a clean, production-ready agricultural product management system with modern architecture and best practices.
