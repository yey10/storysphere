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
            $table->string('payment_method', 100); // Método de pago (tarjeta, PayPal, etc.)
            $table->string('payment_status', 100); // Estado del pago (pendiente, completado, etc.)
            $table->text('invoice_detail'); // Detalle de la factura

            $table->timestamps(); // created_at y updated_at

            // Claves foráneas
            $table->foreign('id_user')->references('id_user')->on('users')->onDelete('cascade');
            $table->foreign('id_subscription')->references('id_subscription')->on('subscriptions')->onDelete('cascade');
            // Índices para mejorar el rendimiento
            $table->index('id_user'); // Índice para la clave foránea id_user
            $table->index('id_subscription'); // Índice para la clave foránea id_subscription
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
