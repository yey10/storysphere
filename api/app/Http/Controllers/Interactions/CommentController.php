<?php

namespace App\Http\Controllers\Interactions;



use App\Models\Comment;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;


class CommentController extends Controller
{
    //Obtener todos los comentarios
    public function index($storyId)
    {
        try{
            $comments = Comment::with('user')->where('id_story', $storyId)->get();
            return response()->json(['comments' =>  $comments], 200);
        } catch (\Illuminate\Database\QueryException $e) {
            // Captura de excepciones relacionadas con la base de datos
            return response()->json(['error' => $e->getMessage()], 500);
        } catch (\Exception $e) {
            // Captura de cualquier otro tipo de excepciones
            return response()->json(['error' => 'Error inesperado: ' . $e->getMessage()], 500);
        }
       
    }

    //Crear comentarios
    public function store(Request $request,  $storyId)
    {


        try{
            $validatedData = $request->validate([
                'content_comment' => 'required|string|max:500',
            ]);

            $user = Auth::user();
            if(!$user){
                return response()->json(['message' => 'El usuario no está autenticado'], 404);    
            }


            $comment = Comment::create([
                'content' => $validatedData['content'],
                'id_user' =>  Auth::id(),
                'id_story' => $storyId,
            ]);

            return response()->json(['message' => 'Comentario creado con  éxito', 'comment' => $comment], 201);


        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['error' => $e->validator->errors()], 422);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error inesperado: ' . $e->getMessage()], 500);
        }

       









    }

    //Mostrar comentario especifico
    public function show(string $id)
    {
        try{
            $comment = Comment::with('user', 'story')->findOrFail($id);
            return response()->json(['comment' => $comment], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Comentario no encontrado'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error inesperado: ' . $e->getMessage()], 500);
        }
    }

    //Actualizar comentario
    public function update(Request $request, string $id)
    {
        try{
            $comment = Comment::findOrFail($id);

            //Verificar si el usuario autenticado es el propietario o el administrador

            if(Auth::user()->id_rol !== 'admin' &&  Auth::user()->id !== $comment->id_user){
                return response()->json(['message' => 'No tienes permiso para editar este comentario'], 403);
            }

            $validatedData = $request->validate([
                'content_comment' =>  'required|string|max:500',
            ]);

            $comment->update(['content_comment' => $validatedData['content_comment']]);

            return response()->json(['message' =>  'Comentario actualizado con éxito', 'comment' => $comment], 200);



        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['error' => $e->validator->errors()], 422);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error inesperado: ' . $e->getMessage()], 500);
        }
    }

    //Eliminar comentario
    public function destroy(string $id)
    {
        try{
            $comment = Comment::findOrFail($id);

            //Verificar si el usuario autenticado es el propietario o el administrador

            if(Auth::user()->id_rol !== 'admin' &&  Auth::user()->id !== $comment->id_user){
                return response()->json(['message' => 'No tienes permiso para editar este comentario'], 403);
            }

            $comment->delete();

            return response()->json(['message' =>   'Comentario eliminado con éxito'], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['error' => $e->validator->errors()], 422);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error inesperado: ' . $e->getMessage()], 500);
        }
    }


    //METODOS ADICIONALES



    //metodo para obtener todos los comentarios de un usurio
    public function getUserComments(User $user){

        try{

            $comments = Comment::where('id_user', $user->id)->get();
            return response()->json(['comments' =>  $comments], 200);

        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error inesperado: ' . $e->getMessage()], 500);
        }
    }

    //metodo para obtener el dueño de un comentario

    public function getCommentOwner($id){
        try{

            $comment = Comment::with('user')->findOrFail($id);
            return response()->json(['comment' =>  $comment], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Comentario no encontrado'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error inesperado: ' . $e->getMessage()], 500);
        }
    }





}
