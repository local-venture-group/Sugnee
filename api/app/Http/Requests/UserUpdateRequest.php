<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserUpdateRequest extends FormRequest
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
     * @return array
     */
    public function rules()
    {
        return [
            'first_name' => 'required|string|max:191',

            'last_name' => 'required|string|max:191',
            'email' => 'required|string|max:191|unique:users,email',
            'birth' => 'required|date',
            'gender' => 'integer|digits_between:1,2',

            'first_name_kana' => 'required|string|max:191',
            'last_name_kana' => 'required|string|max:191',
            'last_name' => 'required|string|max:191',
            'email' => 'required|string|max:191|email',
            'birth' => 'date',


        ];
    }
}
