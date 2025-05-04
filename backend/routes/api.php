
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TenantController;
use App\Http\Controllers\AiModelController;
use App\Http\Controllers\KnowledgeItemController;
use App\Http\Controllers\ChatController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/register', [AuthController::class, 'register']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::get('/auth/user', [AuthController::class, 'getCurrentUser']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    
    // Users
    Route::apiResource('users', UserController::class);
    
    // Tenants
    Route::apiResource('tenants', TenantController::class);
    
    // AI Models
    Route::apiResource('ai-models', AiModelController::class);
    
    // Knowledge Base
    Route::apiResource('knowledge-base', KnowledgeItemController::class);
    
    // Chats
    Route::apiResource('chats', ChatController::class);
    Route::post('/chats/{chat}/messages', [ChatController::class, 'addMessage']);
});
