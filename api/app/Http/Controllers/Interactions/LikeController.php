<?php

namespace App\Http\Controllers\Interactions;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Interactions\LikeService;
use Illuminate\Http\JsonResponse;

class LikeController extends Controller
{
    protected $likeService;

    public function __construct(LikeService $likeService)
    {
        $this->likeService = $likeService;
    }

    public function toggleInteraction(Request $request, $idStory): JsonResponse
    {
        $idUser = $request->user()->id_user;
        $type = $request->input('interaction_type');

        if (!in_array($type, ['like', 'favorite'])) {
            return response()->json(['message' => 'Tipo de interacción inválido.'], 400);
        }

        try {
            $result = $this->likeService->toggleInteraction($idUser, $idStory, $type);
            return response()->json(['message' => $result['message']], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al procesar la interacción: ' . $e->getMessage()], 500);
        }
    }

    public function getStoryInteractions($idStory): JsonResponse
    {
        try {
            $interactions = $this->likeService->getStoryInteractions($idStory);
            return response()->json(['interactions' => $interactions], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al obtener interacciones: ' . $e->getMessage()], 500);
        }
    }
}
