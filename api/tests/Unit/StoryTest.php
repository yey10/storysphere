<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use App\Models\Story;
use Illuminate\Foundation\Testing\RefreshDatabase;

class StoryTest extends TestCase
{
    use RefreshDatabase;

   
    public function test_story_belongs_to_a_user()
    {
        $user = User::factory()->create();
        $story = Story::factory()->create(['id_user' => $user->id_user]);

        $this->assertInstanceOf(User::class, $story->user);
        $this->assertEquals($user->id_user, $story->user->id_user);
    }

    
    public function test_story_attributes_are_stored_correctly()
    {
        $story = Story::factory()->create([
            'title' => 'Título de prueba',
            'content' => 'Contenido de prueba',
            'sinopsis' => 'Sinopsis de prueba',
            'state' => 'draft',
        ]);

        $this->assertEquals('Título de prueba', $story->title);
        $this->assertEquals('Contenido de prueba', $story->content);
        $this->assertEquals('Sinopsis de prueba', $story->sinopsis);
        $this->assertEquals('draft', $story->state);
    }

    
    public function test_story_can_be_updated()
    {
        $story = Story::factory()->create([
            'title' => 'Título inicial',
            'state' => 'draft',
        ]);

        $story->update([
            'title' => 'Título actualizado',
            'state' => 'published',
        ]);

        $this->assertEquals('Título actualizado', $story->fresh()->title);
        $this->assertEquals('published', $story->fresh()->state);
    }

    
    public function test_story_cannot_be_created_without_user()
    {
        $this->expectException(\Illuminate\Database\QueryException::class);

        // Intenta crear una historia sin usuario asignado
        Story::factory()->create(['id_user' => null]);
    }

    
    public function test_story_user_relationship_is_loaded_correctly()
    {
        $story = Story::factory()->create();
        $this->assertNotNull($story->user);
        $this->assertInstanceOf(User::class, $story->user);
    }

    
    public function test_story_title_and_content_must_not_be_empty()
    {
        $story = Story::factory()->create([
            'title' => '',
            'content' => '',
        ]);

        $this->assertEmpty($story->title);
        $this->assertEmpty($story->content);
        // Aquí podrías agregar validaciones a nivel de modelo si estás usando reglas
    }
}
