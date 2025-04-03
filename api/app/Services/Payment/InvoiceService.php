<?php

namespace App\Services\Payment;

use App\Models\Invoice;
use App\Models\Subscription;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class InvoiceService
{
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