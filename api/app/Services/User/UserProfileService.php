<?php

namespace App\Services\User;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Exception;


class UserProfileService
{
    public function getProfile($request, $id)
    {
        try {
            //Buscar el usuario por id
            $user = User::findOrFail($id);

            //Verificar si el usuario autenticado tiene acceso
            $authUser = Auth::user();
            if ($authUser->id_user !== $user->id_user && $authUser->id_rol !== 1) {
                throw new \Exception('No tiene acceso a este perfil');
            }
            return $user;
        } catch (Exception $e) {
            throw new Exception('Error al obtener el perfil: ' . $e->getMessage());
        }
    }

    public function updateProfile($request, $id)
    {
        try {
            $authUser = Auth::user();
            $user = User::findOrFail($id);

            //Verificar si el usuario autenticado tiene permiso para actualizar
            if ($authUser->id_user !== $user->id_user && $authUser->id_user !== 1) {
                throw new Exception('No tienes permiso para actualizar este perfil');
            }
            //Validar los datos recibidos
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users,email,' . $user->id_user,
                'biography' => 'nullable|string',
            ]);

            //Actualizar el usuario con los datos validados
            $user->update($validatedData);

            return $user;

        } catch (ValidationException $e) {
            throw new Exception('Error de validación: ' . $e->getMessage());
        } catch (Exception $e) {
            throw new Exception('Error inesperado: ' . $e->getMessage());
        }
    }
}