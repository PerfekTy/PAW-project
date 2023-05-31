<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>sssss
     */
    public function rules(User $user)
    {
        return [
            'nickname' => 'sometimes|string|max:55',Rule::unique('users')->ignore($user->id),
            'fullname' => 'sometimes|string',
            'email' => 'sometimes|email',Rule::unique('users')->ignore($user->id),
            'password' => [
                'confirmed', 
                'sometimes',
                Password::min(8)
                ->letters()
                ->symbols()
                ]
        ];
    }
}