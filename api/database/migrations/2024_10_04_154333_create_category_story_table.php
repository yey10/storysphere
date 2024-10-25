<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('category_story', function (Blueprint $table) {
        // Claves foráneas para categorías e historias
        $table->unsignedBigInteger('id_category');
        $table->unsignedBigInteger('id_story');
        // Relacionar las claves foráneas con las tablas categories y stories
        $table->foreign('id_category')->references('id_category')->on('categories')->onDelete('cascade');
        $table->foreign('id_story')->references('id_story')->on('stories')->onDelete('cascade');
        // Índice compuesto para evitar duplicados
        $table->primary(['id_category', 'id_story']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('category_story');
    }
};
