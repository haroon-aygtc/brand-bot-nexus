
<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\Permission;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Only admin users can list all roles
        if (auth()->user()->role !== 'admin' && !auth()->user()->hasRole('admin')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $roles = Role::with('permissions')->get();
        return response()->json($roles);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Only admin users can create roles
        if (auth()->user()->role !== 'admin' && !auth()->user()->hasRole('admin')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_default' => 'boolean',
            'tenant_id' => 'nullable|exists:tenants,id',
            'permissions' => 'nullable|array',
            'permissions.*' => 'exists:permissions,id',
        ]);

        // Generate slug from name
        $validated['slug'] = Str::slug($validated['name']);

        // Check if slug already exists
        if (Role::where('slug', $validated['slug'])->exists()) {
            return response()->json(['message' => 'Role with this name already exists'], 422);
        }

        $role = Role::create([
            'name' => $validated['name'],
            'slug' => $validated['slug'],
            'description' => $validated['description'] ?? null,
            'is_default' => $validated['is_default'] ?? false,
            'tenant_id' => $validated['tenant_id'] ?? null,
        ]);

        // Attach permissions if provided
        if (isset($validated['permissions'])) {
            $role->permissions()->attach($validated['permissions']);
        }

        return response()->json($role->load('permissions'), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Role $role)
    {
        // Only admin users can view roles
        if (auth()->user()->role !== 'admin' && !auth()->user()->hasRole('admin')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($role->load('permissions'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Role $role)
    {
        // Only admin users can update roles
        if (auth()->user()->role !== 'admin' && !auth()->user()->hasRole('admin')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'is_default' => 'sometimes|boolean',
            'tenant_id' => 'nullable|exists:tenants,id',
            'permissions' => 'nullable|array',
            'permissions.*' => 'exists:permissions,id',
        ]);

        // Update slug if name is changed
        if (isset($validated['name'])) {
            $validated['slug'] = Str::slug($validated['name']);
            
            // Check if new slug already exists for another role
            if (Role::where('slug', $validated['slug'])->where('id', '!=', $role->id)->exists()) {
                return response()->json(['message' => 'Role with this name already exists'], 422);
            }
        }

        $role->update([
            'name' => $validated['name'] ?? $role->name,
            'slug' => $validated['slug'] ?? $role->slug,
            'description' => $validated['description'] ?? $role->description,
            'is_default' => $validated['is_default'] ?? $role->is_default,
            'tenant_id' => $validated['tenant_id'] ?? $role->tenant_id,
        ]);

        // Sync permissions if provided
        if (isset($validated['permissions'])) {
            $role->permissions()->sync($validated['permissions']);
        }

        return response()->json($role->fresh()->load('permissions'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        // Only admin users can delete roles
        if (auth()->user()->role !== 'admin' && !auth()->user()->hasRole('admin')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Prevent deleting default roles
        if ($role->is_default) {
            return response()->json(['message' => 'Cannot delete default roles'], 400);
        }

        $role->delete();

        return response()->json(null, 204);
    }

    /**
     * Assign permissions to a role.
     */
    public function assignPermissions(Request $request, Role $role)
    {
        // Only admin users can assign permissions
        if (auth()->user()->role !== 'admin' && !auth()->user()->hasRole('admin')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'permissions' => 'required|array',
            'permissions.*' => 'exists:permissions,id',
        ]);

        $role->permissions()->sync($validated['permissions']);

        return response()->json($role->fresh()->load('permissions'));
    }
}
