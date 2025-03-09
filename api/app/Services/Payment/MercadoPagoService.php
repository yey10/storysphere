<?php

namespace App\Services\Payment;

use MercadoPago\Client\Payment\PaymentClient;
use MercadoPago\Client\Preference\PreferenceClient;
use MercadoPago\Client\PreApproval\PreApprovalClient;
use MercadoPago\MercadoPagoConfig;
use App\Models\Subscription;
use App\Models\Invoice;
use App\Services\Payment\InvoiceService;

class MercadoPagoService
{

    protected $paymentClient;
    protected $preferenceClient;
    protected $preapprovalClient;
    protected $invoiceService;

    public function __construct(InvoiceService $invoiceService)
    {
        MercadoPagoConfig::setAccessToken(config('services.mercadopago.token'));

        //inicializar los clientes
        $this->paymentClient = new PaymentClient();
        $this->preferenceClient = new PreferenceClient();
        $this->preapprovalClient = new PreApprovalClient();
        $this->invoiceService = $invoiceService;
    }

    /**
     * Crear una preferencia de pago en Mercado Pago.
     */
    public function createPreference(Invoice $invoice)
    {
        $preference = $this->preferenceClient->create([
            'items' => [
                [
                    'title' => 'Factura #'.$invoice->id_invoice,
                    'quantity' => 1,
                    'unit_price' => $invoice->total_amount,
                ]
                ],
                'external_reference' => $invoice->id_invoice,
                /*"back_urls" => [
                    "success" => config('app.frontend_url') . '/payment/success', // URL del frontend
                    "failure" => config('app.frontend_url') . '/payment/failure', // URL del frontend
                    "pending" => config('app.frontend_url') . '/payment/pending', // URL del frontend
                ],*/
                'auto_return' => 'approved',
            ]);

            return $preference;
    }

    /**
     * Crear un plan de suscripción en Mercado Pago.
     */
    public function createPlan($data)
    {
        $plan = $this->preapprovalClient->create([
            'auto_recurring' =>[
                'frequency' => $data['frequency'],
                'frequency_type' => $data['frequency_type'],
                'transaction_amount' => $data['amount'],
                'currency_id' => 'COP',
            ],
            'back_url' => config('app.frontend_url') . '/subscription/success', // URL del frontend
            'reason' => $data['reason'],
        ]);

        return $plan;
    }

    /**
     * Crear una suscripción en Mercado Pago.
     */
    public function createSubscription($plan_id, $payer_email)
    {
        $subscription = $this->preapprovalClient->create([
            'preapproval_plan_id' => $plan_id,
            'payer_email' => $payer_email,
        ]);

        return $subscription;
    }

    /**
     * Manejar la notificación de Mercado Pago para suscripciones.
     */
    public function handleSubscriptionNotification($subscription_id)
    {
        $subscription = $this->preapprovalClient->get($subscription_id);
        $appSubscription = Subscription::where('mercado_pago_subscription_id', $subscription->id)->first();

        if ($appSubscription) {
            $appSubscription->update([
                'mercado_pago_status' => $subscription->status,
                'mercado_pago_updated_at' => now(),
                'mercado_pago_response' => json_encode($subscription),
            ]);

            //si el pago es exitoso, generar una factura
            if ($subscription->status === 'authorized' || $subscription->status === 'active') {
                $this->invoiceService->generateInvoice($appSubscription);
            }

            
        }

        return $appSubscription;
    }

    /**
     * Generar una factura a partir de una suscripción.
     */
   


}