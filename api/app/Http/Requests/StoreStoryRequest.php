<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'sinopsis' => 'required|string|max:500',
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif',
            'state' => 'required|string|in:draft,published',
            'categories' => 'required|array',
            'categories.*' => 'exists:categories,id_category',
        ];
    }
}
