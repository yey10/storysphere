<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Models\Role;
use App\Models\Story;
class User extends Authenticatable
{
    use HasFactory, HasApiTokens, Notifiable; // Incluye el trait HasApiTokens aquí

    // Los campos que son rellenables ($fillable) para proteger los datos contra asignaciones masivas.
    // Los campos ocultos ($hidden), como la contraseña, para que no se envíen en respuestas JSON por seguridad.
    public $timestamps = false; // Deshabilitar manejo de created_at y updated_at

    protected $fillable = [
        'name', 'email', 'password', 'biography', 'profile_photo',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $table = 'users'; // Asegúrate de que esté apuntando a la tabla correcta
    protected $primaryKey = 'id_user'; // Mantén esto como 'id_user' si es el campo autoincremental


    public function roles()
    {
        return $this->belongsToMany(Role::class, 'role_user', 'id_user', 'id_rol');
    }


    public function stories()
    {
        
        return $this->hasMany(Story::class, 'id_user', 'id_user');
    }


/*

    public function comments()
    {
        return $this->hasMany(Comment::class, 'id_user', 'id_user');
    }

          public function likes()
    {
        return $this->hasMany(Like::class, 'id_user');
    }

      public function followers()
    {
        return $this->hasMany(Follower::class, 'id_followed');
    }

       public function following()
    {
        return $this->hasMany(Follower::class, 'id_follower');
    }
*/
}
