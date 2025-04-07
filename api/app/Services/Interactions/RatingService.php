<?php

namespace App\Services\Interactions;

use App\Models\Rating;

class RatingService
{
    public function getUserRating($userId, $storyId)
    {
        return Rating::where('id_user', $userId)
                     ->where('id_story', $storyId)
                     ->value('rating'); // Solo trae el valor directamente
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
        $avg = Rating::where('id_story', $storyId)->avg('rating');
        return $avg ? round($avg, 2) : null;
    }

    public function deleteRating($userId, $storyId)
    {
        return Rating::where('id_user', $userId)
                     ->where('id_story', $storyId)
                     ->delete();
    }
}
