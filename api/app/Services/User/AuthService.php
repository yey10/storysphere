<?php

namespace App\Services\User;

use App\Models\User;
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

        //Asignar roles al usuario
        $user->roles()->attach($data['roles'] ?? [1]); //Se asigna el rol 1 (user) por defecto
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