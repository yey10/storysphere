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
            $table->timestamp('updated_at')->useCurrent(); // Fecha de actualización
            $table->enum('subscription_type', ['basic', 'estandar', 'pro', 'premium']); // Tipo de suscripción
            //campos adicionales para mercado pago
            $table->string('mercado_pago_subscription_id')->nullable(); // Id de la suscripción en mercado pago
            $table->string('mercado_pago_plan_id')->nullable(); // Id del plan en mercado pago
            $table->enum('mercado_pago_status', ['active', 'paused', 'cancelled'])->nullable(); // Estado de la suscripción en mercado pago
            $table->timestamp('mercado_pago_created_at')->nullable(); // Fecha de creación de la suscripción en mercado pago
            $table->timestamp('mercado_pago_updated_at')->nullable(); // Fecha de actualización de la suscripción en mercado pago
            $table->timestamp('mercado_pago_response')->nullable(); // Respuesta completa de Mercado Pago (JSON)
            
            
            
            
            // Clave foránea para relacionar con la tabla users
            $table->foreign('id_user')->references('id_user')->on('users')->onDelete('cascade');
            // Índices para mejorar el rendimiento
            $table->index('id_user'); // Índice para la clave foránea id_user
            $table->index('mercado_pago_subscription_id'); // Índice para el campo mercado_pago_subscription_id
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
