<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\User;

class Follower extends Model
{
    use HasFactory;

    protected $table = 'followers';
    protected $primaryKey = 'id_tracking';

    protected $fillable = [
        'id_follower',
        'id_followed',
    ];

    public function follower()
    {
        return $this->belongsTo(User::class, 'id_follower');
    }

    public function followed()
    {
        return $this->belongsTo(User::class, 'id_followed');
    }
}
