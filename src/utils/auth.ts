/**
 * Authentication utilities
 *
 * This file contains utility functions for handling authentication tokens,
 * token expiration, and other auth-related functionality.
 */

import { jwtDecode } from 'jwt-decode/browser';

// Token storage key
const TOKEN_KEY = 'token';

/**
 * Interface for decoded JWT token
 */
interface DecodedToken {
  exp: number;
  iat: number;
  id: string;
  email: string;
  role?: string;
  [key: string]: any;
}

/**
 * Set authentication token in localStorage
 * @param token JWT token
 */
export const setAuthToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Get authentication token from localStorage
 * @returns JWT token or null if not found
 */
export const getAuthToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Remove authentication token from localStorage
 */
export const removeAuthToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

/**
 * Check if token is expired
 * @param token JWT token
 * @returns true if token is expired, false otherwise
 */
export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const currentTime = Date.now() / 1000;

    // Check if token is expired
    return decoded.exp < currentTime;
  } catch (error) {
    // If token can't be decoded, consider it expired
    console.error('Error decoding token:', error);
    return true;
  }
};

/**
 * Get user ID from token
 * @param token JWT token
 * @returns User ID or null if token is invalid
 */
export const getUserIdFromToken = (token: string): string | null => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.id;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

/**
 * Get user role from token
 * @param token JWT token
 * @returns User role or null if token is invalid or role is not present
 */
export const getUserRoleFromToken = (token: string): string | null => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.role || null;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

/**
 * Get token expiration time
 * @param token JWT token
 * @returns Expiration time in milliseconds or null if token is invalid
 */
export const getTokenExpirationTime = (token: string): number | null => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.exp * 1000; // Convert to milliseconds
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

/**
 * Check if user is authenticated
 * @returns true if user is authenticated, false otherwise
 */
export const isAuthenticated = (): boolean => {
  const token = getAuthToken();
  return !!token && !isTokenExpired(token);
};
