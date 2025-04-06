<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use App\Models\Comment;
use App\Models\Story;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CommentTest extends TestCase
{
    use RefreshDatabase;

    public function test_comment_belongs_to_user_and_story()
    {
        $user = User::factory()->create();
        $story = Story::factory()->create();
        $comment = Comment::factory()->create([
            'id_user' => $user->id_user,
            'id_story' => $story->id_story,
        ]);

        $this->assertInstanceOf(User::class, $comment->user);
        $this->assertInstanceOf(Story::class, $comment->story);
    }

    public function test_comment_content_is_stored_correctly()
    {
        $comment = Comment::factory()->create([
            'content_comment' => 'Comentario de prueba',
        ]);

        $this->assertEquals('Comentario de prueba', $comment->content_comment);
    }
}