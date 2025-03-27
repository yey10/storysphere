<?php
namespace App\Services\User;

use App\Models\User;
use Cloudinary\Api\Upload\UploadApi;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;


class UserService
{
    public function getAllUsers($request)
    {
        try {
            $query = User::query();

            if ($request->filled('name')) {
                $query->where('name', 'like', '%' . $request->name . '%');
            }

            if ($request->filled('role')) {
                $query->where('id_rol', $request->role);
            }

            if ($request->filled('email')) {
                $query->where('email', 'like', '%' . $request->email . '%');
            }

            return $query->paginate(10);
            
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
    public function getAuthenticatedUser()
    {
        $user = Auth::user();
        return response()->json($user);
    }
 
     // Actualizar perfil de un usuario
     public function updateUserProfile($authUser, $id, $data)
     {
         $user = User::findOrFail($id);
     
         // Verificar permisos: El usuario puede actualizar su propio perfil o un admin puede actualizar cualquier usuario
         if ($authUser->id_user !== $user->id_user && $authUser->id_rol !== 2) {
             throw new \Exception('No tienes permiso para actualizar este perfil');
         }
     
         // Reglas de validación base
         $rules = [
             'name' => 'nullable|string|max:255',
             'email' => 'nullable|string|email|max:255|unique:users,email,' . $user->id_user,
             'biography' => 'nullable|string',
             'profile_photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
         ];
     
         // Solo los administradores pueden actualizar el estado de la cuenta
         if ($authUser->id_rol === 2) {
             $rules['account_status'] = 'nullable|in:active,inactive';
         }
     
         // Validar los datos recibidos
         $validator = Validator::make($data, $rules);
     
         if ($validator->fails()) {
             throw new \Illuminate\Validation\ValidationException($validator);
         }

         //eliminar la imagen de perfil anterior
         if (isset($data['profile_photo']) && $data['profile_photo']->isValid()) {
            $cloudinary = new UploadApi();

            if ($user->profile_photo) {
                // Extraer el public_id de la URL anterior
                $publicId = pathinfo(parse_url($user->profile_photo, PHP_URL_PATH), PATHINFO_FILENAME);
                $cloudinary->destroy('user_profile_photos/' . $publicId);
            }

            $uploaded = $cloudinary->upload($data['profile_photo']->getRealPath(), ['folder' => 'userProfile_photos']);
            $data['profile_photo'] = $uploaded['secure_url'] ?? null;
         }
     
         // Actualizar usuario
         $user->update($validator->validated());
     
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

        $validator = Validator::make($data, [
            'id_rol' => 'required|exists:roles,id_rol',
        ]);

        if ($validator->fails()) {
            throw new \Illuminate\Validation\ValidationException($validator);
        }

        $user->update(['id_rol' => $validator->validated()['id_rol']]);

        return $user;
    }

}
