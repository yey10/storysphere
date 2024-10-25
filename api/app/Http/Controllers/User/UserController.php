<?php

namespace App\Http\Controllers\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Http\Controllers\Controller;


class UserController extends Controller
{
    
    //metodo para obtener todos los usuarios (filtros)

    public function index(Request $request){

        try {
            //consulta base
            $query = User::query();

            //filtrar por nombre

            if ($request->has('name')) {
                $query->where('name', 'like', '%' . $request->name . '%');
            }

            //filtrar por rol

            if ($request->has('role')) {
                $query->whereHas('roles', function($q) use ($request){
                    $q->where('id_rol', $request->role);
                });
            }

            //filtrar por email

            if ($request->has('email')) {
                $query->where('email', 'like', '%' . $request->email . '%');
            }

            $users = $query->get();

            return response()->json(['users' => $users], 200);


        } catch (\Illuminate\Database\QueryException $e) {
            // Capturar cualquier error relacionado con la base de datos
            return response()->json(['error' => $e->getMessage()], 500);
        } catch (\Exception $e) {
            // Capturar cualquier otro tipo de error
            return response()->json(['error' => 'Error inesperado: ' . $e->getMessage()], 500);
        }



    }

    //Metodo para actualizar perfil de usuario, (admins y users)

    public function updateProfile(Request $request, $id){
        try {
            
            $authUser = Auth::user(); //usuario autenticado

            $user = User::findOrfail($id); // usuario cuyo perfil se actualizara
              // Depuración para verificar los valores
            dd([
                'authUser_id' => $authUser->id_user,
                'authUser_role' => $authUser->id_rol,
                'user_to_delete_id' => $user->id_user
            ]);

            // Verificar si el usuario autenticado es el dueño del perfil o es un administrador

            if ($authUser->id_user !== $user->id_user &&  $authUser->id_rol !== 1) {
                return response()->json(['message' => 'No tienes permiso para realizar esta acción'],403);
            }

            //validar los datos del perfil

            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users,email,'.$user->id_user,
                'biography' =>  'required|string',
            ]);

            //actualizar el perfil

            $user->update($validatedData);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error inesperado: ' . $e->getMessage()], 500);
        }
    }


    //eliminar cuenta
    public function deleteAccount($id){


        try {
            $authUser = Auth::user(); //usuario autenticado
            $user = User::findOrfail($id); // usuario cuyo perfil se actualizara
    
            if ($authUser->id_user !== $user->id_user ||  $authUser->id_rol !== 1) {
                return response()->json(['message' => 'No tienes permiso para realizar esta acción'],403);
            }
    
            $user->delete();

            return response()->json(['message' => 'Cuenta eliminada con éxito'], 200);

        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error inesperado: ' . $e->getMessage()], 500);
        }
      



    }


    //metodo para actualizar rol
    public function updateRole(Request $request, $id){
        try {
            //obtenemos el usuario autenticado

            $admin = Auth::user();

            if ($admin->id_user !== 1) {
                return response()->json(['message' => 'No tienes permiso para actualizar roles'], 403);
            }

            $user = User::findOrFail($id);

            $validatedData = $request->validate([
                'id_rol' => 'required|exists:rol,id_rol',
            ]);

            $user->update(['id_rol' => $validatedData['id_rol']]);

            return response()->json(['message' => 'Rol actualizado con éxito', 'user' => $user], 200);



        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error inesperado: ' . $e->getMessage()], 500);
        }
    }




}
