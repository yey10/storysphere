<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;


return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::table('categories')->insert([
            ['category_name' => 'Romance'],
            ['category_name' => 'Terror'],
            ['category_name' => 'Acción'],
            ['category_name' => 'Ficción'],
            ['category_name' => 'Fantasía'],
            ['category_name' => 'Comedia'],
            ['category_name' => 'Aventura'],
            ['category_name' => 'Misterio'],
            ['category_name' => 'Drama']
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
       DB::table('categories')->whereIn('category_name', ['Acción', 'Aventura', 'Ciencia Ficción', 'Comedia', 'Documental', 'Drama', 'Fantasía', 'Infantil', 'Musical', 'Romance', 'Suspenso', 'Terror'])->delete();
    }
};
