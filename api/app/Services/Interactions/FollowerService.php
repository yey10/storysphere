<?php

namespace App\Services\Interactions;

use App\Models\Follower;

class FollowerService
{
    public function followUser($followerId, $followedId)
    {
        return Follower::create([
            'id_follower' => $followerId,
            'id_followed' => $followedId,
        ]);
    }

    public function unFollowUser($followerId, $followedId)
    {
        return Follower::where('id_follower', $followerId)
        ->where('id_followed', $followedId)
        ->delete();
    }

    public function getFollowers($userId)
    {
        return Follower::where('id_followed', $userId)->count();
    }

    public function getFollowing($userId)
    {
        return Follower::where('id_follower', $userId)->count();
    }
}