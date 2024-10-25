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
        Schema::create('statistic_stories', function (Blueprint $table) {
            $table->bigIncrements('id_statistics_history'); // Autoincrementable
            $table->unsignedBigInteger('id_story'); // Relación con la tabla stories

            $table->integer('total_views')->default(0); // Total de vistas
            $table->integer('total_likes')->default(0); // Total de likes
            $table->integer('total_comments')->default(0); // Total de comentarios

            // Relación con la tabla stories
            $table->foreign('id_story')->references('id_story')->on('stories')->onDelete('cascade');

            // Índice para mejorar el rendimiento
            $table->index('id_story'); // Índice para la clave foránea id_story
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('statistic_stories');
    }
};
