<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use App\Models\Story;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserTest extends TestCase
{
    use RefreshDatabase;

   
    public function test_user_can_have_many_stories()
    {
        $user = User::factory()->create();

        $stories = Story::factory()->count(2)->create([
            'id_user' => $user->id_user,
        ]);

        $this->assertCount(2, $user->stories);
        foreach ($stories as $story) {
            $this->assertTrue($user->stories->contains($story));
        }
    }

    
    public function test_user_can_create_story()
    {
        $user = User::factory()->create();

        $story = $user->stories()->create([
            'title' => 'Historia de Prueba',
            'content' => 'Este es el contenido de prueba',
            'sinopsis' => 'Esta es una sinopsis de prueba',
            'state' => 'published',
        ]);

        $this->assertDatabaseHas('stories', [
            'title' => 'Historia de Prueba',
            'id_user' => $user->id_user,
        ]);

        $this->assertEquals('published', $story->state);
        $this->assertEquals($user->id_user, $story->id_user);
    }

    
    public function test_user_can_update_own_story()
    {
        $user = User::factory()->create();

        $story = Story::factory()->create([
            'id_user' => $user->id_user,
            'title' => 'Título original',
        ]);

        $story->update([
            'title' => 'Nuevo Título',
        ]);

        $this->assertEquals('Nuevo Título', $story->fresh()->title);
    }

    
   /* public function user_cannot_update_story_of_another_user()
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();

        $story = Story::factory()->create([
            'id_user' => $user1->id_user,
            'title' => 'Título original',
        ]);

        // Simula intento de modificación de otro usuario
        $this->actingAs($user2);

        $story->update([
            'title' => 'Modificado por otro usuario',
        ]);

        // Se espera que no cambie el título (puedes modificar esto si aplicas lógica de permisos reales)
        $this->assertNotEquals('Modificado por otro usuario', $story->fresh()->title);
    }*/

   
    public function test_user_story_relationship_returns_correct_model()
    {
        $user = User::factory()->create();
        $story = Story::factory()->create(['id_user' => $user->id_user]);

        $this->assertInstanceOf(User::class, $story->user);
        $this->assertEquals($user->id_user, $story->user->id_user);
    }
}
