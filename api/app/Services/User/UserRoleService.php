<?php

namespace App\Services\User;

use App\Models\User;
use Exception;
use Illuminate\Validation\ValidationException;

class UserRoleService
{
    public function updateRole($request, $id)
    {
        try {
            //Buscar el usuario por id
            $user = User::findOrFail($id);

            //Validar los datos
            $validatedData = $request->validate([
                'id_rol' => 'required|exists:rol,id_rol',
            ]);

            //Actualizar el rol
            $user->update([
                'id_rol' => $validatedData['id_rol'],
            ]);

            return $user;
            
        } catch (ValidationException $e) {
            throw new Exception('Error de validación: ' . $e->getMessage());
        } catch (Exception $e) {
            throw new Exception('Error al actualizar el rol: ' . $e->getMessage());
        }
    }
}