<?php

namespace App\Services\Payment;

use App\Models\Invoice;
use App\Models\Subscription;

class InvoiceService
{
    public function generateInvoice(Subscription $subscription)
    {
        Invoice::create([
            'id_user' => $subscription->id_user,
            'id_subscription' => $subscription->id_subscription,
            'issue_date' => now(),
            'total_amount' => $subscription->plan->transaction_amount, // Monto del plan
            'payment_method' => 'Mercado Pago',
            'payment_status' => 'approved',
            'invoice_detail' => json_encode([
                'plan' => $subscription->subscription_type,
                'description' => 'Pago de suscripción',
            ]),
            'mercado_pago_payment_id' => $subscription->mercado_pago_subscription_id,
            'mercado_pago_status' => $subscription->mercado_pago_status,
            'mercado_pago_response' => $subscription->mercado_pago_response,
        ]);
    }

    /**
     * Obtener todas las facturas de un usuario.
     */
    public function getInvoicesByUser($userId)
    {
        return Invoice::where('id_user', $userId)->orderByDesc('issue_date')->get();
    }

    /**
     * Obtener una factura por su ID.
     */
    public function getInvoiceById($invoiceId)
    {
        return Invoice::findOrFail($invoiceId);
    }


    /**
     * Actualizar el estado de una factura
     */

    public function updateInvoiceStatus($id, $status)
    {
        $invoice = Invoice::findOrFail($id);
        $invoice->update([
            'payment_status' => $status,
        ]);
        return $invoice;
    }

    /**
     * Eliminar una factura
     */

    public function deleteInvoice($id)
    {
        $invoice = Invoice::findOrFail($id);
        $invoice->delete();
        return true;
    }
}