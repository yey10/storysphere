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
        Schema::table('subscriptions', function (Blueprint $table) {
            $table->dropColumn([
                'mercado_pago_subscription_id',
                'mercado_pago_plan_id',
                'mercado_pago_status',
                'mercado_pago_created_at',
                'mercado_pago_updated_at',
                'mercado_pago_response'
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('subscriptions', function (Blueprint $table) {
            $table->string('mercado_pago_subscription_id')->nullable();
            $table->string('mercado_pago_plan_id')->nullable();
            $table->enum('mercado_pago_status', ['active', 'paused', 'cancelled'])->nullable();
            $table->timestamp('mercado_pago_created_at')->nullable();
            $table->timestamp('mercado_pago_updated_at')->nullable();
            $table->timestamp('mercado_pago_response')->nullable();
        });
    }
};
