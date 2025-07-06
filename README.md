# Agricultural Frontend - Next.js Admin Dashboard

## Overview
This is a modern admin dashboard built with Next.js and Clean Architecture principles for agricultural business management.

## Features

### ✅ Completed Features
- **Product Management**: Full CRUD operations for products
- **Category Management**: Add, view, and manage product categories
- **Real-time Data**: Integration with backend API
- **Clean Architecture**: Separation of concerns with domain, infrastructure, and presentation layers
- **Modern UI**: Built with Tailwind CSS and responsive design
- **API Integration**: Proxy setup for backend communication
- **Type Safety**: Full TypeScript implementation

### 🔄 In Progress
- User authentication and authorization
- Inventory management
- Sales reporting
- Dashboard analytics

## Tech Stack
- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **API Integration**: Axios with custom service layer
- **Architecture**: Clean Architecture (Domain, Infrastructure, Presentation)

## Project Structure
```
src/
├── app/                    # Next.js App Router
├── domain/                 # Business logic and entities
├── infrastructure/         # External services and repositories
├── presentation/          # UI components and stores
└── shared/                # Common utilities and types
```

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- Backend API server running on port 8082

### Installation
```bash
# Clone the repository
git clone https://github.com/chatchomphu1000/agricultural-frontend.git

# Navigate to project directory
cd agricultural-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup
Make sure your backend API server is running on `http://localhost:8082`

## API Endpoints
The application connects to the following backend endpoints:
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create new category

## Screenshots
- Product Management with real-time category dropdowns
- Category creation modal
- Responsive design for mobile and desktop

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
This project is licensed under the MIT License.

## Contact
For questions or support, please contact the development team.
