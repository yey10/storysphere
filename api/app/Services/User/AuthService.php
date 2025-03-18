<?php

namespace App\Services\User;

use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class AuthService
{

    public function register(array $data): User
    {
        //Subida del archivo de imágen
        $profile_photo = isset($data['profile_photo']) ? $this->uploadProfilePhoto($data['profile_photo']) : null;

        //Crear nuevo usuario
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'biography' => $data['biography'] ?? null,
            'profile_photo' => $profile_photo,
            'birthdate' => $data['birthdate'],
        ]);

        $roles = $this->getValidRoles($data['roles'] ?? [1]);
        $user->roles()->attach($roles);
        return $user;
    }

    public function login($data)
    {
        //Verificar credenciales
        $user = User::where('email', $data['email'])->first();

        return ($user && Hash::check($data['password'], $user->password)) ? $user : null;

    }

    public function logout($user)
    {
        $user->tokens()->delete();
    }

    private function uploadProfilePhoto($file): ?string
    {

        if (!$file || !$file->isValid()) {
            return null;
        }
        $file_name = Str::random(10) . '.' . $file->getClientOriginalExtension();
        $path = Storage::disk('public')->putFileAs('profile_photos', $file, $file_name);
        return $path;
    }

    private function getValidRoles(array $roles): array
    {
        $allowed_roles = Role::all()->pluck('id_rol')->toArray();
        return array_intersect($roles, $allowed_roles) ?: [1];
    }

}