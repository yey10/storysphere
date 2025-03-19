<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Carbon\Carbon;
use Laravel\Sanctum\PersonalAccessToken;

class CheckTokenExpiration
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->user()) {
            return response()->json([
                'message' => 'Usuario no autenticado',
            ], 401);
        }

        $token = $request->user()->currentAccessToken();
        
        if (!$token) {
            return response()->json([
                'message' => 'Token no encontrado',
            ], 401);
        }

        // Si el campo expires_at no existe, omitir la verificación
        if (!isset($token->expires_at)) {
            return $next($request);
        }

        if (Carbon::now()->gt($token->expires_at)) {
            return response()->json([
                'message' => 'El token ha expirado',
            ], 401);
        }

        return $next($request);
    }
}
