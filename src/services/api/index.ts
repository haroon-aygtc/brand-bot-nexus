
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
import { aiApi } from "./features/ai";

// API endpoints
import * as endpoints from "./endpoints";

// Export all API-related services and utilities
export {
  // Core API utilities
  api,

  // Feature-specific API services
  authApi,
  aiApi,

  // API endpoints
  endpoints,
};

// Export types from middleware
export type {
  ApiResponse
} from "./middleware/apiMiddleware";
