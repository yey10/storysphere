<?php

namespace App\Services\Payment;

use App\Models\Subscription;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;


class SubscriptionService
{
    /**
     * Crear una suscripción.
     */
    public function createSubscription($userId, $subscriptionType, $durationInMonths = 1)
    {
        return DB::transaction(function () use ($userId, $subscriptionType, $durationInMonths) {
            $startDate = Carbon::now();
            $endDate = $startDate->copy()->addMonths($durationInMonths);

            return Subscription::create([
                'id_user' => $userId,
                'subscription_type' => $subscriptionType,
                'start_date' => $startDate,
                'end_date' => $endDate,
            ]);
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