
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\TenantController;
use App\Http\Controllers\AiModelController;
use App\Http\Controllers\KnowledgeItemController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\AiConfigController;

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

// API documentation endpoints
Route::get('/api-docs', function() {
    // Return a list of all available API endpoints with their descriptions
    return response()->json([
        'status' => 'success',
        'message' => 'API Documentation',
        'data' => [
            'version' => '1.0',
            'base_url' => url('/api'),
            'endpoints' => [
                'auth' => [
                    'login' => ['POST', '/auth/login', 'Authenticate user and get token'],
                    'register' => ['POST', '/auth/register', 'Register a new user'],
                ],
                // Additional endpoint documentation
            ]
        ]
    ]);
});

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::get('/auth/user', [AuthController::class, 'getCurrentUser']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    
    // Users
    Route::apiResource('users', UserController::class);
    Route::post('/users/{user}/roles', [UserController::class, 'assignRoles']);
    Route::get('/users/{user}/permissions', [UserController::class, 'getPermissions']);
    
    // Roles
    Route::apiResource('roles', RoleController::class);
    Route::post('/roles/{role}/permissions', [RoleController::class, 'assignPermissions']);
    
    // Permissions
    Route::apiResource('permissions', PermissionController::class);
    
    // Tenants
    Route::apiResource('tenants', TenantController::class);
    
    // AI Models
    Route::apiResource('ai-models', AiModelController::class);
    Route::post('/ai-models/{aiModel}/test', [AiModelController::class, 'testModel']);
    
    // Knowledge Base
    Route::apiResource('knowledge-base', KnowledgeItemController::class);
    
    // Chats
    Route::apiResource('chats', ChatController::class);
    Route::post('/chats/{chat}/messages', [ChatController::class, 'addMessage']);
    
    // AI Configuration
    Route::prefix('ai-config')->group(function () {
        // Data Sources
        Route::get('/data-sources', [AiConfigController::class, 'getDataSources']);
        Route::get('/data-sources/{id}', [AiConfigController::class, 'getDataSource']);
        Route::post('/data-sources', [AiConfigController::class, 'createDataSource']);
        Route::put('/data-sources/{id}', [AiConfigController::class, 'updateDataSource']);
        Route::delete('/data-sources/{id}', [AiConfigController::class, 'deleteDataSource']);
        
        // Prompt Templates
        Route::get('/prompt-templates', [AiConfigController::class, 'getPromptTemplates']);
        Route::get('/prompt-templates/{id}', [AiConfigController::class, 'getPromptTemplate']);
        Route::post('/prompt-templates', [AiConfigController::class, 'createPromptTemplate']);
        Route::put('/prompt-templates/{id}', [AiConfigController::class, 'updatePromptTemplate']);
        Route::delete('/prompt-templates/{id}', [AiConfigController::class, 'deletePromptTemplate']);
        
        // Response Formatters
        Route::get('/response-formatters', [AiConfigController::class, 'getResponseFormatters']);
        Route::get('/response-formatters/{id}', [AiConfigController::class, 'getResponseFormatter']);
        Route::post('/response-formatters', [AiConfigController::class, 'createResponseFormatter']);
        Route::put('/response-formatters/{id}', [AiConfigController::class, 'updateResponseFormatter']);
        Route::delete('/response-formatters/{id}', [AiConfigController::class, 'deleteResponseFormatter']);
        
        // Branding
        Route::get('/branding', [AiConfigController::class, 'getBrandingSettings']);
        Route::put('/branding', [AiConfigController::class, 'updateBrandingSettings']);
        Route::post('/branding/logo', [AiConfigController::class, 'uploadLogo']);
        
        // Follow-up Questions
        Route::get('/follow-up-questions', [AiConfigController::class, 'getFollowUpQuestions']);
        Route::get('/follow-up-questions/{id}', [AiConfigController::class, 'getFollowUpQuestion']);
        Route::post('/follow-up-questions', [AiConfigController::class, 'createFollowUpQuestion']);
        Route::put('/follow-up-questions/{id}', [AiConfigController::class, 'updateFollowUpQuestion']);
        Route::delete('/follow-up-questions/{id}', [AiConfigController::class, 'deleteFollowUpQuestion']);
    });
});
