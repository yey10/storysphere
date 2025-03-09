<?php

namespace App\Services\Payment;

use App\Models\Subscription;

class SubscriptionService
{
    /**
     * Crear una suscripción.
     */
    public function createSubscription($userId, $subscriptionType, $mercadoPagoSubscriptionId, $status)
    {
        return Subscription::create([
            'id_user' => $userId,
            'subscription_type' => $subscriptionType,
            'start_date' => now(),
            'end_date' => now()->addMonth(),
            'mercado_pago_subscription_id' => $mercadoPagoSubscriptionId,
            'mercado_pago_status' => $status,
        ]);
    }

    /**
     * Obtener las suscripciones de un usuario.
     */

    public function getUserSubscriptions($userId)
    {
         return Subscription::where('id_user', $userId)->get();
    }

     /**
      * Cancelar una suscripción.
      */
    public function cancelSubscription(Subscription $subscription)
    {
        $subscription->update([
            'end_date' => now(),
            'mercado_pago_status' => 'cancelled',
        ]);

        return $subscription;
    }






}