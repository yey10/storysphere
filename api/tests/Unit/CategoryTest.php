<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Category;
use App\Models\Story;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CategoryTest extends TestCase
{
    use RefreshDatabase;

    public function test_category_can_have_many_stories()
    {
        $category = Category::factory()->create();
        $stories = Story::factory()->count(2)->create();

        $category->stories()->attach($stories->pluck('id_story'));

        $this->assertCount(2, $category->stories);
    }

    public function test_category_name_is_stored_correctly()
    {
        $category = Category::factory()->create(['category_name' => 'Fantasía']);
        $this->assertEquals('Fantasía', $category->category_name);
    }
}