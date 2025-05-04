
<?php

namespace App\Http\Controllers;

use App\Models\AiModel;
use Illuminate\Http\Request;

class AiModelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return AiModel::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Only admin users can create AI models
        if (auth()->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'provider' => 'required|in:openai,gemini,huggingface,anthropic',
            'model' => 'required|string|max:255',
            'temperature' => 'required|numeric|between:0,2',
            'max_tokens' => 'required|integer|min:1',
            'system_prompt' => 'nullable|string',
            'enabled' => 'sometimes|boolean',
        ]);

        $aiModel = AiModel::create($validated);

        return response()->json($aiModel, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(AiModel $aiModel)
    {
        return $aiModel;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AiModel $aiModel)
    {
        // Only admin users can update AI models
        if (auth()->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'provider' => 'sometimes|in:openai,gemini,huggingface,anthropic',
            'model' => 'sometimes|string|max:255',
            'temperature' => 'sometimes|numeric|between:0,2',
            'max_tokens' => 'sometimes|integer|min:1',
            'system_prompt' => 'nullable|string',
            'enabled' => 'sometimes|boolean',
        ]);

        $aiModel->update($validated);

        return $aiModel;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AiModel $aiModel)
    {
        // Only admin users can delete AI models
        if (auth()->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $aiModel->delete();

        return response()->json(null, 204);
    }
}
