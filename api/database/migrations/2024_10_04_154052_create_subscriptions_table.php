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
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->bigIncrements('id_subscription'); // Autoincrementable
            $table->unsignedBigInteger('id_user'); // Relación con el usuario
            $table->date('start_date'); // Fecha de inicio de la suscripción
            $table->date('end_date')->nullable(); // Fecha de finalización de la suscripción
            $table->timestamp('created_at')->useCurrent(); // Fecha de creación
            $table->string('subscription_type', 100); // Tipo de suscripción
            // Clave foránea para relacionar con la tabla users
            $table->foreign('id_user')->references('id_user')->on('users')->onDelete('cascade');
            // Índice para mejorar el rendimiento
            $table->index('id_user'); // Índice para la clave foránea id_user
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subscriptions');
    }
};
