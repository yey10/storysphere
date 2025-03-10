<?php

namespace App\Http\Controllers\Interactions;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Interactions\LikeService;

class LikeController extends Controller
{
    protected $likeService;

    public function __construct(LikeService $likeService)
    {
        $this->likeService = $likeService;
    }

    public function toggleLike(Request $request, $idStory)
    {
        $idUser = $request->user()->id_user;
        $result = $this->likeService->toggleLike($idUser, $idStory);

        return response()->json(['message' => $result['message']], 200);
    }

    public function getStoryLikes($idStory)
    {
        $count = $this->likeService->getStoryLikes($idStory);
        return response()->json(['likes' => $count], 200);
    }
}