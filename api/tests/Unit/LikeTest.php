<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use App\Models\Like;
use App\Models\Story;
use Illuminate\Foundation\Testing\RefreshDatabase;

class LikeTest extends TestCase
{
    use RefreshDatabase;

    public function test_like_belongs_to_user_and_story()
    {
        $user = User::factory()->create();
        $story = Story::factory()->create();
        $like = Like::factory()->create([
            'id_user' => $user->id_user,
            'id_story' => $story->id_story,
        ]);

        $this->assertInstanceOf(User::class, $like->user);
        $this->assertInstanceOf(Story::class, $like->story);
    }
}