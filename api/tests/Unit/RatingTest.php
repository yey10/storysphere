<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use App\Models\Story;
use App\Models\Rating;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RatingTest extends TestCase
{
    use RefreshDatabase;

    public function test_rating_belongs_to_user_and_story()
    {
        $user = User::factory()->create();
        $story = Story::factory()->create();
        $rating = Rating::factory()->create([
            'id_user' => $user->id_user,
            'id_story' => $story->id_story,
        ]);

        $this->assertInstanceOf(User::class, $rating->user);
        $this->assertInstanceOf(Story::class, $rating->story);
    }

    public function test_rating_value_is_valid()
    {
        $rating = Rating::factory()->create(['rating' => 4]);
        $this->assertGreaterThanOrEqual(1, $rating->rating);
        $this->assertLessThanOrEqual(5, $rating->rating);
    }
}