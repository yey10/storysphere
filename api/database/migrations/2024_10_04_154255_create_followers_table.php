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
        Schema::create('followers', function (Blueprint $table) {
            // Campos de la tabla followers
            $table->bigIncrements('id_tracking'); // Identificador autoincrementable
            $table->unsignedBigInteger('id_follower'); // Usuario que sigue
            $table->unsignedBigInteger('id_followed'); // Usuario seguido
            $table->timestamp('follow_up_date')->useCurrent(); // Fecha de seguimiento

            // Relación con la tabla de usuarios
            $table->foreign('id_follower')->references('id_user')->on('users')->onDelete('cascade');
            $table->foreign('id_followed')->references('id_user')->on('users')->onDelete('cascade');

            // Evitar duplicados (un usuario no puede seguir a otro más de una vez)
            $table->unique(['id_follower', 'id_followed']);
            // Índices para mejorar el rendimiento
            $table->index('id_follower'); // Índice para la clave foránea id_follower
            $table->index('id_followed'); // Índice para la clave foránea id_followed
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('followers');
    }
};
