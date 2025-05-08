
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'tenant_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * Get the tenant that the user belongs to.
     */
    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

    /**
     * Get the chats for the user.
     */
    public function chats()
    {
        return $this->hasMany(Chat::class);
    }

    /**
     * Get the roles for the user.
     */
    public function roles()
    {
        return $this->belongsToMany(Role::class, 'user_roles');
    }

    /**
     * Check if the user has a specific role.
     *
     * @param string|array $roles Role name or array of role names
     * @return bool
     */
    public function hasRole($roles)
    {
        if (is_string($roles)) {
            return $this->roles->contains('slug', $roles);
        }

        return (bool) $this->roles->whereIn('slug', $roles)->count();
    }

    /**
     * Check if the user has any permission from a specific list.
     *
     * @param string|array $permissions Permission slug or array of permission slugs
     * @return bool
     */
    public function hasPermission($permissions)
    {
        $userPermissions = $this->getPermissions();
        
        if (is_string($permissions)) {
            return $userPermissions->contains('slug', $permissions);
        }

        return (bool) $userPermissions->whereIn('slug', $permissions)->count();
    }

    /**
     * Get all permissions for the user based on their roles.
     *
     * @return \Illuminate\Support\Collection
     */
    public function getPermissions()
    {
        return $this->roles->flatMap(function ($role) {
            return $role->permissions;
        })->unique('id');
    }
}
