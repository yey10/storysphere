<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Services\User\UserService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;




class ProfileController extends Controller
{

    protected $userService;


    public function __construct(UserService $userService)
    {
        $this->userService = $userService;

    }


    public function show()
    {
       // return dd(Auth::user());
        
        try {
            return $this->userService->getAuthenticatedUser();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error inesperado: ' . $e->getMessage()], 500);
        }
    }

        //Metodo para actualizar perfil de usuario, (admins y users)

        public function update(Request $request, $id){
           try {
            $authUser = Auth::user();
            
            // Procesar datos del request
            $data = $request->all(); 

            Log::info('Datos recibidos en la petición:', $request->all());
            Log::info("ID recibido en la URL:", ['id_user' => $id]);


            if (!empty($data['profile_photo'])) {
                Log::info('URL de imagen recibida:', ['profile_photo' => $data['profile_photo']]);
            } else {
                Log::warning('No se recibió una URL en profile_photo.');
            }
    
            $user = $this->userService->updateUserProfile($authUser, $id, $data);
    
            return response()->json(['message' => 'Perfil actualizado con éxito', 'user' => $user], 200);
        
            } catch (ValidationException $e) {
                return response()->json(['error' => $e->errors()], 422);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Error inesperado: ' . $e->getMessage()], 500);
            }
        }

        public function updateRole(Request $request, $id)
        {
            try {
                $authUser = Auth::user();
                $data = $request->all(); // Obtener todos los datos del request

                // Actualizar el rol del usuario
                $user = $this->userService->updateUserRole($authUser, $id, $data);

                return response()->json(['message' => 'Rol actualizado con éxito', 'user' => $user], 200);
            } catch (ValidationException $e) {
                return response()->json(['error' => $e->errors()], 422);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Error inesperado: ' . $e->getMessage()], 500);
            }
        }

        public function updateStatus(Request $request, $id)
        {
            try {
                $authUser = Auth::user();
                $data = $request->all(); // Obtener todos los datos del request

                // Validar el estado de la cuenta
                if (!in_array($data['account_status'], ['active', 'inactive'])) {
                    return response()->json(['error' => 'Estado de cuenta no válido'], 422);
                }

                // Actualizar el estado de la cuenta del usuario
                $user = $this->userService->updateUserStatus($authUser, $id, $data);

                return response()->json(['message' => 'Estado de cuenta actualizado con éxito', 'user' => $user], 200);
            } catch (ValidationException $e) {
                return response()->json(['error' => $e->errors()], 422);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Error inesperado: ' . $e->getMessage()], 500);
            }
        }

}