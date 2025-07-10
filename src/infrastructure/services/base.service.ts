import axios from 'axios';

// Check if we should use mock API
const USE_MOCK_API = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true';

// Create fresh API service each time to avoid SSR issues
export const createApiService = () => {
  // If using mock API, return a service that doesn't make real HTTP calls
  if (USE_MOCK_API) {
    return {
      async get<T>(url: string): Promise<T> {
        // This will be handled by individual service implementations
        throw new Error('Mock API: Use specific service implementation');
      },
      async post<T>(url: string, data?: any): Promise<T> {
        throw new Error('Mock API: Use specific service implementation');
      },
      async put<T>(url: string, data?: any): Promise<T> {
        throw new Error('Mock API: Use specific service implementation');
      },
      async delete<T>(url: string): Promise<T> {
        throw new Error('Mock API: Use specific service implementation');
      }
    };
  }

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
    },
    async put<T>(url: string, data?: any): Promise<T> {
      const response = await axiosInstance.put<T>(url, data);
      return response.data;
    },
    async delete<T>(url: string): Promise<T> {
      const response = await axiosInstance.delete<T>(url);
      return response.data;
    }
  };
};

// Export the mock API flag for use in other services
export { USE_MOCK_API };
