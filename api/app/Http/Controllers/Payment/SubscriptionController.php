<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Services\Payment\MercadoPagoService;
use App\Services\Payment\SubscriptionService;
use App\Http\Requests\CreateSubscriptionRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Subscription;
use Exception;


class SubscriptionController extends Controller
{
    protected $mercadoPagoService;
    protected $subscriptionService;

    public function __construct(MercadoPagoService $mercadoPagoService, SubscriptionService $subscriptionService)
    {
        $this->mercadoPagoService = $mercadoPagoService;
        $this->subscriptionService = $subscriptionService;
    }

    /**
     * Crear una suscripción.
     */
    public function createSubscription(CreateSubscriptionRequest $request)
    {
        try {
            $validatedData = $request->validated();

            $plan = $this->mercadoPagoService->createPlan([
                'frequency' => 1,
                'frequency_type' => 'months',
                'amount' => 10000, // Valor de la suscripción
                'reason' => 'Suscripción premium',
            ]);

            $subscription = $this->mercadoPagoService->createSubscription($plan->id, $validatedData['email']);
            $this->subscriptionService->createSubscription(Auth::id(), $validatedData['subscription_type'], $subscription->id, $subscription->status);
            return response()->json(['message' => 'Suscripción creada con éxito', 'subscription' => $subscription], 201);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error al crear la suscripción', 'error' => $e->getMessage()], 500);
        }
        

        

        
        
    }
   

    /**
     * Obtener las suscripciones de un usuario.
     */

     public function getUserSubscriptions(Request $request)
     {
        try {
            $user = Auth::user();
            return response()->json($this->subscriptionService->getUserSubscriptions($user->id));
        } catch (Exception $e) {
            return response()->json(['message' => 'Error al obtener las suscripciones', 'error' => $e->getMessage()], 500);
        }
     }
   

    /**
     * Cancelar una suscripción.
     */
    public function cancelSubscription($subscriptionId)
    {
        try {
            $subscription = Subscription::findOrFail($subscriptionId);
            $this->subscriptionService->cancelSubscription($subscription);

            return response()->json(['message' => 'Suscripción cancelada correctamente']);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error al cancelar la suscripción', 'error' => $e->getMessage()], 500);
        }
        
        
    }
   
}