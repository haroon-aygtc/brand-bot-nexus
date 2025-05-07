
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DataSource;
use App\Models\PromptTemplate;
use App\Models\ResponseFormatter;
use App\Models\BrandingSetting;
use App\Models\FollowUpQuestion;
use App\Services\DataSourceService;
use App\Services\PromptTemplateService;
use App\Services\ResponseFormatterService;
use App\Services\BrandingService;
use App\Services\FollowUpQuestionService;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class AiConfigController extends Controller
{
    protected $dataSourceService;
    protected $promptTemplateService;
    protected $responseFormatterService;
    protected $brandingService;
    protected $followUpQuestionService;

    public function __construct(
        DataSourceService $dataSourceService,
        PromptTemplateService $promptTemplateService,
        ResponseFormatterService $responseFormatterService,
        BrandingService $brandingService,
        FollowUpQuestionService $followUpQuestionService
    ) {
        $this->dataSourceService = $dataSourceService;
        $this->promptTemplateService = $promptTemplateService;
        $this->responseFormatterService = $responseFormatterService;
        $this->brandingService = $brandingService;
        $this->followUpQuestionService = $followUpQuestionService;
    }

    // Data Sources methods
    public function getDataSources()
    {
        return response()->json($this->dataSourceService->getAllDataSources());
    }

    public function getDataSource($id)
    {
        return response()->json($this->dataSourceService->getDataSourceById($id));
    }

    public function createDataSource(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'type' => 'required|string|in:knowledge_base,database,project_files,context',
            'is_active' => 'boolean',
            'config' => 'required|array',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $dataSource = $this->dataSourceService->createDataSource($request->all());
        return response()->json($dataSource, 201);
    }

    public function updateDataSource(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'string|max:255',
            'type' => 'string|in:knowledge_base,database,project_files,context',
            'is_active' => 'boolean',
            'config' => 'array',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $dataSource = $this->dataSourceService->updateDataSource($id, $request->all());
        return response()->json($dataSource);
    }

    public function deleteDataSource($id)
    {
        $this->dataSourceService->deleteDataSource($id);
        return response()->json(null, 204);
    }

    // Prompt Templates methods
    public function getPromptTemplates()
    {
        return response()->json($this->promptTemplateService->getAllPromptTemplates());
    }

    public function getPromptTemplate($id)
    {
        return response()->json($this->promptTemplateService->getPromptTemplateById($id));
    }

    public function createPromptTemplate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'content' => 'required|string',
            'category' => 'required|string|max:50',
            'is_default' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $promptTemplate = $this->promptTemplateService->createPromptTemplate($request->all());
        return response()->json($promptTemplate, 201);
    }

    public function updatePromptTemplate(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'string|max:255',
            'description' => 'nullable|string',
            'content' => 'string',
            'category' => 'string|max:50',
            'is_default' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $promptTemplate = $this->promptTemplateService->updatePromptTemplate($id, $request->all());
        return response()->json($promptTemplate);
    }

    public function deletePromptTemplate($id)
    {
        $this->promptTemplateService->deletePromptTemplate($id);
        return response()->json(null, 204);
    }

    // Response Formatters methods
    public function getResponseFormatters()
    {
        return response()->json($this->responseFormatterService->getAllResponseFormatters());
    }

    public function getResponseFormatter($id)
    {
        return response()->json($this->responseFormatterService->getResponseFormatterById($id));
    }

    public function createResponseFormatter(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|string|in:markdown,html,custom',
            'format_template' => 'required|string',
            'is_default' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $responseFormatter = $this->responseFormatterService->createResponseFormatter($request->all());
        return response()->json($responseFormatter, 201);
    }

    public function updateResponseFormatter(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'string|max:255',
            'description' => 'nullable|string',
            'type' => 'string|in:markdown,html,custom',
            'format_template' => 'string',
            'is_default' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $responseFormatter = $this->responseFormatterService->updateResponseFormatter($id, $request->all());
        return response()->json($responseFormatter);
    }

    public function deleteResponseFormatter($id)
    {
        $this->responseFormatterService->deleteResponseFormatter($id);
        return response()->json(null, 204);
    }

    // Branding methods
    public function getBrandingSettings()
    {
        return response()->json($this->brandingService->getBrandingSettings());
    }

    public function updateBrandingSettings(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'assistant_name' => 'string|max:255',
            'primary_color' => 'string|max:50',
            'secondary_color' => 'string|max:50',
            'enable_branding' => 'boolean',
            'logo_url' => 'nullable|string',
            'use_animated_avatar' => 'boolean',
            'custom_css' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $branding = $this->brandingService->updateBrandingSettings($request->all());
        return response()->json($branding);
    }

    public function uploadLogo(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'logo' => 'required|image|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $path = $request->file('logo')->store('logos', 'public');
        $url = Storage::url($path);
        
        // Update logo URL in branding settings
        $this->brandingService->updateLogoUrl($url);
        
        return response()->json(['url' => $url]);
    }

    // Follow-up Questions methods
    public function getFollowUpQuestions()
    {
        return response()->json($this->followUpQuestionService->getAllFollowUpQuestions());
    }

    public function getFollowUpQuestion($id)
    {
        return response()->json($this->followUpQuestionService->getFollowUpQuestionById($id));
    }

    public function createFollowUpQuestion(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'text' => 'required|string',
            'type' => 'required|string|in:single,multiple,conditional',
            'options' => 'nullable|array',
            'parent_id' => 'nullable|exists:follow_up_questions,id',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $followUpQuestion = $this->followUpQuestionService->createFollowUpQuestion($request->all());
        return response()->json($followUpQuestion, 201);
    }

    public function updateFollowUpQuestion(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'text' => 'string',
            'type' => 'string|in:single,multiple,conditional',
            'options' => 'nullable|array',
            'parent_id' => 'nullable|exists:follow_up_questions,id',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $followUpQuestion = $this->followUpQuestionService->updateFollowUpQuestion($id, $request->all());
        return response()->json($followUpQuestion);
    }

    public function deleteFollowUpQuestion($id)
    {
        $this->followUpQuestionService->deleteFollowUpQuestion($id);
        return response()->json(null, 204);
    }
}
