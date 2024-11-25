<?php


use App\Http\Controllers\User\AuthController;
use App\Http\Controllers\Stories\StoryController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\Interactions\CommentController;
use Illuminate\Support\Facades\Route;

// Rutas para autenticación
Route::controller(AuthController::class)->group(function () {
    Route::post('/register', 'register'); // Registrar nuevo usuario
    Route::post('/login', 'login'); // Loguear usuario
    Route::middleware('auth:sanctum')->post('/logout', 'logout'); // Cerrar sesión
});

// Rutas para usuarios
Route::prefix('users')->middleware('auth:sanctum')->controller(UserController::class)->group(function () {
    Route::get('/', 'index'); // Obtener todos los usuarios
    Route::get('/{id}', 'show'); // Obtener datos del usuario
    Route::get('/profile', 'profile'); // Obtener perfil
    Route::put('/{id}/profile', 'updateProfile'); // Actualizar perfil
    Route::delete('/{id}', 'deleteAccount'); // Eliminar cuenta
    Route::put('/{id}/role', 'updateRole'); // Actualizar rol
    Route::get('/{user}/stories', [StoryController::class, 'getUserStories']); // Historias de un usuario
    Route::get('/{user}/comments', [CommentController::class, 'getUserComments']); // Comentarios de un usuario
});

// Rutas para historias
Route::prefix('stories')->group(function () {
// Rutas públicas
Route::get('/', [StoryController::class, 'index']); // Obtener todas las historias
Route::get('/{id}', [StoryController::class, 'show']); // Obtener datos

    Route::middleware('auth:sanctum')->group(function () {
    // Rutas protegidas
        Route::post('/', [StoryController::class, 'store']); // Crear nueva historia
        Route::put('/{story}', [StoryController::class, 'update']); // Actualizar
        Route::delete('/{story}', [StoryController::class, 'destroy']); // Eliminar
        Route::get('{id}/owner', [StoryController::class, 'getStoryOwner']); // Obtener dueño de una historia
    });
});

//Rutas para los comentarios
Route::middleware('auth:sanctum')->group(function(){

    Route::post('/stories/{story}/comments', [CommentController::class, 'update']); //nuevo comentario en una historia especifica
    Route::put('/comments/{comment}', [CommentController::class, 'update']); //Actualizar un comentario (solo para administradores y dueños de los comentarios)
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy']); //Eliminar un comentario (solo para administradores y dueños de los comentarios)

});

//Obtener todos los comentarios de una historia específica (público)
Route::get('/stories/{story}/comments', [CommentController::class, 'index']);
//Obtener todos los comentarios de una historia específica (público)
Route::get('/comments/{comment}', [CommentController::class, 'show']);
//Obtener todos los comentarios de un usuario
Route::middleware('auth:sanctum')->get('/users/{user}/comments', [CommentController::class, 'getUserComments']);
//Obtener el dueño de un comentario especifico
Route::middleware('auth:sanctum')->get('/comments/{id}/owner', [CommentController::class, 'getCommentOwner']);











// accion, drama, ficcion, misterio, romance, terror