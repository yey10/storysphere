<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    protected $table = 'subscriptions';
    protected $primaryKey = 'id_subscription';
    public $timestamps = true;
    protected $fillable = [
        'id_user',
        'start_date',
        'end_date',
        'subscription_type',
    ];
    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
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
