
<?php

namespace App\Http\Controllers;

use App\Models\KnowledgeItem;
use Illuminate\Http\Request;

class KnowledgeItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (auth()->user()->role === 'admin') {
            return KnowledgeItem::all();
        } else {
            // Regular users can only see their tenant's knowledge items
            return KnowledgeItem::where('tenant_id', auth()->user()->tenant_id)
                ->orWhereNull('tenant_id')
                ->get();
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'type' => 'required|in:document,faq,article',
            'tags' => 'required|array',
            'tenant_id' => 'nullable|exists:tenants,id',
        ]);

        // If not admin, force the tenant_id to be the user's tenant
        if (auth()->user()->role !== 'admin' && isset($validated['tenant_id'])) {
            $validated['tenant_id'] = auth()->user()->tenant_id;
        }

        $knowledgeItem = KnowledgeItem::create($validated);

        return response()->json($knowledgeItem, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(KnowledgeItem $knowledgeItem)
    {
        // Check if user has access to this knowledge item
        if (auth()->user()->role !== 'admin' && 
            $knowledgeItem->tenant_id !== auth()->user()->tenant_id && 
            $knowledgeItem->tenant_id !== null) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return $knowledgeItem;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, KnowledgeItem $knowledgeItem)
    {
        // Check if user has access to update this knowledge item
        if (auth()->user()->role !== 'admin' && 
            $knowledgeItem->tenant_id !== auth()->user()->tenant_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'content' => 'sometimes|string',
            'type' => 'sometimes|in:document,faq,article',
            'tags' => 'sometimes|array',
            'tenant_id' => 'nullable|exists:tenants,id',
        ]);

        // If not admin, force the tenant_id to be the user's tenant
        if (auth()->user()->role !== 'admin' && isset($validated['tenant_id'])) {
            $validated['tenant_id'] = auth()->user()->tenant_id;
        }

        $knowledgeItem->update($validated);

        return $knowledgeItem;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(KnowledgeItem $knowledgeItem)
    {
        // Check if user has access to delete this knowledge item
        if (auth()->user()->role !== 'admin' && 
            $knowledgeItem->tenant_id !== auth()->user()->tenant_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $knowledgeItem->delete();

        return response()->json(null, 204);
    }
}
