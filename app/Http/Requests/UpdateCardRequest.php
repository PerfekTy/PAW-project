<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCardRequest extends FormRequest
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
    public function rules()
    {
        return [
            'fullname' => 'required|string',
            'cardnumber' => 'required|string|max:19|unique:users_cards,cardnumber',
            'expiration' => 'required|string',
            'securecode' => 'required|string',
        ];
    }
}