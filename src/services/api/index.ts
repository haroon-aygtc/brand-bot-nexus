
/**
 * API Module Index
 *
 * This file exports all API-related services and utilities
 * for importing API functionality throughout the application.
 */

// Core API utilities
import { api } from "./middleware/apiMiddleware";

// Feature-specific API services
import { authApi } from "./features/auth";

// API endpoints
import * as endpoints from "./endpoints/authEndpoints";

// Export all API-related services and utilities
export {
  // Core API utilities
  api,

  // Feature-specific API services
  authApi,

  // API endpoints
  endpoints,
};

// Export types from auth
export type {
  ApiResponse
} from "./middleware/apiMiddleware";
