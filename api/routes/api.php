<?php


use App\Http\Controllers\User\AuthController;
use App\Http\Controllers\Stories\StoryController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\Interactions\CommentController;
use App\Http\Controllers\Interactions\FollowerController;
use App\Http\Controllers\Interactions\LikeController;
use Illuminate\Support\Facades\Route;

// Rutas para autenticación
Route::controller(AuthController::class)->group(function () {
    Route::post('/register', 'register'); // Registrar nuevo usuario
    Route::post('/login', 'login'); // Loguear usuario
    Route::middleware(['auth:sanctum', 'token.expiration'])->post('/logout', 'logout'); // Cerrar sesión
});

// Rutas para usuarios
Route::prefix('users')->middleware(['auth:sanctum', 'token.expiration'])->controller(UserController::class)->group(function () {
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
    Route::get('/{story}/comments', [CommentController::class, 'index']); // Obtener comentarios de una historia

    Route::middleware(['auth:sanctum', 'token.expiration'])->group(function () {
    // Rutas protegidas
        Route::post('/', [StoryController::class, 'store']); // Crear nueva historia
        Route::put('/{story}', [StoryController::class, 'update']); // Actualizar
        Route::delete('/{story}', [StoryController::class, 'destroy']); // Eliminar
        Route::get('{id}/owner', [StoryController::class, 'getStoryOwner']); // Obtener dueño de una historia
        Route::post('/{story}/comments', [CommentController::class, 'store']); // Crear comentario
    });
});

//Rutas para los comentarios
Route::prefix('comments')->group(function(){
    //Rutas públicas
    Route::get('/{comment}', [CommentController::class, 'show']); //Obtener un comentario específico

    Route::middleware(['auth:sanctum', 'token.expiration'])->group(function(){
        //Rutas protegidas
        Route::put('/{comment}', [CommentController::class, 'update']); //Actualizar un comentario
        Route::delete('/{comment}', [CommentController::class, 'destroy']); //Eliminar un comentario
        Route::get('/{id}/owner', [CommentController::class, 'getCommentOwner']); //Obtener dueño de un comentario
    });
});

//Rutas para likes 
Route::prefix('likes')->middleware(['auth:sanctum', 'token.expiration'])->group(function (){
    Route::post('/{story}', [LikeController::class, 'likeStory']);
    Route::delete('/{story}', [LikeController::class, 'unlikeStory']);
    Route::get('/{story}/count', [LikeController::class, 'getStoryLikes']);
});

//Rutas para followers
Route::prefix('followers')->middleware(['auth:sanctum', 'token.expiration'])->group(function (){
    Route::post('/{user}', [FollowerController::class, 'followUser']);
    Route::delete('/{user}', [FollowerController::class, 'unFollowUser']);
    Route::get('/{user}/followers', [FollowerController::class, 'getFollowers']);
    Route::get('/{user}/following', [FollowerController::class, 'getFollowing']);
});

