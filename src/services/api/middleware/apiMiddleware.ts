/**
 * API Middleware
 * 
 * This file provides the core API request functionality with middleware
 * for authentication, error handling, and logging.
 */

import { env, useMockApi } from '@/config/env';
import logger from '@/utils/logger';

// API Response interface
export interface ApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
  error?: boolean;
}

// Default headers for API requests
const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

// API instance that handles requests with middleware
export const api = {
  // Generic request method
  async request<T = any>(
    endpoint: string,
    options: RequestInit = {},
    mockData?: T,
    requiresAuth: boolean = true
  ): Promise<ApiResponse<T>> {
    // Use mock data if mocking is enabled and mock data is provided
    if (useMockApi && mockData) {
      logger.info(`[MOCK API] ${options.method || 'GET'} ${endpoint}`, { mockData });
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        data: mockData,
        status: 200,
        message: 'Success (mock data)',
      };
    }

    try {
      // Build request URL
      const baseUrl = env.API_BASE_URL || '/api';
      const url = `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
      
      // Add auth headers if required
      const headers = {
        ...defaultHeaders,
        ...options.headers,
        ...(requiresAuth ? getAuthHeaders() : {}),
      };
      
      // Log the request
      logger.info(`[API] ${options.method || 'GET'} ${url}`, { 
        body: options.body, 
        headers 
      });
      
      // Make the request
      const response = await fetch(url, {
        ...options,
        headers,
        credentials: 'include', // Include cookies for cross-origin requests
      });
      
      // Try to parse as JSON, fall back to text if not possible
      let data: any;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
        try {
          data = JSON.parse(data);
        } catch (e) {
          // Keep as text if not valid JSON
        }
      }
      
      // Log the response
      logger.info(`[API] Response from ${url}:`, { 
        status: response.status, 
        data 
      });
      
      // Return formatted response
      return {
        data,
        status: response.status,
        message: response.statusText,
        error: !response.ok,
      };
    } catch (error) {
      // Log and rethrow error
      logger.error(`[API] Error in request to ${endpoint}:`, error);
      
      throw error;
    }
  },
  
  // Convenience methods for different HTTP methods
  async get<T = any>(endpoint: string, options: RequestInit = {}, mockData?: T, requiresAuth: boolean = true): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' }, mockData, requiresAuth);
  },
  
  async post<T = any>(endpoint: string, data: any, options: RequestInit = {}, mockData?: T, requiresAuth: boolean = true): Promise<ApiResponse<T>> {
    return this.request<T>(
      endpoint, 
      { 
        ...options, 
        method: 'POST',
        body: JSON.stringify(data),
      },
      mockData,
      requiresAuth
    );
  },
  
  async put<T = any>(endpoint: string, data: any, options: RequestInit = {}, mockData?: T, requiresAuth: boolean = true): Promise<ApiResponse<T>> {
    return this.request<T>(
      endpoint,
      {
        ...options,
        method: 'PUT',
        body: JSON.stringify(data),
      },
      mockData,
      requiresAuth
    );
  },
  
  async delete<T = any>(endpoint: string, options: RequestInit = {}, mockData?: T, requiresAuth: boolean = true): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' }, mockData, requiresAuth);
  },
  
  async patch<T = any>(endpoint: string, data: any, options: RequestInit = {}, mockData?: T, requiresAuth: boolean = true): Promise<ApiResponse<T>> {
    return this.request<T>(
      endpoint,
      {
        ...options,
        method: 'PATCH',
        body: JSON.stringify(data),
      },
      mockData,
      requiresAuth
    );
  },
};

// Helper function to get auth headers
function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}
