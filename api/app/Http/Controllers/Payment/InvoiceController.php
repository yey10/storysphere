<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Services\Payment\InvoiceService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Exception;


class InvoiceController extends Controller
{
    protected $invoiceService;

    public function __construct(InvoiceService $invoiceService)
    {
        $this->invoiceService = $invoiceService;
    }
    

    public function createInvoice(Request $request)
    {
        try {
            $request->validate([
                'id_subscription' => 'required|exists:subscriptions,id_subscription',
                'total_amount' => 'required|numeric|min:0',
                'payment_method' => 'required|string|max:50',
            ]);

            $userId = Auth::id();

            $invoice = $this->invoiceService->createInvoice(
                $userId,
                $request->id_subscription,
                $request->total_amount,
                $request->payment_method
            );

            return response()->json(['message' => 'Factura creada exitosamente', 'invoice' => $invoice], 201);

        } catch (ValidationException $e) {
            return response()->json(['error' => 'Datos no válidos', 'details' => $e->errors()], 422);
        } catch (Exception $e) {
            return response()->json(['error' => 'No se pudo crear la factura', 'details' => $e->getMessage()], 500);
        }
    }

    public function generateInvoicePDF($invoiceId)
    {
        try {
            return $this->invoiceService->generateInvoicePDF($invoiceId);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Factura no encontrada'], 404);
        } catch (Exception $e) {
            return response()->json(['error' => 'No se pudo generar el PDF', 'details' => $e->getMessage()], 500);
        }
    }

    public function getInvoicesByUser()
    {
        try {
            $userId = Auth::id();
            $invoices = $this->invoiceService->getInvoicesByUser($userId);
            return response()->json($invoices);
        } catch (Exception $e) {
            return response()->json(['error' => 'No se pudieron obtener las facturas', 'details' => $e->getMessage()], 500);
        }
    }

    public function updateInvoiceStatus(Request $request, $invoiceId)
    {
        try {
            $request->validate([
                'payment_status' => 'required|string|in:pending,paid,canceled,failed',
            ]);

            $invoice = $this->invoiceService->updateInvoiceStatus($invoiceId, $request->payment_status);
            return response()->json(['message' => 'Estado de la factura actualizado', 'invoice' => $invoice]);
        } catch (ValidationException $e) {
            return response()->json(['error' => 'Datos no válidos', 'details' => $e->errors()], 422);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Factura no encontrada'], 404);
        } catch (Exception $e) {
            return response()->json(['error' => 'No se pudo actualizar el estado', 'details' => $e->getMessage()], 500);
        }
    }
   

}
