/**
 * API Service
 * Centralized service for making API requests
 */

// When using Vite proxy, we can use relative URLs
// This will be automatically proxied to the backend
const API_URL = '/api';

// Default request headers
const defaultHeaders = {
  'Content-Type': 'application/json',
};

// Flag to prevent infinite refresh loops
let isRefreshing = false;
let refreshPromise: Promise<any> | null = null;

// Helper function to handle API responses
const handleResponse = async (response: Response, endpoint: string, retryCount = 0) => {
  // Log the raw response for debugging
  console.log(`[API] Raw response from ${endpoint}:`, {
    status: response.status,
    statusText: response.statusText,
    headers: Object.fromEntries([...response.headers.entries()])
  });

  // Clone the response to read it multiple times if needed
  const clonedResponse = response.clone();

  try {
    // Try to parse the response as JSON
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
      console.log(`[API] Response JSON data from ${endpoint}:`, data);
    } else {
      // If not JSON, get the text content
      const textContent = await response.text();
      console.log(`[API] Response text data from ${endpoint}:`, textContent);
      // Try to parse it as JSON anyway in case the content-type header is wrong
      try {
        data = JSON.parse(textContent);
        console.log(`[API] Parsed text as JSON from ${endpoint}:`, data);
      } catch (e) {
        console.log(`[API] Could not parse text as JSON from ${endpoint}, using as is`);
        data = { message: textContent };
      }
    }

    if (!response.ok) {
      // Extract error message from response
      const errorMessage = data.error?.message || data.message || `API Error: ${response.statusText}`;
      console.error(`[API] Error response from ${endpoint}:`, { status: response.status, message: errorMessage, data });
      throw new Error(errorMessage);
    }

    // Check for application-level errors
    if (data.status === 'error') {
      console.error(`[API] Application error from ${endpoint}:`, data);
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    // If JSON parsing fails, try to get the text content
    if (error instanceof SyntaxError) {
      const textContent = await clonedResponse.text();
      console.error(`[API] Failed to parse JSON response from ${endpoint}:`, { textContent });
      throw new Error(`Invalid response format from ${endpoint}`);
    }
    throw error;
  }
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.warn('No token found in localStorage');
  }
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

/**
 * API request function
 * @param endpoint - API endpoint (without base URL)
 * @param method - HTTP method
 * @param data - Request body data
 * @param requiresAuth - Whether the request requires authentication (defaults to true for production)
 * @returns Promise with response data
 */
export const apiRequest = async (
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET',
  data: any = null,
  requiresAuth: boolean = true
) => {
  try {
    // Build request URL
    const url = `${API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

    // Build request headers
    const headers = {
      ...defaultHeaders,
      ...(requiresAuth ? getAuthHeaders() : {}),
    };

    // Build request options
    const options: RequestInit = {
      method,
      headers,
      credentials: 'include', // Include cookies for cross-origin requests
    };

    // Add request body for non-GET requests
    if (method !== 'GET' && data) {
      options.body = JSON.stringify(data);
    }

    // Log the request details for debugging
    console.log(`[API] Making ${method} request to ${url}`, {
      headers: options.headers,
      body: method !== 'GET' && data ? data : undefined
    });

    // Make the request
    const response = await fetch(url, options);

    // Log response status
    console.log(`[API] Response status for ${url}: ${response.status} ${response.statusText}`);

    // Handle the response
    try {
      const responseData = await handleResponse(response, endpoint);
      console.log(`[API] Successful response data from ${endpoint}:`, responseData);
      return responseData;
    } catch (error) {
      // If we get a 401 Unauthorized error and this isn't already a refresh token request
      // and we're not already refreshing, try to refresh the token and retry the request
      if (
        response.status === 401 &&
        requiresAuth &&
        endpoint !== 'auth/refresh-token' &&
        endpoint !== 'auth/logout'
      ) {
        console.log('[API] Got 401, attempting to refresh token...');

        try {
          // If we're already refreshing, wait for that to complete
          if (isRefreshing && refreshPromise) {
            await refreshPromise;
          } else {
            // Start refreshing
            isRefreshing = true;
            refreshPromise = (async () => {
              try {
                // Import dynamically to avoid circular dependency
                const authService = await import('./authService');
                const refreshResponse = await authService.refreshToken();

                // Update token in localStorage
                if (refreshResponse && refreshResponse.token) {
                  localStorage.setItem('token', refreshResponse.token);
                  localStorage.setItem('user', JSON.stringify(refreshResponse.user));
                  console.log('[API] Token refreshed successfully');
                }
              } catch (refreshError) {
                console.error('[API] Failed to refresh token:', refreshError);
                // Clear auth data on refresh failure
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                // Redirect to login page
                window.location.href = '/auth/login';
                throw refreshError;
              } finally {
                isRefreshing = false;
                refreshPromise = null;
              }
            })();

            await refreshPromise;
          }

          // Retry the original request with the new token
          console.log('[API] Retrying original request with new token');
          return await apiRequest(endpoint, method, data, requiresAuth);
        } catch (refreshError) {
          console.error('[API] Error during token refresh:', refreshError);
          throw error; // Throw the original error
        }
      }

      // For other errors, log and rethrow
      console.error(`[API] Error in ${method} request to ${endpoint}:`, error);
      throw error;
    }
  } catch (error) {
    console.error(`[API] ${method} request to ${endpoint} failed:`, error);
    // Provide more context in the error
    if (error instanceof Error) {
      error.message = `API Error (${endpoint}): ${error.message}`;
    }
    throw error;
  }
};

// Export convenience methods
export const get = (endpoint: string, requiresAuth: boolean = true) =>
  apiRequest(endpoint, 'GET', null, requiresAuth);

export const post = (endpoint: string, data: any, requiresAuth: boolean = true) =>
  apiRequest(endpoint, 'POST', data, requiresAuth);

export const put = (endpoint: string, data: any, requiresAuth: boolean = true) =>
  apiRequest(endpoint, 'PUT', data, requiresAuth);

export const del = (endpoint: string, requiresAuth: boolean = true) =>
  apiRequest(endpoint, 'DELETE', null, requiresAuth);

export const patch = (endpoint: string, data: any, requiresAuth: boolean = true) =>
  apiRequest(endpoint, 'PATCH', data, requiresAuth);

export default {
  get,
  post,
  put,
  delete: del,
  patch,
};
