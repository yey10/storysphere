<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use App\Models\User;
use App\Models\Comment;
use App\Models\Category;
use App\Models\Rating;

class Story extends Model
{
    /** @use HasFactory<\Database\Factories\StoryFactory> */
    use HasFactory;

    protected  $primaryKey = 'id_story';

    protected $fillable = [
        'title',
        'content',
        'sinopsis',
        'photo',
        'state',
        'id_user',
    ];
    
    protected $casts = [
        'content' => 'string',
    ];
    

    

    public function getPhotoAttribute($value)
    {
        
        if (Str::startsWith($value, ['http', 'https'])) {
            return $value;
        }

        
        return url(Storage::url($value));
    }

    public function user()
    {
        return $this->belongsTo(User::class,  'id_user');
    }

    public function ratings()
    {
        return $this->hasMany(Rating::class, 'id_story', 'id_story');
    }

    public function categories()
    {
        return  $this->belongsToMany(Category::class, 'category_story', 'id_story', 'id_category');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'id_story', 'id_story');
    }



/*
    public function statistics()
    {
        return $this->hasOne(StatisticStory::class, 'id_story');
    }

   

    public function  likes()
    {
        return  $this->hasMany(Like::class, 'id_story');
    }
*/
}
