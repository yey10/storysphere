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
    ];

    protected $casts = [
        'issue_date' => 'date',
        'invoice_detail' => 'array',
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
