<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Role extends Model
{
    use HasFactory;


    protected $table = 'roles'; // Nombre de la tabla

    // Establece la clave primaria
    protected $primaryKey = 'id_rol'; 

    // Si no estás utilizando timestamps, establece esto en false
    public $timestamps = false;

    // Campos que son rellenables
    protected $fillable = [
        'name_rol',
    ];

    // Definir la relación con usuarios
    public function users()
    {
        return $this->belongsToMany(User::class, 'role_user', 'id_rol', 'id_user');
    }

    
}
