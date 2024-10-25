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
        Schema::create('likes', function (Blueprint $table) {
            // Campos de la tabla likes
            $table->bigIncrements('id_like'); // Identificador autoincrementable
            $table->unsignedBigInteger('id_user'); // Relación con la tabla de usuarios
            $table->unsignedBigInteger('id_story'); // Relación con la tabla de historias
            $table->timestamp('created_at')->useCurrent(); // Fecha de creación
            // Claves foráneas
            $table->foreign('id_user')->references('id_user')->on('users')->onDelete('cascade');
            $table->foreign('id_story')->references('id_story')->on('stories')->onDelete('cascade');
            // Evitar que un usuario dé más de un like a la misma historia
            $table->unique(['id_user', 'id_story']);
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
        Schema::dropIfExists('likes');
    }
};
