import { User } from '../../domain/entities';

export const getUserFromStorage = (): User | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error parsing user data from localStorage:', error);
    return null;
  }
};

export const getTokenFromStorage = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('admin_token');
};

export const isAuthenticated = (): boolean => {
  return !!getTokenFromStorage();
};

export const isAdmin = (): boolean => {
  const user = getUserFromStorage();
  return user?.role === 'Admin';
};
