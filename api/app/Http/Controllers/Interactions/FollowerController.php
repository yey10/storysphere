<?php

namespace App\Http\Controllers\Interactions;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Interactions\FollowerService;

class FollowerController extends Controller
{
    protected $followerService;

    public function __construct(FollowerService $followerService)
    {
        $this->followerService = $followerService;
    }

    public function followUser(Request $request, $followedId)
    {
        $followerId = $request->user()->id_user;
        $this->followerService->followUser($followerId, $followedId);
        return response()->json(['message' => 'User followed successfully'], 200);
    }

    public function unFollowUser(Request $request, $followedId)
    {
        $followerId = $request->user()->id_user;
        $this->followerService->unFollowUser($followerId, $followedId);
        return response()->json(['message' => 'User unfollowed successfully'], 200);
    }

    public function getFollowers($userId)
    {
        $count = $this->followerService->getFollowers($userId);
        return response()->json(['followers' => $count], 200);
    }

    public function getFollowing($userId)
    {
        $count = $this->followerService->getFollowing($userId);
        return response()->json(['following' => $count], 200);
    }
}