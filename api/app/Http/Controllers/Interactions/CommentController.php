<?php

namespace App\Http\Controllers\Interactions;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCommentRequest;
use App\Http\Requests\updateCommentRequest;
use App\Services\Interactions\CommentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;




class CommentController extends Controller
{
    protected $commentService;

    public function __construct(CommentService $commentService)
    {
        $this->commentService = $commentService;
    }


    //Obtener todos los comentarios
    public function index($storyId)
    {
        try {
            $commments = $this->commentService->getAllCommentsForStory($storyId);
            return response()->json($commments, 200);
        } catch (\Exception $e) {
                return response()->json(['error' => 'Error inesperado: ' . $e->getMessage()], 500);
        }
       
    }

    //Crear comentarios
    public function store(StoreCommentRequest $request,  $storyId)
    {
        try {
            $comment = $this->commentService->createComment($request->validated(), $storyId);
            return response()->json(['message' => 'Comentario creado con éxito', 'comment' => $comment], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error inesperado: ' . $e->getMessage()], 500);
        }
    }

    //Mostrar comentario especifico
    public function show( $id)
    {
        try {
            $comment = $this->commentService->getCommentById($id);
            return response()->json(['comment' => $comment], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error inesperado: ' . $e->getMessage()], 500);
        }
    }

    //Actualizar comentario
    public function update(updateCommentRequest $request,  $id)
    {
        try {
            $comment = $this->commentService->getCommentById($id);

            //verificar permisos
            if (Auth::user()->id_rol !== 'admin' && Auth::id() !== $comment->id_user) {
                return response()->json(['error' => 'No tienes permisos para realizar esta acción'], 403);
            }

            $updatedComment = $this->commentService->updateComment($request->validated(), $id);
            return response()->json(['message' => 'Comentario actualizado con éxito', 'comment' => $updatedComment], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error inesperado: ' . $e->getMessage()], 500);
        }
    }

    //Eliminar comentario
    public function destroy( $id)
    {
        try {
            $comment = $this->commentService->getCommentById($id);

            //verificar permisos
            if (Auth::user()->id_rol !== 'admin' && Auth::id() !== $comment->id_user) {
                return response()->json(['error' => 'No tienes permisos para realizar esta acción'],403);
            }
     
             $this->commentService->deleteComment($id);
             return response()->json(['message' => 'Comentario eliminado con éxito'], 200);
        } catch (\Exception $e) {
                return response()->json(['error' => 'Error inesperado: ' . $e->getMessage()], 500);
        }
      
    }


    //METODOS ADICIONALES



    //metodo para obtener todos los comentarios de un usurio
    public function getUserComments($userId)
    {
        try {
            $comment = $this->commentService->getCommentsByUser($userId);
            return response()->json(['comments' => $comment], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error inesperado: ' . $e->getMessage()], 500);
        }
     
    }

    //metodo para obtener el dueño de un comentario

    public function getCommentOwner($id)
    {
        try {
            $commentOwner = $this->commentService->getCommentOwner($id);
            return response()->json(['commentOwner' => $commentOwner], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error inesperado: ' . $e->getMessage()], 500);
        }

    }





}
