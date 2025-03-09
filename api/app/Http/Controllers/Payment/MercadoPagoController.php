<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\CreatePaymentRequest;
use App\Http\Requests\CreateSubscriptionPaymentRequest;
use App\Services\Payment\MercadoPagoService;
use Illuminate\Support\Facades\Log;
use Exception;

class MercadoPagoController extends Controller
{
    protected $mercadoPagoService;

    public function __construct(MercadoPagoService $mercadoPagoService)
    {
        $this->mercadoPagoService = $mercadoPagoService;
    }

    public function createPayment(CreatePaymentRequest $request)
    {
        try {
            $payment = $this->mercadoPagoService->createPreference($request->validated());
            return response()->json(['payment' => $payment], 201);
        } catch (Exception $e) {
            Log::error('Error al crear el pago: ' . $e->getMessage());
            return response()->json(['error' => 'No se pudo procesar el pago'], 500);
        }
    }

    public function createSubscriptionPayment(CreateSubscriptionPaymentRequest  $request)
    {
        try {

            $subscription = $this->mercadoPagoService->createSubscription(
                $request->validated()['plan_id'],
                $request->validated()['payer_email']
            );

            return response()->json(['subscription' => $subscription], 201);

    
        } catch (Exception $e) {
            Log::error('Error al crear la suscripción en MercadoPago: ' . $e->getMessage());
            return response()->json(['error' => 'No se pudo procesar la suscripción'], 500);
        }
    }
    
}