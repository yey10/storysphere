<?php
namespace App\Services\User;

use App\Models\User;
use Illuminate\Support\Facades\Auth;


class UserService
{
    public function getAllUsers($request)
    {
        try {
            $query = User::query();

            if ($request->has('name')) {
                $query->where('name', 'like', '%' . $request->name . '%');
            }

            if ($request->has('role')) {
                $query->whereHas('roles', function($q) use ($request){
                    $q->where('roles.id_rol', $request->role);
                });
            }

            if ($request->has('email')) {
                $query->where('email', 'like', '%' . $request->email . '%');
            }

            return $query->get();
            
        } catch (\Exception $e) {
            throw new \Exception('Error inesperado: ' . $e->getMessage());
        }
    }


     // Obtener un usuario por ID
    public function getUserById($id)
    {
         return User::findOrFail($id);
    }
 
     // Obtener el perfil del usuario autenticado
    public function getUserProfile()
    {
        $user = Auth::user();
        if (!$user) {
            throw new \Exception('Usuario no encontrado');
        }
        return $user;
    }
 
     // Actualizar perfil de un usuario
    public function updateUserProfile($authUser, $id, $data)
    {
         $user = User::findOrFail($id);
 
         if ($authUser->id_user !== $user->id_user && $authUser->id_rol !== 2) {
             throw new \Exception('No tienes permiso para actualizar este perfil');
         }
 
         $validatedData = validator($data, [
             'name' => 'nullable|string|max:255',
             'email' => 'nullable|string|email|max:255|unique:users,email,' . $user->id_user,
             'biography' => 'nullable|string',
         ])->validate();
 
         $user->update($validatedData);
 
         return $user;
    }
 
     // Eliminar cuenta de usuario
    public function deleteUserAccount($authUser, $id)
    {
         $user = User::findOrFail($id);
 
         if ($authUser->id_user !== $user->id_user && $authUser->id_rol !== 2) {
             throw new \Exception('No tienes permiso para eliminar esta cuenta');
         }
 
         $user->delete();
    }
 
     // Actualizar el rol de un usuario
    public function updateUserRole($admin, $id, $data)
    {
         if ($admin->id_rol !== 2) {
             throw new \Exception('No tienes permiso para actualizar roles');
         }
 
         $user = User::findOrFail($id);
 
         $validatedData = validator($data, [
             'id_rol' => 'required|exists:roles,id_rol',
         ])->validate();
 
         $user->update(['id_rol' => $validatedData['id_rol']]);
 
         return $user;
    }



}
