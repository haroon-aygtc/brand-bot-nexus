
<?php

namespace App\Services;

use App\Models\ResponseFormatter;
use Illuminate\Support\Facades\Auth;

class ResponseFormatterService
{
    public function getAllResponseFormatters()
    {
        return ResponseFormatter::where('tenant_id', Auth::user()->tenant_id)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function getResponseFormatterById($id)
    {
        return ResponseFormatter::where('tenant_id', Auth::user()->tenant_id)
            ->findOrFail($id);
    }

    public function createResponseFormatter(array $data)
    {
        $data['tenant_id'] = Auth::user()->tenant_id;
        
        // If this is set as default, unset other defaults
        if (isset($data['is_default']) && $data['is_default']) {
            ResponseFormatter::where('tenant_id', Auth::user()->tenant_id)
                ->where('type', $data['type'])
                ->update(['is_default' => false]);
        }
        
        return ResponseFormatter::create($data);
    }

    public function updateResponseFormatter($id, array $data)
    {
        $formatter = $this->getResponseFormatterById($id);
        
        // If this is set as default, unset other defaults
        if (isset($data['is_default']) && $data['is_default']) {
            ResponseFormatter::where('tenant_id', Auth::user()->tenant_id)
                ->where('type', $data['type'] ?? $formatter->type)
                ->where('id', '!=', $id)
                ->update(['is_default' => false]);
        }
        
        $formatter->update($data);
        return $formatter;
    }

    public function deleteResponseFormatter($id)
    {
        $formatter = $this->getResponseFormatterById($id);
        return $formatter->delete();
    }
}
