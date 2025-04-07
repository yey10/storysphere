<?php

namespace App\Http\Controllers\Interactions;

use App\Http\Controllers\Controller;
use App\Services\Interactions\RatingService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RatingController extends Controller
{
    protected $ratingService;

    public function __construct(RatingService $ratingService)
    {
        $this->ratingService = $ratingService;
    }

    public function getUserRating(Request $request, $id_story): JsonResponse
    {
        $userId = $request->user()->id_user;

        try {
            $rating = $this->ratingService->getUserRating($userId, $id_story);
            return response()->json(['data' => $rating], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al obtener la calificación del usuario: ' . $e->getMessage()], 500);
        }
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'id_story' => 'required|exists:stories,id_story',
            'rating' => 'required|numeric|min:1|max:5',
        ]);

        $userId = $request->user()->id_user;

        try {
            $rating = $this->ratingService->addOrUpdateRating($userId, $request->id_story, $request->rating);
            return response()->json(['message' => 'Calificación guardada.', 'data' => $rating], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al guardar la calificación: ' . $e->getMessage()], 500);
        }
    }

    public function getAverageRating($id_story): JsonResponse
    {
        try {
            $average = $this->ratingService->getAverageRating($id_story);
            return response()->json(['message' => 'Calificación promedio.', 'data' => $average], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al obtener la calificación promedio: ' . $e->getMessage()], 500);
        }
    }

    public function destroy(Request $request, $id_story): JsonResponse
    {
        $userId = $request->user()->id_user;

        try {
            $deleted = $this->ratingService->deleteRating($userId, $id_story);

            if (!$deleted) {
                return response()->json(['message' => 'No se encontró la calificación.'], 404);
            }

            return response()->json(['message' => 'Calificación eliminada.'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al eliminar la calificación: ' . $e->getMessage()], 500);
        }
    }
}
