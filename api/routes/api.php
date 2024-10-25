<?php


use App\Http\Controllers\User\AuthController;
use App\Http\Controllers\Stories\StoryController;
use App\Http\Controllers\User\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');*/

//Rutas para autenticación
Route::post('/register', [AuthController::class,  'register']);  // register new user
Route::post('/login', [AuthController::class, 'login']); //Loguear user

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']); // Cerrar sesión
});


//Rutas para creacion de historias
Route::apiResource('stories', StoryController::class)->only(['index', 'show' ]);  //rutas publicas
Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource('stories', StoryController::class)->only(['store', 'update', 'destroy']); //rutas protegidas (se necesita autenticación)
});

//Obtener historias de un usuario
Route::middleware('auth:sanctum')->get('users/{user}/stories', [StoryController::class, 'getUserStories']);
//Obtener dueño de una historia
Route::middleware('auth:sanctum')->get('users/{id}/owner', [StoryController::class, 'getStoryOwner']);


//Rutas para los usuarios

Route::middleware('auth:sanctum')->group(function(){
    Route::get('/users', [UserController::class, 'index']); // obtener datos del usuario
    Route::put('users/{id}', [UserController::class, 'updateProfile']); //actualizar perfil
    Route::delete('users/{id}', [UserController::class, 'deleteAccount']); //eliminar cuenta
    Route::put('users/{id}/role', [UserController::class, 'updateRole']);
});






// accion, drama, ficcion, misterio, romance, terror