
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PromptTemplate extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'content',
        'category',
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
        return $this->belongsToMany(AiModel::class, 'ai_model_prompt_template');
    }
}
