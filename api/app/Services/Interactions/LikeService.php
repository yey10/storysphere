<?php

namespace App\Services\Interactions;

use App\Models\Like;

class LikeService
{
    public function toggleInteraction($idUser, $idStory, $type)
    {
        $interaction = Like::firstOrNew([
            'id_user' => $idUser,
            'id_story' => $idStory
        ]);

        if ($interaction->exists) {
            // Si ya tiene la misma interacción => eliminarla
            if ($interaction->interaction_type === $type) {
                $interaction->delete();
                return ['status' => 'removed', 'message' => "$type removed"];
            }

            // Si tiene like y quiere favorite, o viceversa => both
            if (
                in_array($interaction->interaction_type, ['like', 'favorite']) &&
                $interaction->interaction_type !== $type
            ) {
                $interaction->interaction_type = 'both';
                $interaction->save();
                return ['status' => 'updated', 'message' => 'Now both like and favorite'];
            }

            // Si tiene both y quiere cambiarlo a solo uno
            $interaction->interaction_type = $type;
            $interaction->save();
            return ['status' => 'updated', 'message' => "$type updated"];
        }

        // Si no existía, creamos una nueva
        $interaction->interaction_type = $type;
        $interaction->save();

        return ['status' => 'added', 'message' => "$type added"];
    }

    public function getStoryInteractions($idStory)
    {
        return Like::select('id_user', 'interaction_type')
            ->where('id_story', $idStory)
            ->get();
    }
}
