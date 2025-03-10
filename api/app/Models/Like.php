<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\User;
use App\Models\Story;


class Like extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'likes';
    protected $primaryKey = 'id_like';

    protected $fillable = [
        'id_user',
        'id_story'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }
    public function story()
    {
        return $this->belongsTo(Story::class, 'id_story');
    }
}

