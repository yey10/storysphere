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

    public function likeStory(Request $request, $idStory)
    {
        $idUser = $request->user()->id_user;
        $this->likeService->likeStory($idUser, $idStory);

        return response()->json(['message' => 'Story liked successfully'], 200);
    }

    public function unlikeStory(Request $request, $idStory)
    {
        $idUser = $request->user()->id_user;
        $this->likeService->unlikeStory($idUser, $idStory);
        return response()->json(['message' => 'Story unliked successfully'], 200);
    }

    public function getStoryLikes($idStory)
    {
        $count = $this->likeService->getStoryLikes($idStory);
        return response()->json(['likes' => $count], 200);
    }
}