<?php

namespace App\Http\Controllers\Interactions;

use App\Http\Controllers\Controller;
use App\Services\Interactions\RatingService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RatingController extends Controller
{
    protected $ratingService;

    public function __construct(RatingService $ratingService)
    {
        $this->ratingService = $ratingService;
    }

    public function store(Request $request)
    {
        $request->validate([
            'id_story' => 'required|exists:stories, id_story',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        $user = Auth::user();

        try{
            $rating = $this->ratingService->addOrUpdateRating($user->id_user, $request->id_story, $request->rating);
            return response()->json(['message' => 'calificación guardada', 'data' => $rating], 200);
        }catch(\Exception $e){
            return response()->json(['error' => 'Error al guardar la calificación:'. $e->getMessage()], 500);
        }
    }

    public function getAverageRating($id_story)
    {
        try{
            $average = $this->ratingService->getAverageRating($id_story);
            return response()->json(['message' => 'calificación promedio', 'data' => $average], 200);
        }catch(\Exception $e){
            return response()->json(['error' => 'Error al obtener la calificación promedio:'. $e->getMessage()], 500);
        }
    }

    public function destroy($id_story)
    {
        $user = Auth::user();

        try {
            $deleted = $this->ratingService->deleteRating($user->id_user, $id_story);

            if (!$deleted) {
                return response()->json(['message' => 'No se encontró la calificación'], 404);
            }

            return response()->json(['message' => 'calificación eliminada', 'data' => $deleted], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al eliminar la calificación:'. $e->getMessage()], 500);
        }
    }
   
}
