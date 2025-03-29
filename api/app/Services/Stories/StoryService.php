<?php

namespace App\Services\Stories;

use App\Models\Story;
use App\Models\User;
use Cloudinary\Api\Upload\UploadApi;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class StoryService
{
    public function getAllStories()
    {
        $stories = Story::with('user', 'categories')->get();
        return $stories;
    }

    public function createStory($data)
    {
        $user = Auth::user(); 
        if (!$user) {
            throw new \Exception('Debes estar autenticado para crear una historia');
        }

        $photo = isset($data['photo']) ? $this->uploadStoryPhoto($data['photo']) : null;

        $story = Story::create([
            'title' => $data['title'],
            'content' => $data['content'],
            'sinopsis' => $data['sinopsis'],
            'photo' => $photo,
            'state' => $data['state'],
            'id_user' => $user->id_user,
        ]);

        $story->categories()->sync($data['categories']);
        return $story;

    }

    public function getById($id)
    {
        $story = Story::with('user', 'categories')->findOrFail($id);

        
        if ($story->photo && !Str::startsWith($story->photo, ['http', 'https'])) {
            $story->photo = url(Storage::url($story->photo)); 
        }
    
        return $story;
    }

    public function updateStory(Story $story, $data)
    {
        $story->update($data);

        if (isset($data['categories'])) {
            $story->categories()->sync($data['categories']);
        }else{
            $story->categories()->detach();
        }

        return $story;
    }

    public function updateStoryStatus($admin, $id, $data)
    {
        $adminRole = $admin->roles->first();

        if (!$adminRole || $adminRole->id_rol !== 2) {
            throw new \Exception('No tienes permiso para actualizar el estado de los usuarios');
        }

        $story = Story::findOrFail($id);
        $validator = Validator::make($data, [
            'state' => 'required|in:active,inactive',
        ]);
        if ($validator->fails()) {
            throw new \Illuminate\Validation\ValidationException($validator);
        }
        $story->update(['state' => $validator->validated()['state']]);
        return $story;

    }

    public function deleteStory(Story $story)
    {
        $story->delete();
        return $story;
    }

    public function getUserStories(User $user)
    {
        return $user->stories()->with('categories')->get();
    }

    public function getStoryOwner($id)
    {
        $story = Story::with('user')->findOrFail($id);
        return $story->user;
    }

    private function uploadStoryPhoto($file): ?string
    {
        if (!$file || !$file->isValid()) {
            return null;
        }
        $cloudinary = new UploadApi();
        $uploaded = $cloudinary->upload($file->getRealPath(), ['folder' => 'stories_photos']);

        return $uploaded['secure_url'] ?? null;
    }   
}