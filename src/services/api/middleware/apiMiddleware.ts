
/**
 * API Middleware
 * 
 * This module provides a standardized way to interact with the backend API.
 * It handles authentication, error handling, and response formatting.
 */

import { ApiResponse } from "@/types/auth";

// API base URL - will use relative URL for Vite proxy
const API_BASE_URL = '/api';

// Token storage key name
const TOKEN_KEY = 'token';

/**
 * Get stored authentication token
 */
const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Request options for fetch API
 */
interface RequestOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, string>;
  requiresAuth?: boolean;
}

/**
 * Generic API request function
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  try {
    const {
      method = 'GET',
      headers = {},
      body,
      params,
      requiresAuth = true,
    } = options;

    // Build URL with query parameters
    let url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    
    if (params) {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value);
        }
      });
      
      const queryString = queryParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    // Build request headers
    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...headers,
    };

    // Add authorization header if required
    if (requiresAuth) {
      const token = getToken();
      if (token) {
        requestHeaders['Authorization'] = `Bearer ${token}`;
      }
    }

    // Build request options
    const fetchOptions: RequestInit = {
      method,
      headers: requestHeaders,
      credentials: 'include', // Include cookies for CSRF protection
    };

    // Add request body for non-GET methods
    if (method !== 'GET' && body) {
      fetchOptions.body = JSON.stringify(body);
    }

    // Log request details for debugging
    console.log(`[API] ${method} ${url}`, { 
      headers: fetchOptions.headers,
      body: method !== 'GET' && body ? body : undefined 
    });

    // Make the request
    const response = await fetch(url, fetchOptions);
    const contentType = response.headers.get('content-type');
    
    let data;
    // Parse response based on content type
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      try {
        // Try to parse as JSON even if content-type is wrong
        data = JSON.parse(text);
      } catch (e) {
        data = { message: text };
      }
    }

    // Log response for debugging
    console.log(`[API] Response from ${url}:`, { 
      status: response.status, 
      data 
    });

    // Handle API error responses
    if (!response.ok) {
      // Format error response
      return {
        data: null as unknown as T,
        success: false,
        message: data.message || `Error: ${response.statusText}`,
        errors: data.errors || data.error || null
      };
    }

    // Format successful response
    return {
      data: data.data || data,
      success: true,
      message: data.message || 'Success'
    };
  } catch (error) {
    // Handle network or other errors
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`[API] Error in request to ${endpoint}:`, error);
    
    return {
      data: null as unknown as T,
      success: false,
      message: `Network error: ${errorMessage}`
    };
  }
}

// API client with typed methods
export const api = {
  get: <T>(endpoint: string, options: Omit<RequestOptions, 'method' | 'body'> = {}) => 
    apiRequest<T>(endpoint, { ...options, method: 'GET' }),
  
  post: <T>(endpoint: string, body: any, options: Omit<RequestOptions, 'method'> = {}) => 
    apiRequest<T>(endpoint, { ...options, method: 'POST', body }),
  
  put: <T>(endpoint: string, body: any, options: Omit<RequestOptions, 'method'> = {}) => 
    apiRequest<T>(endpoint, { ...options, method: 'PUT', body }),
  
  patch: <T>(endpoint: string, body: any, options: Omit<RequestOptions, 'method'> = {}) => 
    apiRequest<T>(endpoint, { ...options, method: 'PATCH', body }),
  
  delete: <T>(endpoint: string, options: Omit<RequestOptions, 'method'> = {}) => 
    apiRequest<T>(endpoint, { ...options, method: 'DELETE' })
};

// Export response type
export type { ApiResponse };
