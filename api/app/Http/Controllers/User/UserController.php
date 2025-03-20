<?php

namespace App\Http\Controllers\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Services\User\UserService;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Log;
use Laravel\Sanctum\PersonalAccessToken;



class UserController extends Controller
{
    protected $userService;


    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }
    
    //metodo para obtener todos los usuarios (filtros)
    public function index(Request $request){

        try {
           $users = $this->userService->getAllUsers($request);
           return response()->json(['users' => $users], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error inesperado: ' . $e->getMessage()], 500);
        }

    }

    //obtener por id 
    public function show( $id){

        try{

            $user = $this->userService->getUserById($id);
            return response()->json(['user' => $user], 200);

        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error inesperado: ' . $e->getMessage()], 500);
        }

    }


    public function getProfile()
    {
        try {
            $user = $this->userService->getAuthenticatedUser();
            return response()->json(['user' => $user], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error inesperado: ' . $e->getMessage()], 500);
        }
    }
    



    //Metodo para actualizar perfil de usuario, (admins y users)

    public function updateProfile(Request $request, $id){
        try {
            $authUser = Auth::user();
            $user = $this->userService->updateUserProfile($authUser, $id, $request->all());
            return response()->json(['message' => 'Perfil actualizado con éxito','user' => $user], 200);

        } catch (ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error inesperado: ' . $e->getMessage()], 500);
        }
    }


    //eliminar cuenta
    public function deleteAccount($id){

        try {
            $authUser = Auth::user();
            $this->userService->deleteUserAccount($authUser, $id);
            return response()->json(['message' => 'Cuenta eliminada con éxito'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error inesperado: ' . $e->getMessage()], 500);
        }
    }


    //metodo para actualizar rol
    public function updateRole(Request $request, $id){
        try {
            $admin = Auth::user();
            $user = $this->userService->updateUserRole($admin, $id, $request->all());
            return response()->json(['message' => 'Rol actualizado con éxito','user' => $user],200);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error inesperado: ' . $e->getMessage()], 500);
        }
    }




}
