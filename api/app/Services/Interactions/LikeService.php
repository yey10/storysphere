<?php

namespace App\Services\Interactions;

use App\Models\Like;

class LikeService
{
    public function likeStory($idUser, $idStory)
    {
        return Like::create([
            'id_user' => $idUser,
            'id_story' => $idStory,
        ]);
    }

    public function unLikeStory($idUser, $idStory)
    {
        return Like::where('id_user', $idUser)
        ->where('id_story', $idStory)
        ->delete();
    }

    public function getStoryLikes($idStory)
    {
        return Like::where('id_story', $idStory)->count();
    }
}



