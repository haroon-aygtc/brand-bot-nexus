
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BrandingSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'tenant_id',
        'assistant_name',
        'primary_color',
        'secondary_color',
        'enable_branding',
        'logo_url',
        'use_animated_avatar',
        'custom_css',
    ];

    protected $casts = [
        'enable_branding' => 'boolean',
        'use_animated_avatar' => 'boolean',
    ];

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }
}
