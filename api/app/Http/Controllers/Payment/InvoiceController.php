<?php

namespace App\Http\Controllers\Payment;

use Illuminate\Http\Request;
use App\Http\Requests\CreateInvoiceRequest;
use App\Http\Requests\UpdateInvoiceStatusRequest;
use App\Http\Controllers\Controller;
use App\Services\Payment\InvoiceService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Exception;


class InvoiceController extends Controller
{
    protected $invoiceService;

    public function __construct(InvoiceService $invoiceService)
    {
        $this->invoiceService = $invoiceService;
    }
    

     /**
     * Obtener todas las facturas del usuario autenticado.
     */

    public function index()
    {
        try {

            $userId = Auth::id();
            $invoices = $this->invoiceService->getInvoicesByUser($userId);
            return response()->json($invoices, 200);

        } catch (\Exception $e) {
            Log::error('Error al listar facturas: ' . $e->getMessage());
            return response()->json(['error' => 'No se pudieron obtener las facturas'], 500);
        }
        
    }

    /**
     * Obtener una factura por su ID.
     */

    public function show($id)
    {
        try {
            $invoice = $this->invoiceService->getInvoiceById($id);
            return response()->json($invoice, 200);
        } catch (\Exception $e) {
            Log::error('Error al obtener la factura: ' . $e->getMessage());
            return response()->json(['error' => 'Factura no encontrada'], 404);
        }
       
    }

    /**
     * Crear una factura
     */
    public function store(CreateInvoiceRequest $request)
    {
        try {
            $data = $request->validated();
            $this->invoiceService->generateInvoice($data);
            return response()->json(['message' => 'Factura creada con éxito'], 201);
        } catch (\Exception $e) {
            Log::error('Error al crear la factura: ' . $e->getMessage());
            return response()->json(['error' => 'No se pudo crear la factura'], 500);
        }
        
    }

    /**
     * Actualizar una factura
     */

    public function updateStatus(Request $request, $id)
    {
        try {
            $data = $request->validated();
            $this->invoiceService->updateInvoiceStatus($id, $data);
            return response()->json(['message' => 'Factura actualizada con éxito'], 200);
        } catch (\Exception $e) {
            Log::error('Error al actualizar la factura: ' . $e->getMessage());
            return response()->json(['error' => 'No se pudo actualizar la factura'], 500);
        }
    }

    /**
     * Eliminar una factura
     */

    public function destroy($id)
    {
        try {
            $this->invoiceService->deleteInvoice($id);
            return response()->json(['message' => 'Invoice deleted successfully'], 200);
        } catch (\Exception $e) {
            Log::error('Error al eliminar la factura: ' . $e->getMessage());
            return response()->json(['error' => 'No se pudo eliminar la factura'], 500);
        }
    }

}
