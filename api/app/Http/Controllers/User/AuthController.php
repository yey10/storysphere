<?php

namespace App\Http\Controllers\User;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    //Método para registrar usuarios
    public function register(Request $request)
    {
        // Validar los datos con Validator
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'biography' => 'required|string|max:500',
            'profile_photo' => 'nullable|image|mimes:jpg,png,jpeg,gif|max:2048',
        ]);

        // Verificar si la validación falla
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        try {
            // Manejar la subida del archivo de imagen
            $profile_photo = null;
            if ($request->hasFile('profile_photo')) {
                $file = $request->file('profile_photo');
                $nombreArchivo = Str::random(10) . '.' . $file->getClientOriginalExtension();
                $file->storeAs('public/fotos_perfil/', $nombreArchivo);
                $profile_photo = $nombreArchivo;
            }

            // Crear el nuevo usuario en la base de datos
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'biography' => $request->biography,
                'profile_photo' => $profile_photo,
            ]);

            // Asignar los roles al usuario
            if ($request->has('roles')) {
                $user->roles()->attach($request->roles); // Asignar múltiples roles
            } else {
                $user->roles()->attach([1]); // Asignar el rol por defecto con id 1
            }

            // Generar token con Sanctum
            $token = $user->createToken('auth_token')->plainTextToken;

            // Cargar la relación roles para obtener los nombres
            $user->load('roles');

            // Retornar mensaje de éxito
            return response()->json([
                'message' => 'Usuario creado con éxito',
                'user' => $user,
                'roles' => $user->roles->pluck('name'), // Mostrar los nombres de los roles
                'access_token' => $token,
                'token_type' => 'Bearer',
            ], 201);
        } catch (\Exception $e) {
            // Retornar un error si algo falla
            return response()->json([
                'message' => 'Error al registrar usuario',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    // Método para iniciar sesión
    public function login(Request $request)
    {
        // Validar los datos del usuario
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        try {
            // Buscar el usuario por email
            $user = User::where('email', $request->email)->first();

            // Verificar si el usuario existe y si la contraseña es correcta
            if (!$user) {
                return response()->json(['message' => 'El usuario no existe'], 404);
            }

            if (!Hash::check($request->password, $user->password)) {
                return response()->json(['message' => 'Contraseña incorrecta'], 401);
            }

            // Generar un nuevo Token con Sanctum
            $token = $user->createToken('auth_token')->plainTextToken;

            // Devolver respuesta con el token
            return response()->json([
                'message' => 'Usuario logueado con éxito',
                'user' => $user,
                'roles' => $user->roles->pluck('name'),
                'access_token' => $token,
                'token_type' => 'Bearer',
            ], 200);
        } catch (\Exception $e) {
            // Retornar un error si algo falla
            return response()->json([
                'message' => 'Error al iniciar sesión',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    // Método para logout
    public function logout(Request $request)
    {
        try {
            // Revocar el token actual que está utilizando el usuario autenticado
            $request->user()->tokens()->delete();

            return response()->json([
                'message' => 'Cierre de sesión exitoso'
            ]);
        } catch (\Exception $e) {
            // Retornar un error si algo falla
            return response()->json([
                'message' => 'Error al cerrar sesión',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
