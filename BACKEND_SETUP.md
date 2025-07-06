# Backend Setup Instructions

## Option 1: Start the Backend Server (Recommended)

If you have the backend server code, please start it on port 8082:

```bash
# Navigate to your backend directory
cd /path/to/your/backend

# Start the server (this depends on your backend technology)
# For Go:
go run main.go

# For Node.js:
npm start

# For Docker:
docker-compose up

# The server should be running on http://localhost:8082
```

## Option 2: Current Demo Mode

The application is currently running in **Demo Mode** with mock data because the backend server at `http://localhost:8082` is not available.

### Features Working in Demo Mode:
- ✅ Admin login (use: admin@agricultural.com / password123)
- ✅ Product management (CRUD operations)
- ✅ Inventory management (stock updates)
- ✅ Sales reports and analytics
- ✅ Dashboard overview with charts
- ✅ Export functionality (CSV/PDF)

### Mock API Endpoints:
- `POST /api/auth/login` - Mock authentication
- `GET /api/products` - Mock product listing
- `POST /api/products` - Mock product creation
- `PUT /api/products/:id` - Mock product update
- `DELETE /api/products/:id` - Mock product deletion
- `GET /api/stock/summary` - Mock inventory summary
- `GET /api/sales/summary` - Mock sales summary
- `GET /api/sales` - Mock sales records
- `GET /api/sales/by-product` - Mock product sales

### To Switch to Real Backend:
1. Ensure your backend server is running on `http://localhost:8082`
2. The frontend will automatically detect the backend and switch from mock mode
3. Refresh the application to see live data

## API Documentation
Once your backend is running, you can access the Swagger documentation at:
`http://localhost:8082/swagger/index.html`

## Environment Variables
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8082
```
