<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Services\Payment\SubscriptionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Exception;


class SubscriptionController extends Controller
{
    protected $subscriptionService;

    public function __construct(SubscriptionService $subscriptionService)
    {
        $this->subscriptionService = $subscriptionService;
    }

    /**
     * Crear una suscripción.
     */
    public function createSubscription(Request $request)
    {
        try {
            $request->validate([
                'subscription_type' => 'required|string|max:50',
                'duration_in_months' => 'nullable|integer|min:1|max:12',
            ]);

            $userId = Auth::id();
            $duration = $request->input('duration_in_months', 1);

            $subscription = $this->subscriptionService->createSubscription(
                $userId,
                $request->subscription_type,
                $duration
            );

            return response()->json(['message' => 'Suscripción creada exitosamente', 'subscription' => $subscription], 201);
        } catch (ValidationException $e) {
            return response()->json(['error' => 'Datos no válidos', 'details' => $e->errors()], 422);
        } catch (Exception $e) {
            return response()->json(['error' => 'No se pudo crear la suscripción', 'details' => $e->getMessage()], 500);
        }
        

        

        
        
    }
   

    /**
     * Obtener las suscripciones de un usuario.
     */

     public function getUserSubscriptions()
     {
        try {
            $userId = Auth::id();
            $subscriptions = $this->subscriptionService->getUserSubscriptions($userId);

            return response()->json($subscriptions);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error al obtener las suscripciones', 'error' => $e->getMessage()], 500);
        }
     }
   
   
}