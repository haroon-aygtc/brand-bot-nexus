
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResponseFormatter extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'type',
        'format_template',
        'is_default',
        'tenant_id',
    ];

    protected $casts = [
        'is_default' => 'boolean',
    ];

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

    public function aiModels()
    {
        return $this->belongsToMany(AiModel::class, 'ai_model_response_formatter');
    }
}
