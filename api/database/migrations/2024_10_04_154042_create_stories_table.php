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
        Schema::create('stories', function (Blueprint $table) {
            $table->bigIncrements('id_story'); // Autoincrementable
            $table->string('title'); // Título de la historia
            $table->text('content'); // Contenido de la historia
            $table->timestamps(); // Añade los campos created_at y updated_at automáticamente

            $table->string('state', 50)->default('draft'); // Estado de la historia (borrador, publicado, etc.)

            // Clave foránea para la relación con users
            $table->unsignedBigInteger('id_user'); // Relación con la tabla de usuarios
            $table->foreign('id_user')->references('id_user')->on('users')->onDelete('cascade');


            // Índices para mejorar el rendimiento
            $table->index('id_user'); // Índice para la clave foránea id_user
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stories');
    }
};
