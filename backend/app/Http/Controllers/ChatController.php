
<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\ChatMessage;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (auth()->user()->role === 'admin') {
            return Chat::with('messages')->get();
        } else {
            // Regular users can only see their own chats
            return Chat::with('messages')
                ->where('user_id', auth()->user()->id)
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
            'tenant_id' => 'nullable|exists:tenants,id',
        ]);

        // Set the user_id to the authenticated user
        $validated['user_id'] = auth()->user()->id;

        // If not admin, force the tenant_id to be the user's tenant
        if (auth()->user()->role !== 'admin' && isset($validated['tenant_id'])) {
            $validated['tenant_id'] = auth()->user()->tenant_id;
        }

        $chat = Chat::create($validated);

        return response()->json($chat, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Chat $chat)
    {
        // Check if user has access to this chat
        if (auth()->user()->role !== 'admin' && $chat->user_id !== auth()->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return $chat->load('messages');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Chat $chat)
    {
        // Check if user has access to update this chat
        if (auth()->user()->role !== 'admin' && $chat->user_id !== auth()->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
        ]);

        $chat->update($validated);

        return $chat;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Chat $chat)
    {
        // Check if user has access to delete this chat
        if (auth()->user()->role !== 'admin' && $chat->user_id !== auth()->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $chat->delete();

        return response()->json(null, 204);
    }

    /**
     * Add a message to a chat
     */
    public function addMessage(Request $request, Chat $chat)
    {
        // Check if user has access to this chat
        if (auth()->user()->role !== 'admin' && $chat->user_id !== auth()->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'role' => 'required|in:user,assistant,system',
            'content' => 'required|string',
        ]);

        $message = new ChatMessage([
            'role' => $validated['role'],
            'content' => $validated['content'],
        ]);

        $chat->messages()->save($message);

        return response()->json($message, 201);
    }
}
