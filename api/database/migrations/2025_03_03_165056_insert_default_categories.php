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
            ['category_name' => 'Acción'],
            ['category_name' => 'Aventura'],
            ['category_name' => 'Ciencia Ficción'],
            ['category_name' => 'Comedia'],
            ['category_name' => 'Documental'],
            ['category_name' => 'Drama'],
            ['category_name' => 'Fantasía'],
            ['category_name' => 'Infantil'],
            ['category_name' => 'Musical'],
            ['category_name' => 'Romance'],
            ['category_name' => 'Suspenso'],
            ['category_name' => 'Terror']
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
       DB::table('roles')->whereIn('category_name', ['Acción', 'Aventura', 'Ciencia Ficción', 'Comedia', 'Documental', 'Drama', 'Fantasía', 'Infantil', 'Musical', 'Romance', 'Suspenso', 'Terror'])->delete();
    }
};
