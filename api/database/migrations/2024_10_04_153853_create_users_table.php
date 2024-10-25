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
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id_user'); // Autoincrementable
            $table->string('name', 100); // Nombre del usuario
            $table->string('email', 150)->unique(); // Email único
            $table->text('password'); // Contraseña
            $table->timestamp('created_at')->nullable(); // Fecha de creación (nullable en caso de migraciones anteriores)
            $table->timestamp('updated_at')->nullable(); // Fecha de última actualización
            $table->text('biography')->nullable(); // Biografía del usuario
            $table->string('profile_photo', 150)->nullable(); // Foto de perfil
            $table->string('account_status', 100)->default('active'); // Estado de la cuenta con valor por defecto 'active'
            $table->boolean('active')->default(true); // Estado activo, booleano por defecto true
            $table->rememberToken()->nullable(); // Token para recordar la sesión
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
