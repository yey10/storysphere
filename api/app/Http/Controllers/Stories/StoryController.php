<?php

namespace App\Http\Controllers\Stories;

use App\Models\Story;
use App\Models\User;
use App\Http\Requests\StoreStoryRequest;
use App\Http\Requests\UpdateStoryRequest;
use App\Services\Stories\StoryService;
use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\Auth;



class StoryController extends Controller
{
    protected $storyService;

    public function __construct(StoryService $storyService)
    {
        $this->storyService = $storyService;
    }

    //método para obtener todas las historias
    public function index()
    {
        try {
            $stories = $this->storyService->getAllStories();
            return response()->json($stories);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error inesperado: ' . $e->getMessage()], 500);
        }
    }


    //método para crear nueva historia
    public function store(StoreStoryRequest $request)
    {
        // Validar los datos de la historia
        try {
            $story = $this->storyService->createStory($request->validated());
            return response()->json(['message' => 'Historia creada con éxito', 'story' => $story], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error inesperado: ' . $e->getMessage()], 500);
        }
    }


    //método para obtener una historia especifica
    public function show($id)
    {
        try {
            $story = $this->storyService->getById($id);
            return response()->json($story);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Historia no encontrada'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error inesperado: ' . $e->getMessage()], 500);
        }
    }


    public function update(UpdateStoryRequest $request, Story $story)
    {
        try {
            $story = $this->storyService->updateStory($story, $request->validated());
            return response()->json(['message' => 'Historia actualizada con éxito', 'story' => $story], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error inesperado: ' . $e->getMessage()], 500);
        }
    }

    public function destroy(Story $story)
    {
        try {
            $this->storyService->deleteStory($story);
            return response()->json(['message' => 'Historia eliminada con éxito'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error inesperado: ' . $e->getMessage()], 500);
        }
    }

    //MÉTODOS ADICIONALES


    //obtener las historias que pertenezcan a un usuario

    public function getUserStories(User  $user){
        try{

            $stories = $this->storyService->getUserStories($user);
            return response()->json(['stories' => $stories], 200);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Error inesperado: ' . $e->getMessage()], 500);
        }
    }

    //obtener el dueño de una historia

    public function getStoryOwner($id){

        try{
            $owner = $this->storyService->getStoryOwner($id);
            return response()->json(['owner' => $owner], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error inesperado: ' . $e->getMessage()], 500);
        }
    }


}
