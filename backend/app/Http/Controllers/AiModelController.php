
<?php

namespace App\Http\Controllers;

use App\Models\AiModel;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

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
            'provider' => 'required|in:openai,gemini,mistral,grok,huggingface,anthropic',
            'model' => 'required|string|max:255',
            'temperature' => 'required|numeric|between:0,2',
            'max_tokens' => 'required|integer|min:1',
            'system_prompt' => 'nullable|string',
            'enabled' => 'sometimes|boolean',
            'api_key' => 'nullable|string',
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
            'provider' => 'sometimes|in:openai,gemini,mistral,grok,huggingface,anthropic',
            'model' => 'sometimes|string|max:255',
            'temperature' => 'sometimes|numeric|between:0,2',
            'max_tokens' => 'sometimes|integer|min:1',
            'system_prompt' => 'nullable|string',
            'enabled' => 'sometimes|boolean',
            'api_key' => 'nullable|string',
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

    /**
     * Test an AI model with a message.
     */
    public function testModel(Request $request, AiModel $aiModel)
    {
        $validated = $request->validate([
            'message' => 'required|string',
        ]);

        // In a real implementation, this would connect to the actual AI provider API
        // For now, we'll simulate a response based on the model provider
        $responseText = $this->simulateAiResponse($aiModel, $validated['message']);

        return response()->json([
            'response' => $responseText,
            'model' => $aiModel->name,
            'provider' => $aiModel->provider,
        ]);
    }

    /**
     * Simulate AI response based on model provider and user message.
     * In a real implementation, this would call the actual AI provider API.
     */
    private function simulateAiResponse(AiModel $aiModel, string $message)
    {
        // Add some randomness to make responses appear more natural
        $randomPhrase = [
            "Based on my training, ",
            "According to my knowledge, ",
            "I would say that ",
            "Let me think about this... ",
            "Here's what I know: ",
        ][rand(0, 4)];

        $responses = [
            'openai' => "This is a simulated response from OpenAI's {$aiModel->model}. {$randomPhrase}The message was: \"{$message}\"",
            'gemini' => "Gemini {$aiModel->model} responding. {$randomPhrase}In response to: \"{$message}\"",
            'mistral' => "Mistral {$aiModel->model} here. {$randomPhrase}Regarding your message: \"{$message}\"",
            'grok' => "Grok {$aiModel->model} thinking... {$randomPhrase}About your question: \"{$message}\"",
            'huggingface' => "HuggingFace {$aiModel->model} analysis: {$randomPhrase}On the topic of: \"{$message}\"",
            'anthropic' => "Anthropic {$aiModel->model} considering. {$randomPhrase}Concerning your input: \"{$message}\"",
        ];

        return $responses[$aiModel->provider] ?? "No response available for this provider.";
    }
}
