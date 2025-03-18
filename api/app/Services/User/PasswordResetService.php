<?php

namespace App\Services\User;

use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;

class PasswordResetService
{
    /**
     * Send password reset link
     */

    public function sendResetLink($email)
    {
        return Password::sendResetLink(['email' => $email]);
    }

    /**
     * Reset password
     */

    public function resetPassword($data)
    {
        return Password::reset($data, function (User $user, $password){
            $user->forceFill([
                'password' => Hash::make($password)
            ])->save();
            event(new PasswordReset($user));
        });
    }
}