<?php

namespace App\Services\Interactions;

use App\Models\Like;

class LikeService
{
    public function toggleInteraction($idUser, $idStory, $type)
    {
        // Verificar si ya existe el like
        $existingInteraction = Like::where('id_user', $idUser)
            ->where('id_story', $idStory)
            ->first();

        
            if ($existingInteraction) {
                if ($existingInteraction->interaction_type === $type) {
                    // Si el usuario ya tiene esta interacción, eliminarla
                    $existingInteraction->delete();
                    return ['status' => 'removed', 'message' => ucfirst($type) . ' removed'];
                }
    
                if ($existingInteraction->interaction_type === 'like' && $type === 'favorite' ||
                    $existingInteraction->interaction_type === 'favorite' && $type === 'like') {
                    // Si tiene una interacción y se agrega la otra, cambiar a "both"
                    $existingInteraction->update(['interaction_type' => 'both']);
                    return ['status' => 'updated', 'message' => 'Now both Like and Favorite'];
                }
    
                // Si ya tiene "both" y quiere cambiarlo a solo un tipo de interacción
                $existingInteraction->update(['interaction_type' => $type]);
                return ['status' => 'updated', 'message' => ucfirst($type) . ' updated'];
            }

        Like::create([
            'id_user' => $idUser,
            'id_story' => $idStory,
            'interaction_type' => $type
        ]);

        return ['status' => 'added', 'message' => ucfirst($type) . ' added'];

    }

    public function getStoryInteractions($idStory)
    {
        return Like::where('id_story', $idStory)->get();
    }
}



