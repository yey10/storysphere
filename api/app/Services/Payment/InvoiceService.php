<?php

namespace App\Services\Payment;

use App\Models\Invoice;
use App\Models\Subscription;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class InvoiceService
{
    public function createInvoice($userId, $subscriptionId, $totalAmount, $paymentMethod)
    {
        return DB::transaction(function () use ($userId, $subscriptionId, $totalAmount, $paymentMethod){
            return Invoice::create([
                'id_user' => $userId,
                'id_subscription' => $subscriptionId,
                'issue_date' => Carbon::now(),
                'total_amount' => $totalAmount,
                'payment_method' => $paymentMethod,
                'payment_status' => 'pending', 
                'invoice_detail' => json_encode(['message' => 'Pago por suscripción']),
            ]);
        });
    }

    public function generateInvoicePDF($invoiceId)
    {
        $invoice = Invoice::with(['user', 'subscription'])->findOrFail($invoiceId);
        
        $pdf = Pdf::loadView('pdf.invoice', compact('invoice'));
        
        return $pdf->stream("factura_{$invoice->id_invoice}.pdf");
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

}