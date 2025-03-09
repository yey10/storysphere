<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateInvoiceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id_user' => 'required|exists:users,id_user',
            'id_subscription' => 'nullable|exists:subscriptions,id_subscription',
            'total_amount' => 'required|numeric',
            'payment_method' => 'nullable|string',
            'payment_status' => 'nullable|string',
            'invoice_detail' => 'nullable|array',
            'mercado_pago_payment_id' => 'nullable|string',
            'mercado_pago_status' => 'nullable|string',
            'mercado_pago_response' => 'nullable|array',
        ];
    }
}
