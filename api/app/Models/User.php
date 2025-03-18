<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Contracts\Auth\CanResetPassword;
use App\Models\Role;
use App\Models\Story;
use App\Models\Comment;
use App\Models\Like;
use App\Models\Follower;
use App\Models\Rating;
use App\Models\Subscription;
use App\Models\Invoice;


class User extends Authenticatable implements CanResetPassword
{
    use HasFactory, HasApiTokens, Notifiable; 

    // Los campos que son rellenables ($fillable) para proteger los datos contra asignaciones masivas.
    // Los campos ocultos ($hidden), como la contraseña, para que no se envíen en respuestas JSON por seguridad.
    public $timestamps = false; // Deshabilitar manejo de created_at y updated_at

    protected $fillable = [
        'name', 'email', 'password', 'biography', 'profile_photo', 'birthdate',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $table = 'users'; 
    protected $primaryKey = 'id_user'; 


    public function roles()
    {
        return $this->belongsToMany(Role::class, 'role_user', 'id_user', 'id_rol');
    }


    public function stories()
    {
        
        return $this->hasMany(Story::class, 'id_user', 'id_user');
    }

    public function ratings()
    {
        return $this->hasMany(Rating::class, 'id_user', 'id_user');
    }




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

    public function subscription()
    {
        return $this->hasMany(Subscription::class, 'id_user', 'id_user');
    }

    public function invoices()
    {
        return $this->hasMany(Invoice::class, 'id_user', 'id_user');
    }

}
