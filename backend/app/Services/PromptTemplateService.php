
<?php

namespace App\Services;

use App\Models\PromptTemplate;
use Illuminate\Support\Facades\Auth;

class PromptTemplateService
{
    public function getAllPromptTemplates()
    {
        return PromptTemplate::where('tenant_id', Auth::user()->tenant_id)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function getPromptTemplateById($id)
    {
        return PromptTemplate::where('tenant_id', Auth::user()->tenant_id)
            ->findOrFail($id);
    }

    public function createPromptTemplate(array $data)
    {
        $data['tenant_id'] = Auth::user()->tenant_id;
        
        // If this is set as default, unset other defaults
        if (isset($data['is_default']) && $data['is_default']) {
            PromptTemplate::where('tenant_id', Auth::user()->tenant_id)
                ->where('category', $data['category'])
                ->update(['is_default' => false]);
        }
        
        return PromptTemplate::create($data);
    }

    public function updatePromptTemplate($id, array $data)
    {
        $template = $this->getPromptTemplateById($id);
        
        // If this is set as default, unset other defaults
        if (isset($data['is_default']) && $data['is_default']) {
            PromptTemplate::where('tenant_id', Auth::user()->tenant_id)
                ->where('category', $data['category'] ?? $template->category)
                ->where('id', '!=', $id)
                ->update(['is_default' => false]);
        }
        
        $template->update($data);
        return $template;
    }

    public function deletePromptTemplate($id)
    {
        $template = $this->getPromptTemplateById($id);
        return $template->delete();
    }
}
