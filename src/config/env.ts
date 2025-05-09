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
  
  // Other environment variables
  APP_NAME: string;
}

// Get environment variables from import.meta.env (Vite)
export const env: Env = {
  API_BASE_URL: import.meta.env.VITE_API_URL || '/api',
  NODE_ENV: (import.meta.env.MODE || 'development') as 'development' | 'production' | 'test',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'ChatEmbed',
};

// Utility to check if we're in development mode
export const isDev = env.NODE_ENV === 'development';

// Utility to check if we're in production mode
export const isProd = env.NODE_ENV === 'production';

// Utility to check if we're in test mode
export const isTest = env.NODE_ENV === 'test';

