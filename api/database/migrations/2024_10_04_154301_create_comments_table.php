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
        Schema::create('comments', function (Blueprint $table) {
            // Campos de la tabla comments
            $table->bigIncrements('id_comment'); // Identificador autoincrementable
            $table->text('content_comment'); // Contenido del comentario
            $table->timestamp('created_at')->useCurrent(); // Fecha de creación
            $table->unsignedBigInteger('id_user'); // Relación con la tabla de usuarios
            $table->unsignedBigInteger('id_story'); // Relación con la tabla de historias

            // Claves foráneas
            $table->foreign('id_user')->references('id_user')->on('users')->onDelete('cascade');
            $table->foreign('id_story')->references('id_story')->on('stories')->onDelete('cascade');

            // Índices para mejorar el rendimiento
            $table->index('id_user'); // Índice para la clave foránea id_user
            $table->index('id_story'); // Índice para la clave foránea id_story
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};
