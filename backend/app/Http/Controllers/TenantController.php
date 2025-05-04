
<?php

namespace App\Http\Controllers;

use App\Models\Tenant;
use Illuminate\Http\Request;

class TenantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Only admin users can list all tenants
        if (auth()->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return Tenant::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Only admin users can create tenants
        if (auth()->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'domain' => 'required|string|unique:tenants',
            'branding' => 'required|array',
            'branding.primaryColor' => 'required|string',
            'branding.secondaryColor' => 'required|string',
            'branding.logo' => 'nullable|string',
            'branding.chatTitle' => 'required|string',
            'settings' => 'required|array',
            'settings.aiModels' => 'required|array',
            'settings.defaultLanguage' => 'required|string',
            'settings.widgetPosition' => 'required|in:bottom-right,bottom-left,top-right,top-left',
        ]);

        $tenant = Tenant::create($validated);

        return response()->json($tenant, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Tenant $tenant)
    {
        // Admin users can view any tenant, regular users can only view their own tenant
        if (auth()->user()->role !== 'admin' && auth()->user()->tenant_id !== $tenant->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return $tenant;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tenant $tenant)
    {
        // Only admin users can update tenants
        if (auth()->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'domain' => 'sometimes|string|unique:tenants,domain,' . $tenant->id,
            'branding' => 'sometimes|array',
            'branding.primaryColor' => 'sometimes|string',
            'branding.secondaryColor' => 'sometimes|string',
            'branding.logo' => 'nullable|string',
            'branding.chatTitle' => 'sometimes|string',
            'settings' => 'sometimes|array',
            'settings.aiModels' => 'sometimes|array',
            'settings.defaultLanguage' => 'sometimes|string',
            'settings.widgetPosition' => 'sometimes|in:bottom-right,bottom-left,top-right,top-left',
        ]);

        $tenant->update($validated);

        return $tenant;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tenant $tenant)
    {
        // Only admin users can delete tenants
        if (auth()->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $tenant->delete();

        return response()->json(null, 204);
    }
}
