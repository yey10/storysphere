<?php
namespace App\Services\User;

use App\Models\User;
use App\Models\Role;
use App\Models\Story;
use App\Models\Comment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;




class UserService
{
    public function getAllUsers($request): array
    {
            $users = User::with(['roles:id_rol,name_rol'])
            ->when($request->filled('name'), fn ($q) => $q->where('name', 'like', "%{$request->name}%"))
            ->paginate(10);

        $transformedUsers = collect($users->items())->map(function ($user) {
            return [
                ...$user->toArray(),
                'roles' => $user->roles->pluck('name_rol')->toArray() ?: ['Sin rol']
            ];
        });

        return [
            'data' => $transformedUsers,
            'pagination' => [
                'current_page' => $users->currentPage(),
                'last_page' => $users->lastPage(),
                'total' => $users->total(),
            ],
        ];
    }

    public function getUserStats()
    {
        $totalUsers = User::count();
        $totalStories = Story::count();
        $totalComments = Comment::count();

        return response()->json([
            'total_users' => $totalUsers,
            'total_stories' => $totalStories,
            'total_comments' => $totalComments
        ]);
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

        if (!$user) {
            return response()->json(['error' => 'No autenticado'], 401);
        }
    
        // Obtener usuario con los roles
        $userWithRoles = User::where('id_user', $user->id_user)->with('roles')->first();
    
        return response()->json([
            'user' => $userWithRoles,
            'roles' => $userWithRoles->roles->pluck('name'), // Solo los nombres de los roles
        ]);
    }
 
     // Actualizar perfil de un usuario
     public function updateUserProfile($authUser, $id, $data)
     {
            $user = User::where('id_user', $id)->firstOrFail();
     
         // Verificar permisos: El usuario puede actualizar su propio perfil o un admin puede actualizar cualquier usuario
         if ($authUser->id_user !== $user->id_user && $authUser->id_rol !== 2) {
             throw new \Exception('No tienes permiso para actualizar este perfil');
         }
     
         // Reglas de validación base
         $rules = [
             'name' => 'nullable|string|max:255',
             'email' => 'nullable|string|email|max:255|unique:users,email,' . $user->id_user . ',id_user',
             'biography' => 'nullable|string',
             'profile_photo' => 'nullable|string|url',
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

         if (!empty($data['profile_photo'])) {
            $user->profile_photo = $data['profile_photo'];
         }

         
         $user->fill($validator->validated());
     
         // Actualizar usuario
         $user->save();
     
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

            Log::info('Rol del usuario autenticado:', ['id_rol' => $admin->id_rol]);

        // Obtener el primer rol del usuario autenticado
        $adminRole = $admin->roles->first();

        // Verificar si el usuario autenticado tiene un rol asignado y si es administrador
        if (!$adminRole || $adminRole->id_rol !== 2) {
            throw new \Exception('No tienes permiso para actualizar roles');
        }

        $user = User::findOrFail($id);

        $validator = Validator::make($data, [
            'id_rol' => 'required|exists:roles,id_rol',
        ]);

        if ($validator->fails()) {
            throw new \Illuminate\Validation\ValidationException($validator);
        }

        // Actualizar el rol del usuario
        $user->roles()->sync([$validator->validated()['id_rol']]);

        // Recargar la relación roles para asegurarse de que está actualizada
        $user->load('roles');

        
        return $user;
    }

    public function updateUserStatus($admin, $id, $data)
    {
       // Obtener el primer rol del usuario autenticado
        $adminRole = $admin->roles->first();

    // Verificar si el usuario autenticado tiene un rol asignado y si es administrador (ajusta el ID del rol según tu BD)
        if (!$adminRole || $adminRole->id_rol !== 2) {
            throw new \Exception('No tienes permiso para actualizar el estado de los usuarios');
        }

        $user = User::findOrFail($id);

        $validator = Validator::make($data, [
            'account_status' => 'required|in:active,inactive',
        ]);

        if ($validator->fails()) {
            throw new \Illuminate\Validation\ValidationException($validator);
        }

        $user->update(['account_status' => $validator->validated()['account_status']]);

        return $user;
    }

}
