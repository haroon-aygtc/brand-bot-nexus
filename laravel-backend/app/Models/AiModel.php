
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AiModel extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'provider',
        'model',
        'temperature',
        'max_tokens',
        'system_prompt',
        'enabled',
        'api_key',
        'usage_count',
        'usage_tokens',
        'settings',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'temperature' => 'float',
        'max_tokens' => 'integer',
        'enabled' => 'boolean',
        'usage_count' => 'integer',
        'usage_tokens' => 'integer',
        'settings' => 'json',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'api_key',
    ];
}
