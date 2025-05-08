
<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Only admin users can list all users
        if (auth()->user()->role !== 'admin' && !auth()->user()->hasRole('admin')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return User::with('roles')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Only admin users can create new users
        if (auth()->user()->role !== 'admin' && !auth()->user()->hasRole('admin')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'role' => 'nullable|in:admin,user,guest',
            'tenant_id' => 'nullable|exists:tenants,id',
            'password' => 'required|string|min:8',
            'roles' => 'nullable|array',
            'roles.*' => 'exists:roles,id',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'role' => $validated['role'] ?? 'user',
            'tenant_id' => $validated['tenant_id'] ?? null,
            'password' => Hash::make($validated['password']),
        ]);

        // Assign roles if provided
        if (isset($validated['roles'])) {
            $user->roles()->attach($validated['roles']);
        } else if (isset($validated['role'])) {
            // If no specific roles provided but legacy role is, find corresponding role
            $legacyRole = Role::where('slug', $validated['role'])->first();
            if ($legacyRole) {
                $user->roles()->attach($legacyRole->id);
            }
        }

        return response()->json($user->load('roles'), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        // Users can only view themselves, admins can view any user
        if (auth()->user()->id !== $user->id && auth()->user()->role !== 'admin' && !auth()->user()->hasRole('admin')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return $user->load('roles');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        // Users can only update themselves, admins can update any user
        if (auth()->user()->id !== $user->id && auth()->user()->role !== 'admin' && !auth()->user()->hasRole('admin')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Regular users can't change their role
        if (auth()->user()->role !== 'admin' && !auth()->user()->hasRole('admin') && 
            ($request->has('role') || $request->has('roles'))) {
            return response()->json(['message' => 'Unauthorized to change role'], 403);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $user->id,
            'role' => 'sometimes|in:admin,user,guest',
            'tenant_id' => 'nullable|exists:tenants,id',
            'password' => 'sometimes|string|min:8',
            'roles' => 'sometimes|array',
            'roles.*' => 'exists:roles,id',
        ]);

        // Hash password if it's being updated
        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $user->update($validated);

        // Update roles if provided
        if (isset($validated['roles'])) {
            $user->roles()->sync($validated['roles']);
        } else if (isset($validated['role']) && $validated['role'] !== $user->role) {
            // If no specific roles provided but legacy role is changed, update role
            $user->update(['role' => $validated['role']]);
            
            // Also update roles relationship if corresponding role exists
            $legacyRole = Role::where('slug', $validated['role'])->first();
            if ($legacyRole) {
                $user->roles()->sync([$legacyRole->id]);
            }
        }

        return response()->json($user->fresh()->load('roles'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        // Only admin users can delete users
        if (auth()->user()->role !== 'admin' && !auth()->user()->hasRole('admin')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Prevent deleting yourself
        if (auth()->user()->id === $user->id) {
            return response()->json(['message' => 'Cannot delete your own account'], 400);
        }

        $user->delete();

        return response()->json(null, 204);
    }

    /**
     * Assign roles to a user.
     */
    public function assignRoles(Request $request, User $user)
    {
        // Only admin users can assign roles
        if (auth()->user()->role !== 'admin' && !auth()->user()->hasRole('admin')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'roles' => 'required|array',
            'roles.*' => 'exists:roles,id',
        ]);

        $user->roles()->sync($validated['roles']);

        // Update legacy role field based on first role
        if (!empty($validated['roles'])) {
            $firstRole = Role::find($validated['roles'][0]);
            if ($firstRole) {
                $user->update(['role' => $firstRole->slug]);
            }
        } else {
            $user->update(['role' => 'user']); // Default to user if no roles
        }

        return response()->json($user->fresh()->load('roles'));
    }

    /**
     * Get permissions for a user.
     */
    public function getPermissions(User $user)
    {
        // Users can only view their own permissions, admins can view any user's permissions
        if (auth()->user()->id !== $user->id && auth()->user()->role !== 'admin' && !auth()->user()->hasRole('admin')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $permissions = $user->getPermissions();

        return response()->json($permissions);
    }
}
