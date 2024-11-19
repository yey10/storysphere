<?php

namespace App\Http\Controllers\User;

use App\Http\Requests\RegisterUserRequest;
use App\Http\Controllers\Controller;
use App\Services\User\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    // Método para registrar usuarios
    public function register(RegisterUserRequest $request)
    {
        try {
            $user = $this->authService->register($request->validated());

            //Generar token con sanctum
            $token = $user->createToken('auth_token')->plainTextToken;

            //Cargar la relación roles para obtener los nombres
            $user->load('roles');

            //Retornar mensaje de éxito
            return response()->json([
                'message' => 'Usuario creado con éxito',
                'user' => $user,
                'roles' => $user->roles->pluck('name'),
                'access_token' => $token,
                'token_type' => 'Bearer',
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al registrar usuario',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    //Método para iniciar sesión
    public function login(Request $request)
    {
        //Validar los datos
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        try {
            $user = $this->authService->login($request->only('email', 'password'));

            //Se verifica si los datos ingresados por el usuario son correctos
            if (!$user) {
                return response()->json(['message' => 'Credenciales inválidas'], 401);
            }

            //Se genera un nuevo token con sanctum para la autenticación
            $token = $user->createToken('auth_token')->plainTextToken;

            //Devolver respuesta con el token
            return response()->json([
                'message' => 'Usuario autenticado con éxito',
                'user' => $user,
                'roles' => $user->roles->pluck('name'),
                'access_token' => $token,
                'token_type' => 'Bearer',
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al iniciar sesión',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    //Metodo para logout
    public function logout(Request $request)
    {
        try {
            $this->authService->logout($request->user());

            return response()->json([
                'message' => 'Usuario desconectado con éxito',
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al cerrar sesión',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}




