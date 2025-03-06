<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Subscription;


class Invoice extends Model
{
    use HasFactory;
    protected  $primaryKey = 'id_invoice';
    protected $table = 'invoices';
    public $timestamps = true;

    protected $fillable = [
        'id_user',
        'id_subscription',
        'issue_date',
        'total_amount',
        'payment_method',
        'payment_status',
        'invoice_detail',
        'mercado_pago_payment_id',
        'mercado_pago_status',
        'mercado_pago_preference_id',
        'mercado_pago_created_at',
        'mercado_pago_updated_at',
        'mercado_pago_response',
    ];

    protected $casts = [
        'issue_date' => 'date',
        'mercado_pago_created_at' => 'datetime',
        'mercado_pago_updated_at' => 'datetime',
        'invoice_detail' => 'array',
        'mercado_pago_response' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user', 'id_user');
    }

    public function subscription()
    {
        return $this->belongsTo(Subscription::class, 'id_subscription', 'id_subscription');
    }
}
