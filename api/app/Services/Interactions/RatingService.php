<?php

namespace App\Services\Interactions;

use App\Models\Rating;

class RatingService
{

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