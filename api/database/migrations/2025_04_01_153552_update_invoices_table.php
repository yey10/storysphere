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
        Schema::table('invoices', function (Blueprint $table) {
            $table->dropColumn([
                'mercado_pago_payment_id',
                'mercado_pago_status',
                'mercado_pago_preference_id',
                'mercado_pago_created_at',
                'mercado_pago_updated_at',
                'mercado_pago_response'
            ]);
            $table->enum('payment_method', ['credit_card', 'debit_card', 'paypal', 'cash'])->default('paypal')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('invoices', function (Blueprint $table) {
            $table->string('mercado_pago_payment_id')->nullable();
            $table->string('mercado_pago_status')->nullable();
            $table->string('mercado_pago_preference_id')->nullable();
            $table->timestamp('mercado_pago_created_at')->nullable();
            $table->timestamp('mercado_pago_updated_at')->nullable();
            $table->text('mercado_pago_response')->nullable();

            // Volver a incluir "mercado_pago" en `payment_method`
            $table->enum('payment_method', ['credit_card', 'debit_card', 'paypal', 'cash', 'mercado_pago'])->default('mercado_pago')->change();
        });
    }
};
