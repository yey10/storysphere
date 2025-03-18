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

    public function toggleInteraction(Request $request, $idStory)
    {
        $idUser = $request->user()->id_user;
        $type = $request->input('interaction_type');

        if (!in_array($type, ['like', 'favorite'])) {
            return response()->json(['message' => 'Invalid interaction type'], 400);
        }

        $result = $this->likeService->toggleInteraction($idUser, $idStory, $type);

        return response()->json(['message' => $result['message']], 200);
    }

    public function getStoryInteractions($idStory)
    {
        $interactions  = $this->likeService->getStoryInteractions($idStory);
        return response()->json(['interactions' => $interactions ], 200);
    }
}