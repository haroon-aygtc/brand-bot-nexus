
/**
 * Environment configuration
 * 
 * This module provides typed access to environment variables.
 */

// Define the shape of our environment variables
interface Env {
  // API configuration
  API_BASE_URL: string;
  
  // Application environment
  NODE_ENV: 'development' | 'production' | 'test';
  
  // Laravel backend configuration
  LARAVEL_URL: string;
  
  // Other environment variables
  APP_NAME: string;
  
  // Mock API configuration
  USE_MOCK_API: boolean;
}

// Get environment variables from import.meta.env (Vite)
export const env: Env = {
  API_BASE_URL: import.meta.env.VITE_API_URL || '/api',
  NODE_ENV: (import.meta.env.MODE || 'development') as 'development' | 'production' | 'test',
  LARAVEL_URL: import.meta.env.VITE_LARAVEL_URL || 'http://localhost:8000',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'ChatEmbed',
  USE_MOCK_API: import.meta.env.VITE_USE_MOCK_API === 'true' || true,
};

// Utility to check if we're in development mode
export const isDev = env.NODE_ENV === 'development';

// Utility to check if we're in production mode
export const isProd = env.NODE_ENV === 'production';

// Utility to check if we're in test mode
export const isTest = env.NODE_ENV === 'test';

// Utility to check if we should use mock API
export const useMockApi = env.USE_MOCK_API || isDev;

// Utility to get the full API URL for a specific endpoint
export const getApiUrl = (endpoint: string) => {
  const baseUrl = env.API_BASE_URL;
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${path}`;
};

// Utility to get the full Laravel URL for a specific path
export const getLaravelUrl = (path: string) => {
  const baseUrl = env.LARAVEL_URL;
  const formattedPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${formattedPath}`;
};
