<?php

namespace App\Services\Interactions;

use App\Models\Like;

class LikeService
{
    public function toggleLike($idUser, $idStory)
    {
        // Verificar si ya existe el like
        $existingLike = Like::where('id_user', $idUser)
            ->where('id_story', $idStory)
            ->first();

        if ($existingLike) {
            $existingLike->delete(); // Si existe, eliminar (quitar like)
            return ['liked' => false, 'message' => 'Like removed'];
        }

        Like::create([
            'id_user' => $idUser,
            'id_story' => $idStory,
        ]);

        return ['liked' => true, 'message' => 'Like added'];
    }

    public function getStoryLikes($idStory)
    {
        return Like::where('id_story', $idStory)->count();
    }
}



