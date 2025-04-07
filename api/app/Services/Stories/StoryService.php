<?php

namespace App\Services\Stories;

use App\Models\Story;
use App\Models\User;
use Cloudinary\Api\Upload\UploadApi;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class StoryService
{
    public function getAllStories()
    {
        return Story::with([
            'user:id_user,name',
            'categories:id_category,category_name'
        ])
        ->select('id_story', 'title', 'sinopsis', 'photo', 'state', 'id_user')
        ->latest('id_story')
        ->get();
    }

    public function getStorySummaries($limit = 10)
    {
        return Story::with('user:id_user,name')
            ->select('id_story', 'title', 'sinopsis', 'photo', 'id_user')
            ->latest('id_story')
            ->limit($limit)
            ->get();
    }

    public function createStory($data)
    {
        $user = Auth::user();
        if (!$user) {
            throw new \Exception('Debes estar autenticado para crear una historia');
        }

        return DB::transaction(function () use ($data, $user) {
            $photo = isset($data['photo']) ? $this->uploadStoryPhoto($data['photo']) : null;

            $story = Story::create([
                'title' => $data['title'],
                'content' => $data['content'],
                'sinopsis' => $data['sinopsis'],
                'photo' => $photo,
                'state' => $data['state'],
                'id_user' => $user->id_user,
            ]);

            $story->categories()->sync($data['categories'] ?? []);

            return $story->load('user:id_user,name', 'categories:id_category,name');
        });
    }

    public function getById($id)
    {
        return Story::with([
            'user:id_user,name',
            'categories:id_category,category_name'
        ])->findOrFail($id);
    }

    public function updateStory(Story $story, $data)
    {
        $story->update($data);

        if (isset($data['categories'])) {
            $story->categories()->sync($data['categories']);
        } else {
            $story->categories()->detach();
        }

        return $story->load('user:id_user,name', 'categories:id_category,name');
    }

    public function updateStoryStatus($admin, $id, $data)
    {
        $adminRole = $admin->roles->first();

        if (!$adminRole || $adminRole->id_rol !== 2) {
            throw new \Exception('No tienes permiso para actualizar el estado de los usuarios');
        }

        $validator = Validator::make($data, [
            'state' => 'required|in:active,inactive',
        ]);

        if ($validator->fails()) {
            throw new \Illuminate\Validation\ValidationException($validator);
        }

        $story = Story::findOrFail($id);
        $story->update(['state' => $validator->validated()['state']]);

        return $story;
    }

    public function deleteStory(Story $story)
    {
        // Opcional: eliminar imagen local si la tienes guardada en disco
        if ($story->photo && !Str::startsWith($story->photo, ['http', 'https'])) {
            Storage::delete($story->photo);
        }

        // Opcional: eliminar imagen de Cloudinary si quieres
        // $this->deleteFromCloudinary($story->photo);

        $story->delete();
        return $story;
    }

    public function getUserStories(User $user)
    {
        return $user->stories()
            ->select('id_story', 'title', 'sinopsis', 'photo', 'state')
            ->with('categories:id_category,name')
            ->latest('id_story')
            ->get();
    }

    public function getStoryOwner($id)
    {
        $story = Story::with('user:id_user,name')->findOrFail($id);
        return $story->user;
    }

    private function uploadStoryPhoto($file): ?string
    {
        if (is_string($file) && Str::startsWith($file, ['http', 'https'])) {
            return $file;
        }

        if ($file instanceof \Illuminate\Http\UploadedFile && $file->isValid()) {
            $cloudinary = new UploadApi();
            $uploaded = $cloudinary->upload($file->getRealPath(), ['folder' => 'stories_photos']);
            return $uploaded['secure_url'] ?? null;
        }

        return null;
    }

    // (Opcional) Si deseas borrar también la imagen en Cloudinary
    /*
    private function deleteFromCloudinary(string $url)
    {
        $publicId = $this->extractPublicIdFromCloudinaryUrl($url);
        if ($publicId) {
            (new UploadApi())->destroy($publicId);
        }
    }

    private function extractPublicIdFromCloudinaryUrl(string $url): ?string
    {
        // lógica para extraer el public_id desde la URL si necesitas borrarla
        return null;
    }
    */
}
