<?php

namespace App\Services\Payment;

use App\Models\Subscription;
use App\Models\Invoice;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;


class SubscriptionService
{
    /**
     * Crear una suscripción.
     */
    public function createSubscriptionWithInvoice($userId, $subscriptionType, $price, $paymentMethod, $durationInMonths = 1)
    {
        return DB::transaction(function () use ($userId, $subscriptionType, $price, $paymentMethod, $durationInMonths) {
            $startDate = Carbon::now();
            $endDate = $startDate->copy()->addMonths($durationInMonths);

            $subscription = Subscription::create([
                'id_user' => $userId,
                'subscription_type' => $subscriptionType,
                'start_date' => $startDate,
                'end_date' => $endDate,
            ]);

            $invoice = Invoice::create([
                'id_user' => $userId,
                'id_subscription' => $subscription->id_subscription,
                'issue_date' => now(),
                'total_amount' => $price,
                'payment_method' => $paymentMethod,
                'payment_status' => 'pending',
                'invoice_detail' => "Pago por suscripción: " . ucfirst($subscriptionType)
            ]);

            return[
                'subscription' => $subscription,
                'invoice' => $invoice
            ];
        });
    }

    /**
     * Obtener las suscripciones de un usuario.
     */

    public function getUserSubscriptions($userId)
    {
         return Subscription::where('id_user', $userId)->get();
    }

}