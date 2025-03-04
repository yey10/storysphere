<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\User;
use App\Models\Story;


class Rating extends Model
{
    use HasFactory;

    protected $table = 'ratings';
    protected $primaryKey = 'id_rating';

    protected $fillable = [
        'id_user', 'id_product', 'rating',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user', 'id_user');
    }

    public function story()
    {
        return $this->belongsTo(Story::class, 'id_story', 'id_story');
    }
}
