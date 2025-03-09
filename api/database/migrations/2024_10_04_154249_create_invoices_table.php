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
        Schema::create('invoices', function (Blueprint $table) {
            // Campos de la tabla invoices
            $table->bigIncrements('id_invoice'); // Identificador autoincrementable
            $table->unsignedBigInteger('id_user'); // Relación con la tabla de usuarios
            $table->unsignedBigInteger('id_subscription'); // Relación con la tabla de suscripciones
            $table->date('issue_date'); // Fecha de emisión de la factura
            $table->decimal('total_amount', 8, 2); // Monto total de la factura
            $table->enum('payment_method', ['credit_card', 'debit_card', 'mercado_pago', 'paypal', 'cash'])->default('mercado_pago'); // Método de pago (tarjeta, PayPal, etc.)
            $table->enum('payment_status', ['pending', 'approved', 'rejected', 'cancelled', 'refunded'])->default('pending'); // Estado del pago (pendiente, completado, etc.)
            $table->text('invoice_detail'); // Detalle de la factura

            //campos adicionales para mercadopago
            $table->string('mercado_pago_payment_id')->nullable(); // Id del pago en mercado pago
            $table->string('mercado_pago_status')->nullable(); // Estado del pago en mercado pago
            $table->string('mercado_pago_preference_id')->nullable(); // Id de la preferencia en mercado pago
            $table->timestamp('mercado_pago_created_at')->nullable(); // Fecha de creación del pago en mercado pago
            $table->timestamp('mercado_pago_updated_at')->nullable(); // Fecha de actualización del pago en mercado pago
            $table->text('mercado_pago_response')->nullable(); // Respuesta completa de Mercado Pago (JSON)






            $table->timestamps(); // created_at y updated_at

            // Claves foráneas
            $table->foreign('id_user')->references('id_user')->on('users')->onDelete('cascade');
            $table->foreign('id_subscription')->references('id_subscription')->on('subscriptions')->onDelete('cascade');
            // Índices para mejorar el rendimiento
            $table->index('id_user'); // Índice para la clave foránea id_user
            $table->index('id_subscription'); // Índice para la clave foránea id_subscription
            $table->index('mercado_pago_payment_id'); // Índice para el campo mercado_pago_payment_id
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
