<?php

namespace App\Http\Controllers\Stories;

use App\Models\Story;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;



class StoryController extends Controller
{

    //método para obtener todas las historias
    public function index()
    {
        try {
            $stories = Story::with('user', 'categories')->get();
            return response()->json($stories);
        } catch (\Illuminate\Database\QueryException $e) {
            // Captura de excepciones relacionadas con la base de datos
            return response()->json(['error' => $e->getMessage()], 500);
        } catch (\Exception $e) {
            // Captura de cualquier otro tipo de excepciones
            return response()->json(['error' => 'Error inesperado: ' . $e->getMessage()], 500);
        }
    }


    //método para crear nueva historia
    public function store(Request $request)
    {
        // Validar los datos de la historia
        try {
            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'content' => 'required|string',
                'state' => 'required|boolean',
                'categories' => 'required|array',
                'categories.*' => 'exists:categories,id_category'
            ]);


            //Verificar si el usuario autenticado existe

            $user = Auth::user();

            if(!$user){
                return response()->json(['message' => 'El usuario no existe'], 404);    
            }
    
            // Crear la historia y asignar el usuario que la creó
            $story = Story::create([
                'title' => $validatedData['title'],
                'content' => $validatedData['content'],
                'state' => $validatedData['state'],
                'id_user' => Auth::id(),
            ]);
    
            $story->categories()->sync($validatedData['categories']);
    
            return response()->json(['message' => 'Historia creada con éxito', 'story' => $story], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Captura de excepciones de validación
            return response()->json(['error' => $e->validator->errors()], 422);
        } catch (\Illuminate\Database\QueryException $e) {
            // Captura de excepciones de base de datos
            return response()->json(['error' => $e->getMessage()], 500);
        } catch (\Exception $e) {
            // Captura de cualquier otro tipo de excepciones
            return response()->json(['error' => 'Error inesperado: ' . $e->getMessage()], 500);
        }
    }


    //método para obtener una historia especifica
    public function show(Story $story)
    {
        try {
            $story = Story::with('user', 'categories')->findOrFail($story->id_story);
            return response()->json($story);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            // Captura de excepciones cuando no se encuentra el modelo
            return response()->json(['error' => 'Historia no encontrada'], 404);
        } catch (\Exception $e) {
            // Captura de cualquier otro tipo de excepciones
            return response()->json(['error' => 'Error inesperado: ' . $e->getMessage()], 500);
        }
    }


    public function update(Request $request, Story $story) 
    {
        try{

            // Verifica si el usuario es el administrador o el propietario de la historia

            if (Auth::user()->id_rol !== 'admin' || $story->id_user !== Auth::id()) {
                return  response()->json(['message' => 'No tienes permiso para editar esta historia'], 403);
            }
            
            //Validar los datos de la historia

            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'content' => 'required|string',
                'state' => 'required|boolean',
                'categories' => 'nullable|array',
                'categories.*' => 'exists:categories,id_category'
                            
            ]);

            //Actualizar la historia

            $story->update($validatedData);

            //Si se envian categorias, actualizarlas

            if(isset($validatedData['categories'])){

                $story->categories()->sync($validatedData['categories']);

            }else{
                    $story->categories()->detach();
            }

            return response()->json(['message' => 'Historia actualizada con éxito', 'story' => $story], 200);


        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error inesperado: ' . $e->getMessage()], 500);
        }
    }


    public function destroy($id)
    {
        try {
        
            $story =  Story::findOrFail($id);

            // Verifica si el usuario es el administrador o el propietario de la historia

                if (Auth::user()->id_rol !== 'admin' || $story->id_user !== Auth::id()) {
                return   response()->json(['message' => 'No tienes permiso para eliminar esta historia'], 403);
            }
            
            $story->delete();
            return response()->json(['message' => 'Historia eliminada con éxito'], 200);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error inesperado: ' . $e->getMessage()], 500);
        }
    }


    //MÉTODOS ADICIONALES


    //obtener las historias que pertenezcan a un usuario

    public function getUserStories(User  $user){
        try{

            $stories = $user->stories()->get();
            return response()->json(['stories' => $stories], 200);

        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error inesperado: ' . $e->getMessage()], 500);
        }
    }

    //obtener el dueño de una historia

    public function getStoryOwner($id){

        try{
            $story = Story::with('user')->findOrFail($id);
            return response()->json(['owner' => $story->user], 200);
            } catch (\Illuminate\Database\QueryException $e) {
                return response()->json(['error' => $e->getMessage()], 500);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Error inesperado: ' . $e->getMessage()], 500);
            }
    }


}
