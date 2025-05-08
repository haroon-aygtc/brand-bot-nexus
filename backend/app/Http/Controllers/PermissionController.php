
<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Only admin users can list permissions
        if (auth()->user()->role !== 'admin' && !auth()->user()->hasRole('admin')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $query = Permission::query();
        
        // Filter by module if provided
        if ($request->has('module')) {
            $query->where('module', $request->module);
        }
        
        $permissions = $query->get();
        
        return response()->json($permissions);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Only admin users can create permissions
        if (auth()->user()->role !== 'admin' && !auth()->user()->hasRole('admin')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'module' => 'nullable|string|max:255',
        ]);

        // Generate slug from name
        $validated['slug'] = Str::slug($validated['name']);

        // Check if slug already exists
        if (Permission::where('slug', $validated['slug'])->exists()) {
            return response()->json(['message' => 'Permission with this name already exists'], 422);
        }

        $permission = Permission::create([
            'name' => $validated['name'],
            'slug' => $validated['slug'],
            'description' => $validated['description'] ?? null,
            'module' => $validated['module'] ?? null,
        ]);

        return response()->json($permission, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Permission $permission)
    {
        // Only admin users can view permissions
        if (auth()->user()->role !== 'admin' && !auth()->user()->hasRole('admin')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($permission);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Permission $permission)
    {
        // Only admin users can update permissions
        if (auth()->user()->role !== 'admin' && !auth()->user()->hasRole('admin')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'module' => 'nullable|string|max:255',
        ]);

        // Update slug if name is changed
        if (isset($validated['name'])) {
            $validated['slug'] = Str::slug($validated['name']);
            
            // Check if new slug already exists for another permission
            if (Permission::where('slug', $validated['slug'])->where('id', '!=', $permission->id)->exists()) {
                return response()->json(['message' => 'Permission with this name already exists'], 422);
            }
        }

        $permission->update([
            'name' => $validated['name'] ?? $permission->name,
            'slug' => $validated['slug'] ?? $permission->slug,
            'description' => $validated['description'] ?? $permission->description,
            'module' => $validated['module'] ?? $permission->module,
        ]);

        return response()->json($permission->fresh());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Permission $permission)
    {
        // Only admin users can delete permissions
        if (auth()->user()->role !== 'admin' && !auth()->user()->hasRole('admin')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $permission->delete();

        return response()->json(null, 204);
    }
}
