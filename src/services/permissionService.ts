import api from './api';
import { Permission } from '@/types/role';

/**
 * Get all permissions
 */
export const getAllPermissions = async (): Promise<Permission[]> => {
  try {
    console.log('[PermissionService] Fetching all permissions');
    const response = await api.get('roles/permissions/all', true);
    console.log('[PermissionService] Raw permissions response:', response);

    // Handle different response structures that might be returned
    if (response && response.success && Array.isArray(response.data)) {
      // New standardized response format
      console.log('[PermissionService] Found standardized response with', response.data.length, 'permissions');
      return response.data;
    }

    if (response && Array.isArray(response)) {
      // Direct array response (legacy format)
      return response;
    }

    if (response && Array.isArray(response.data)) {
      // Response has a data property that is an array (legacy format)
      return response.data;
    }

    console.warn('[PermissionService] Could not find permissions in response:', response);
    return []; // Return empty array if no permissions found
  } catch (error) {
    console.error('Error fetching permissions:', error);
    throw error;
  }
};

/**
 * Create mock permissions for when API fails
 */
const createMockPermissions = (): Permission[] => {
  console.log('[PermissionService] Creating mock permissions');
  const now = new Date().toISOString();
  return [
    { id: '1', name: 'user:create', description: 'Can create users', category: 'user', action: 'create', createdAt: now, updatedAt: now },
    { id: '2', name: 'user:read', description: 'Can read users', category: 'user', action: 'read', createdAt: now, updatedAt: now },
    { id: '3', name: 'user:update', description: 'Can update users', category: 'user', action: 'update', createdAt: now, updatedAt: now },
    { id: '4', name: 'user:delete', description: 'Can delete users', category: 'user', action: 'delete', createdAt: now, updatedAt: now },
    { id: '5', name: 'role:create', description: 'Can create roles', category: 'role', action: 'create', createdAt: now, updatedAt: now },
    { id: '6', name: 'role:read', description: 'Can read roles', category: 'role', action: 'read', createdAt: now, updatedAt: now },
    { id: '7', name: 'role:update', description: 'Can update roles', category: 'role', action: 'update', createdAt: now, updatedAt: now },
    { id: '8', name: 'content:read', description: 'Can read content', category: 'content', action: 'read', createdAt: now, updatedAt: now },
    { id: '9', name: 'content:create', description: 'Can create content', category: 'content', action: 'create', createdAt: now, updatedAt: now },
    { id: '10', name: 'content:update', description: 'Can update content', category: 'content', action: 'update', createdAt: now, updatedAt: now },
    { id: '11', name: 'analytics:read', description: 'Can view analytics', category: 'analytics', action: 'read', createdAt: now, updatedAt: now },
    { id: '12', name: 'settings:update', description: 'Can update settings', category: 'settings', action: 'update', createdAt: now, updatedAt: now }
  ];
};

/**
 * Get permission by ID
 */
export const getPermissionById = async (id: string): Promise<Permission> => {
  try {
    console.log(`[PermissionService] Fetching permission with ID: ${id}`);
    const response = await api.get(`roles/permissions/${id}`, true);
    console.log(`[PermissionService] Permission response:`, response);

    // Handle standardized response format
    if (response && response.success && response.data) {
      console.log('[PermissionService] Found standardized response with permission data');
      return response.data;
    }

    // Handle legacy response formats
    if (response && response.id && response.name) {
      return response;
    }

    if (response && response.data && response.data.id && response.data.name) {
      return response.data;
    }

    throw new Error(`Permission with ID ${id} not found`);
  } catch (error) {
    console.error(`Error fetching permission ${id}:`, error);
    throw error;
  }
};

/**
 * Get permissions by IDs
 */
export const getPermissionsByIds = async (ids: string[]): Promise<Permission[]> => {
  try {
    // Try the new endpoint first
    try {
      const response = await api.post('permissions/by-ids', { ids }, true);
      return response.data;
    } catch (firstError) {
      // If the new endpoint fails, try the old one as fallback
      console.warn('New permissions/by-ids endpoint failed, trying fallback:', firstError);
      const response = await api.post('permissions/ids', { ids }, true);
      return response.data;
    }
  } catch (error) {
    console.error('Error fetching permissions by IDs:', error);
    throw error;
  }
};

/**
 * Get permissions by category
 */
export const getPermissionsByCategory = async (category: string): Promise<Permission[]> => {
  try {
    const response = await api.get(`permissions/category/${category}`, true);

    // Check if response.data is an array
    if (Array.isArray(response.data)) {
      return response.data;
    }

    // If response.data is not an array but has a data property that is an array
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }

    // If we can't find an array, try to get all permissions and filter by category
    console.warn(`Unexpected response format for category ${category}, trying to filter all permissions`);
    const allPermissions = await getAllPermissions();
    return allPermissions.filter(p => p.category?.toLowerCase() === category.toLowerCase());
  } catch (error) {
    console.error(`Error fetching permissions for category ${category}:`, error);

    // Try to get all permissions and filter by category as a fallback
    try {
      const allPermissions = await getAllPermissions();
      return allPermissions.filter(p => p.category?.toLowerCase() === category.toLowerCase());
    } catch (fallbackError) {
      console.error('Fallback also failed:', fallbackError);
      return []; // Return empty array to prevent UI issues
    }
  }
};

/**
 * Get permissions by role ID
 */
export const getPermissionsByRoleId = async (roleId: string): Promise<Permission[]> => {
  try {
    console.log(`[PermissionService] Fetching permissions for role ${roleId}`);
    const response = await api.get(`roles/${roleId}/permissions`, true);
    console.log(`[PermissionService] Role permissions response:`, response);

    // Handle standardized response format
    if (response && response.success && Array.isArray(response.data)) {
      console.log('[PermissionService] Found standardized response with', response.data.length, 'permissions');
      return response.data;
    }

    // Handle legacy response formats
    if (response && Array.isArray(response)) {
      return response;
    }

    if (response && Array.isArray(response.data)) {
      return response.data;
    }

    console.warn(`[PermissionService] Could not find permissions for role ${roleId} in response:`, response);
    return []; // Return empty array if no permissions found
  } catch (error) {
    console.error(`Error fetching permissions for role ${roleId}:`, error);
    throw error;
  }
};

/**
 * Assign permission to a role
 */
export const assignPermissionToRole = async (
  roleId: string,
  permissionId: string
): Promise<any> => {
  try {
    console.log(`[PermissionService] Assigning permission ${permissionId} to role ${roleId}`);
    const response = await api.post('roles/permissions/assign', { roleId, permissionIds: [permissionId] }, true);
    console.log(`[PermissionService] Assign permission response:`, response);

    // Handle standardized response format
    if (response && response.success) {
      console.log('[PermissionService] Permission assigned successfully with standardized response');
      return response.data || response;
    }

    // Handle legacy response formats
    return response;
  } catch (error) {
    console.error(`Error assigning permission ${permissionId} to role ${roleId}:`, error);
    throw error;
  }
};

/**
 * Assign multiple permissions to a role
 */
export const assignPermissionsToRole = async (
  roleId: string,
  permissionIds: string[]
): Promise<any> => {
  try {
    console.log(`[PermissionService] Assigning permissions to role ${roleId}:`, permissionIds);
    const response = await api.post('roles/permissions/assign', { roleId, permissionIds }, true);
    console.log(`[PermissionService] Assign permissions response:`, response);

    // Handle standardized response format
    if (response && response.success) {
      console.log('[PermissionService] Permissions assigned successfully with standardized response');
      return response.data || response;
    }

    // Handle legacy response formats
    return response;
  } catch (error) {
    console.error(`Error assigning permissions to role ${roleId}:`, error);
    throw error;
  }
};

/**
 * Remove permission from a role
 */
export const removePermissionFromRole = async (
  roleId: string,
  permissionId: string
): Promise<any> => {
  try {
    console.log(`[PermissionService] Removing permission ${permissionId} from role ${roleId}`);
    const response = await api.delete(`roles/${roleId}/permissions/${permissionId}`, true);
    console.log(`[PermissionService] Remove permission response:`, response);

    // Handle standardized response format
    if (response && response.success) {
      console.log('[PermissionService] Permission removed successfully with standardized response');
      return response.data || response;
    }

    // Handle legacy response formats
    return response;
  } catch (error) {
    console.error(`Error removing permission ${permissionId} from role ${roleId}:`, error);
    throw error;
  }
};

/**
 * Assign permissions to user
 */
export const assignPermissionsToUser = async (userId: string, permissionIds: string[]): Promise<any> => {
  try {
    // Try the new endpoint first
    try {
      const response = await api.post('permissions/user/assign', { userId, permissionIds }, true);
      return response.data;
    } catch (firstError) {
      // If the new endpoint fails, try the old one as fallback
      console.warn('New permissions/user/assign endpoint failed, trying fallback:', firstError);
      const response = await api.post('permissions/assign-user', { userId, permissionIds }, true);
      return response.data;
    }
  } catch (error) {
    console.error(`Error assigning permissions to user ${userId}:`, error);
    throw error;
  }
};
