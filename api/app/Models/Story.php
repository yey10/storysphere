<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Story extends Model
{
    /** @use HasFactory<\Database\Factories\StoryFactory> */
    use HasFactory;

    protected  $primaryKey = 'id_story';

    protected $fillable = [
        'title',
        'content',
        'state',
        'id_user',
    ];

    public function user()
    {
        return $this->belongsTo(User::class,  'id_user');
    }

    public function categories()
    {
        return  $this->belongsToMany(Category::class, 'category_story', 'id_story', 'id_category');
    }
/*
    public function statistics()
    {
        return $this->hasOne(StatisticStory::class, 'id_story');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'id_story');
    }

    public function  likes()
    {
        return  $this->hasMany(Like::class, 'id_story');
    }
*/
}
