<?php

namespace App\Services\Interactions;

use App\Models\Rating;
use Illuminate\Support\Facades\Auth;

class RatingService
{


    public function getUserRating($storyId)
    {
        $userId = Auth::id();
        $rating = Rating::where('id_user', $userId)
                        ->where('id_story', $storyId)
                        ->first();    
        return $rating ? $rating->rating : null;
    }



    public function addOrUpdateRating($userId, $storyId, $ratingValue)
    {
        return Rating::updateOrCreate(
            ['id_user' => $userId, 'id_story' => $storyId],
            ['rating' => $ratingValue]
        );
    }

    public function getAverageRating($storyId)
    {
        return round(Rating::where('id_story', $storyId)->avg('rating'), 2);
    }

    public function deleteRating($userId, $storyId)
    {
        return Rating::where('id_user', $userId)->where('id_story', $storyId)->delete();
    }






}