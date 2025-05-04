
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatMessage extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'chat_id',
        'role',
        'content',
    ];

    /**
     * Get the chat that owns the message.
     */
    public function chat()
    {
        return $this->belongsTo(Chat::class);
    }
}
