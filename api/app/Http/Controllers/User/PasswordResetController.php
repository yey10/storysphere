<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\User\PasswordResetService;
use Illuminate\Support\Facades\Password;

class PasswordResetController extends Controller
{
    protected $passwordResetService;

    public function __construct(PasswordResetService $passwordResetService)
    {
        $this->passwordResetService = $passwordResetService;
    }

    /**
     * Send password reset link
     */
    public function sendResetLink(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email'
        ]);

        $status = $this->passwordResetService->sendResetLink($request->email);

        return $status === Password::RESET_LINK_SENT
        ? response()->json(['message' => 'Correo de recuperación enviado'], 200)
        : response()->json(['error' => 'No se pudo enviar el correo'], 400);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'token' => 'required|string',
            'password' => 'required|string|confirmed|min:8',
        ]);

        $status = $this->passwordResetService->resetPassword($request->only('email', 'password', 'token', 'password_confirmation'));

        return $status === Password::PASSWORD_RESET
        ? response()->json(['message' => 'Contraseña restablecida correctamente'], 200)
        : response()->json(['error' => 'Error al restablecer la contraseña'], 400);
    }
    
}