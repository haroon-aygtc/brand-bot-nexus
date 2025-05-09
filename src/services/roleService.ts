import api from './api';
import { Role, Permission } from '@/types/role';

/**
 * Get all roles
 */
export const getAllRoles = async (): Promise<Role[]> => {
  try {
    console.log('[RoleService] Fetching all roles');
    const response = await api.get('roles', true);
    console.log('[RoleService] Raw roles response:', response);

    // Handle different response structures that might be returned
    if (response && response.success && Array.isArray(response.data)) {
      // New standardized response format
      console.log('[RoleService] Found standardized response with', response.data.length, 'roles');
      return response.data;
    }

    if (response && Array.isArray(response)) {
      // Direct array response (legacy format)
      console.log('[RoleService] Response is an array with', response.length, 'roles');
      return response;
    }

    if (response && Array.isArray(response.data)) {
      // Response has a data property that is an array (legacy format)
      console.log('[RoleService] Response.data is an array with', response.data.length, 'roles');
      return response.data;
    }

    if (response && response.data && Array.isArray(response.data.roles)) {
      // Response has data.roles that is an array (legacy format)
      console.log('[RoleService] Response.data.roles is an array with', response.data.roles.length, 'roles');
      return response.data.roles;
    }

    if (response && typeof response === 'object' && Object.keys(response).length > 0) {
      // Response is an object with keys - it might be a single role or have some other structure
      console.log('[RoleService] Response is an object:', response);
      if (response.id && response.name) {
        // Looks like a single role - return as array with one item
        return [response];
      }

      // Try to find roles in any property of the response
      for (const key in response) {
        if (Array.isArray(response[key])) {
          const possibleRoles = response[key];
          if (possibleRoles.length > 0 && possibleRoles[0].id && possibleRoles[0].name) {
            console.log(`[RoleService] Found roles array in response.${key}`);
            return possibleRoles;
          }
        }
      }
    }

    console.warn('[RoleService] Could not find roles in response:', response);
    return []; // Return empty array if no roles found
  } catch (error) {
    console.error('Error fetching roles:', error);
    throw error;
  }
};

/**
 * Get role by ID
 */
export const getRoleById = async (id: string): Promise<Role> => {
  try {
    console.log(`[RoleService] Fetching role with ID: ${id}`);
    const response = await api.get(`roles/${id}`, true);
    console.log(`[RoleService] Role response:`, response);

    // Handle standardized response format
    if (response && response.success && response.data) {
      console.log('[RoleService] Found standardized response with role data');
      return response.data;
    }

    // Handle legacy response formats
    if (response && response.id && response.name) {
      return response;
    }

    if (response && response.data && response.data.id && response.data.name) {
      return response.data;
    }

    throw new Error(`Role with ID ${id} not found`);
  } catch (error) {
    console.error(`Error fetching role ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new role
 */
export const createRole = async (role: {
  name: string;
  description?: string;
  isDefault?: boolean;
  permissionIds?: string[];
}): Promise<Role> => {
  try {
    console.log('[RoleService] Creating role:', role);
    const response = await api.post('roles', role, true);
    console.log('[RoleService] Create role response:', response);

    // Handle standardized response format
    if (response && response.success && response.data) {
      console.log('[RoleService] Role created successfully with standardized response');
      return response.data;
    }

    // Handle legacy response formats
    if (response && response.id) {
      console.log('[RoleService] Role created successfully with legacy response');
      return response;
    }

    if (response && response.data && response.data.id) {
      console.log('[RoleService] Role created successfully with legacy response');
      return response.data;
    }

    throw new Error('Failed to create role: invalid response format');
  } catch (error) {
    console.error('Error creating role:', error);
    throw error;
  }
};

/**
 * Update a role
 */
export const updateRole = async (
  id: string,
  role: {
    name?: string;
    description?: string;
    isDefault?: boolean;
    permissionIds?: string[];
  }
): Promise<Role> => {
  try {
    console.log(`[RoleService] Updating role: ${id}`, role);
    const response = await api.put(`roles/${id}`, role, true);
    console.log(`[RoleService] Update role response:`, response);

    // Handle standardized response format
    if (response && response.success && response.data) {
      console.log('[RoleService] Role updated successfully with standardized response');
      return response.data;
    }

    // Handle legacy response formats
    if (response && response.id) {
      console.log('[RoleService] Role updated successfully with legacy response');
      return response;
    }

    if (response && response.data && response.data.id) {
      console.log('[RoleService] Role updated successfully with legacy response');
      return response.data;
    }

    throw new Error('Failed to update role: invalid response format');
  } catch (error) {
    console.error(`Error updating role ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a role
 */
export const deleteRole = async (id: string): Promise<void> => {
  try {
    console.log(`[RoleService] Deleting role: ${id}`);
    const response = await api.delete(`roles/${id}`, true);
    console.log(`[RoleService] Delete role response:`, response);

    // Both standardized and legacy formats are fine here
    // The function doesn't need to return anything
  } catch (error) {
    console.error(`Error deleting role ${id}:`, error);
    throw error;
  }
};

/**
 * Get all permissions
 */
export const getAllPermissions = async (): Promise<Permission[]> => {
  try {
    console.log('[RoleService] Fetching all permissions');
    const response = await api.get('roles/permissions/all', true);
    console.log('[RoleService] Raw permissions response:', response);

    // Handle different response structures that might be returned
    if (response && response.success && Array.isArray(response.data)) {
      // New standardized response format
      console.log('[RoleService] Found standardized response with permissions');
      return response.data;
    }

    if (response && Array.isArray(response)) {
      // Direct array response (legacy format)
      console.log('[RoleService] Permissions response is an array with', response.length, 'items');
      return response;
    }

    if (response && Array.isArray(response.data)) {
      // Response has a data property that is an array (legacy format)
      console.log('[RoleService] Response.data is an array with', response.data.length, 'permissions');
      return response.data;
    }

    if (response && response.data && Array.isArray(response.data.permissions)) {
      // Response has data.permissions that is an array (legacy format)
      console.log('[RoleService] Response.data.permissions is an array with', response.data.permissions.length, 'items');
      return response.data.permissions;
    }

    if (response && typeof response === 'object' && Object.keys(response).length > 0) {
      // Try to find permissions in any property of the response
      for (const key in response) {
        if (Array.isArray(response[key])) {
          const possiblePermissions = response[key];
          if (possiblePermissions.length > 0 && possiblePermissions[0].id && possiblePermissions[0].name) {
            console.log(`[RoleService] Found permissions array in response.${key}`);
            return possiblePermissions;
          }
        }
      }
    }

    // If we couldn't find permissions, create default ones for testing
    console.warn('[RoleService] Could not find permissions in response, using defaults:', response);
    const now = new Date().toISOString();
    return [
      { id: '1', name: 'user:create', description: 'Can create users', category: 'user', action: 'create', createdAt: now, updatedAt: now },
      { id: '2', name: 'user:read', description: 'Can read users', category: 'user', action: 'read', createdAt: now, updatedAt: now },
      { id: '3', name: 'user:update', description: 'Can update users', category: 'user', action: 'update', createdAt: now, updatedAt: now },
      { id: '4', name: 'user:delete', description: 'Can delete users', category: 'user', action: 'delete', createdAt: now, updatedAt: now },
      { id: '5', name: 'role:create', description: 'Can create roles', category: 'role', action: 'create', createdAt: now, updatedAt: now },
      { id: '6', name: 'role:read', description: 'Can read roles', category: 'role', action: 'read', createdAt: now, updatedAt: now },
      { id: '7', name: 'role:update', description: 'Can update roles', category: 'role', action: 'update', createdAt: now, updatedAt: now },
      { id: '8', name: 'role:delete', description: 'Can delete roles', category: 'role', action: 'delete', createdAt: now, updatedAt: now },
    ];
  } catch (error) {
    console.error('Error fetching permissions:', error);
    throw error;
  }
};

/**
 * Get permission by ID
 */
export const getPermissionById = async (id: string): Promise<Permission> => {
  try {
    console.log(`[RoleService] Fetching permission with ID: ${id}`);
    const response = await api.get(`roles/permissions/${id}`, true);
    console.log(`[RoleService] Permission response:`, response);

    // Handle standardized response format
    if (response && response.success && response.data) {
      console.log('[RoleService] Found standardized response with permission data');
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
 * Assign permissions to a role
 */
export const assignPermissionsToRole = async (roleId: string, permissionIds: string[]): Promise<any> => {
  try {
    console.log(`[RoleService] Assigning permissions to role ${roleId}:`, permissionIds);
    const response = await api.post('roles/permissions/assign', { roleId, permissionIds }, true);
    console.log(`[RoleService] Assign permissions response:`, response);

    // Handle standardized response format
    if (response && response.success) {
      console.log('[RoleService] Permissions assigned successfully with standardized response');
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
 * Get role permissions
 */
export const getRolePermissions = async (roleId: string): Promise<Permission[]> => {
  try {
    console.log(`[RoleService] Fetching permissions for role ${roleId}`);
    const response = await api.get(`roles/${roleId}/permissions`, true);
    console.log(`[RoleService] Role permissions response:`, response);

    // Handle standardized response format
    if (response && response.success && Array.isArray(response.data)) {
      console.log('[RoleService] Found standardized response with role permissions');
      return response.data;
    }

    // Handle legacy response formats
    if (response && Array.isArray(response)) {
      return response;
    }

    if (response && Array.isArray(response.data)) {
      return response.data;
    }

    if (response && response.data && Array.isArray(response.data.permissions)) {
      return response.data.permissions;
    }

    console.warn(`[RoleService] Could not extract permissions for role ${roleId} from response:`, response);
    return []; // Return empty array if no permissions found
  } catch (error) {
    console.error(`Error fetching permissions for role ${roleId}:`, error);
    throw error;
  }
};

/**
 * Get users by role ID
 */
export const getUsersByRoleId = async (roleId: string): Promise<any[]> => {
  try {
    const response = await api.get(`roles/${roleId}/users`, true);

    // Check if response.data is an array
    if (Array.isArray(response.data)) {
      return response.data;
    }

    // If response.data is not an array but has a data property that is an array
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }

    // If we can't find an array, log the response and return an empty array
    console.warn(`Unexpected users response format for role ${roleId}:`, response);
    return [];
  } catch (error) {
    console.error(`Error fetching users for role ${roleId}:`, error);
    return []; // Return empty array on error to prevent UI issues
  }
};

/**
 * Assign role to user
 */
export const assignRoleToUser = async (roleId: string, userId: string): Promise<any> => {
  try {
    const response = await api.post(`roles/${roleId}/users`, { userId }, true);
    return response.data;
  } catch (error) {
    console.error(`Error assigning role ${roleId} to user ${userId}:`, error);
    throw error;
  }
};

/**
 * Remove role from user
 */
export const removeRoleFromUser = async (roleId: string, userId: string): Promise<any> => {
  try {
    const response = await api.post(`roles/${roleId}/users/remove`, { userId }, true);
    return response.data;
  } catch (error) {
    console.error(`Error removing role ${roleId} from user ${userId}:`, error);
    throw error;
  }
};
