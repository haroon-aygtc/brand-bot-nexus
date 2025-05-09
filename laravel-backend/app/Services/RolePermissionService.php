
<?php

namespace App\Services;

use App\Models\Role;
use App\Models\User;
use App\Models\Permission;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class RolePermissionService
{
    /**
     * Create a new role with optional permissions.
     *
     * @param array $data Role data
     * @param array|null $permissionIds Permission IDs to assign
     * @return Role
     */
    public function createRole(array $data, ?array $permissionIds = null): Role
    {
        // Generate slug from name if not provided
        if (!isset($data['slug']) && isset($data['name'])) {
            $data['slug'] = Str::slug($data['name']);
        }

        $role = Role::create($data);

        if ($permissionIds) {
            $role->permissions()->attach($permissionIds);
        }

        return $role;
    }

    /**
     * Update an existing role with optional permissions.
     *
     * @param Role $role Role to update
     * @param array $data Updated role data
     * @param array|null $permissionIds Permission IDs to assign
     * @return Role
     */
    public function updateRole(Role $role, array $data, ?array $permissionIds = null): Role
    {
        // Generate slug from name if name is being updated
        if (isset($data['name']) && (!isset($data['slug']) || $data['slug'] !== Str::slug($data['name']))) {
            $data['slug'] = Str::slug($data['name']);
        }

        $role->update($data);

        if ($permissionIds !== null) {
            $role->permissions()->sync($permissionIds);
        }

        return $role->fresh();
    }

    /**
     * Create a new permission.
     *
     * @param array $data Permission data
     * @return Permission
     */
    public function createPermission(array $data): Permission
    {
        // Generate slug from name if not provided
        if (!isset($data['slug']) && isset($data['name'])) {
            $data['slug'] = Str::slug($data['name']);
        }

        return Permission::create($data);
    }

    /**
     * Assign roles to a user.
     *
     * @param User $user User to assign roles to
     * @param array $roleIds Role IDs to assign
     * @return User
     */
    public function assignRolesToUser(User $user, array $roleIds): User
    {
        $user->roles()->sync($roleIds);

        // Update legacy role field based on first role
        if (!empty($roleIds)) {
            $firstRole = Role::find($roleIds[0]);
            if ($firstRole) {
                $user->update(['role' => $firstRole->slug]);
            }
        } else {
            $user->update(['role' => 'user']); // Default to user if no roles
        }

        return $user->fresh();
    }

    /**
     * Assign permissions to a role.
     *
     * @param Role $role Role to assign permissions to
     * @param array $permissionIds Permission IDs to assign
     * @return Role
     */
    public function assignPermissionsToRole(Role $role, array $permissionIds): Role
    {
        $role->permissions()->sync($permissionIds);
        return $role->fresh();
    }

    /**
     * Get all permissions for a user through their roles.
     *
     * @param User $user User to get permissions for
     * @return Collection
     */
    public function getUserPermissions(User $user): Collection
    {
        return $user->getPermissions();
    }

    /**
     * Check if a user has a specific permission.
     *
     * @param User $user User to check
     * @param string|array $permissions Permission slug(s) to check
     * @return bool
     */
    public function userHasPermission(User $user, $permissions): bool
    {
        return $user->hasPermission($permissions);
    }

    /**
     * Check if a user has a specific role.
     *
     * @param User $user User to check
     * @param string|array $roles Role slug(s) to check
     * @return bool
     */
    public function userHasRole(User $user, $roles): bool
    {
        return $user->hasRole($roles);
    }

    /**
     * Get all available permissions, optionally filtered by module.
     *
     * @param string|null $module Module to filter by
     * @return Collection
     */
    public function getAllPermissions(?string $module = null): Collection
    {
        $query = Permission::query();
        
        if ($module) {
            $query->where('module', $module);
        }
        
        return $query->get();
    }

    /**
     * Get all available roles.
     *
     * @return Collection
     */
    public function getAllRoles(): Collection
    {
        return Role::with('permissions')->get();
    }
}
