
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tenant extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'domain',
        'branding',
        'settings',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'branding' => 'array',
        'settings' => 'array',
    ];

    /**
     * Get the users for the tenant.
     */
    public function users()
    {
        return $this->hasMany(User::class);
    }

    /**
     * Get the knowledge items for the tenant.
     */
    public function knowledgeItems()
    {
        return $this->hasMany(KnowledgeItem::class);
    }

    /**
     * Get the chats for the tenant.
     */
    public function chats()
    {
        return $this->hasMany(Chat::class);
    }
}
