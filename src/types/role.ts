export interface Role {
  id: number;
  name: string;
  display_name: string;
  description: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
  permissions?: Permission[];
  pivot?: {
    user_id: number;
    role_id: number;
    assigned_at: string;
  };
}

export interface Permission {
  id: number;
  name: string;
  display_name: string;
  description: string;
  created_at: string;
  updated_at: string;
  pivot?: {
    role_id: number;
    permission_id: number;
  };
}

export interface RolePermission {
  roleId: string;
  permissionId: string;
  assignedAt: string;
  assignedBy: string | null;
  createdAt: string;
  permission?: Permission;
}

export interface RoleCreateRequest {
  name: string;
  description?: string;
  isDefault?: boolean;
  permissionIds?: string[];
}

export interface RoleUpdateRequest {
  name?: string;
  description?: string;
  isDefault?: boolean;
  permissionIds?: string[];
}

export interface PermissionCreateRequest {
  name: string;
  description?: string;
  category: string;
  action: string;
}

export interface PermissionUpdateRequest {
  name?: string;
  description?: string;
  category?: string;
  action?: string;
}

export interface RoleWithPermissions extends Role {
  permissions: Permission[];
}
