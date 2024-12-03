<?php

namespace App\Services\User;

use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AuthService
{

    public function register($data)
    {
        //Subida del archivo de imágen
        $profile_photo = null;
        if (isset($data['profile_photo'])) {
            $file = $data['profile_photo'];
            $file_name = Str::random(10) . '.' . $file->getClientOriginalExtension();
            $file->storeAs('public/profile_photos', $file_name);
            $profile_photo = $file_name;
        }

        //Crear nuevo usuario
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'biography' => $data['biography'],
            'profile_photo' => $profile_photo,
        ]);

       // Validar y asignar roles
        $allowedRoles = Role::pluck('id_rol')->toArray(); // IDs válidos
        $roles = array_intersect($data['roles'] ?? [1], $allowedRoles); // Filtrar roles válidos
        
        if (empty($roles)) {
            $roles = [1]; // Si no hay roles válidos, asignar 'user'
        }

        $user->roles()->attach($roles);
            return $user;
        }

    public function login($data)
    {
        //Verificar credenciales
        $user = User::where('email', $data['email'])->first();

        if (!$user || !Hash::check($data['password'], $user->password)) {
            return null; //No se encontró el usuario o la contraseña no coincide
        }

        return $user;

    }

    public function logout($user)
    {
        $user->tokens()->delete();
    }

}