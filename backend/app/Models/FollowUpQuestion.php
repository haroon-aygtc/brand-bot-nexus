
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FollowUpQuestion extends Model
{
    use HasFactory;

    protected $fillable = [
        'text',
        'type',
        'options',
        'parent_id',
        'is_active',
        'tenant_id',
    ];

    protected $casts = [
        'options' => 'array',
        'is_active' => 'boolean',
    ];

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

    public function parent()
    {
        return $this->belongsTo(FollowUpQuestion::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(FollowUpQuestion::class, 'parent_id');
    }
}
