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
        Schema::create('role_user', function (Blueprint $table) {
            $table->unsignedBigInteger('id_user'); // Llave foránea para la tabla users
            $table->unsignedBigInteger('id_rol'); // Llave foránea para la tabla roles

            // Relacionar las llaves foráneas con las tablas users y roles
            $table->foreign('id_user')->references('id_user')->on('users')->onDelete('cascade');
            $table->foreign('id_rol')->references('id_rol')->on('roles')->onDelete('cascade');

            // Índice compuesto para evitar duplicados en la asignación de roles
            $table->primary(['id_user', 'id_rol']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('role_user');
    }
};
