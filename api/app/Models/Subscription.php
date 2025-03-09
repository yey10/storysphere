<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    protected $table = 'suscriptions';
    protected $primaryKey = 'id_subscription';
    public $timestamps = true;
    protected $fillable = [
        'id_user',
        'start_date',
        'end_date',
        'subscription_type',
        'mercado_pago_subscription_id',
        'mercado_pago_plan_id',
        'mercado_pago_status',
        'mercado_pago_created_at',
        'mercado_pago_updated_at',
        'mercado_pago_response',
    ];
    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'mercado_pago_created_at' => 'datetime',
        'mercado_pago_updated_at' => 'datetime',
        'mercado_pago_response' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function invoices()
    {
        return $this->hasMany(Invoice::class, 'id_subscription');
    }
    
}
