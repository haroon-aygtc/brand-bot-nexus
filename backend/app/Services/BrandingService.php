
<?php

namespace App\Services;

use App\Models\BrandingSetting;
use Illuminate\Support\Facades\Auth;

class BrandingService
{
    public function getBrandingSettings()
    {
        $tenantId = Auth::user()->tenant_id;
        
        $branding = BrandingSetting::where('tenant_id', $tenantId)->first();
        
        if (!$branding) {
            // Create default branding settings if none exist
            $branding = BrandingSetting::create([
                'tenant_id' => $tenantId,
                'assistant_name' => 'AI Assistant',
                'primary_color' => '#6366f1',
                'secondary_color' => '#8b5cf6',
                'enable_branding' => true,
                'logo_url' => null,
                'use_animated_avatar' => false,
                'custom_css' => null,
            ]);
        }
        
        return $branding;
    }

    public function updateBrandingSettings(array $data)
    {
        $tenantId = Auth::user()->tenant_id;
        
        $branding = BrandingSetting::where('tenant_id', $tenantId)->first();
        
        if (!$branding) {
            $data['tenant_id'] = $tenantId;
            return BrandingSetting::create($data);
        }
        
        $branding->update($data);
        return $branding;
    }

    public function updateLogoUrl($url)
    {
        $branding = $this->getBrandingSettings();
        $branding->update(['logo_url' => $url]);
        return $branding;
    }
}
