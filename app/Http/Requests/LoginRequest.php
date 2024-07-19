<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
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

    public function messages()
    {
        return [
            'email.required' => "Por favor insira um email",
            'email.email' => "Por favor insira um email válido",
            'email.exists' => "O email fornecido não existe",
            'senha.required' => "Por favor Insira uma senha"
        ];
    }

    public function rules(): array
    {
        return [
            'email' => 'required|email|exists:usuarios,email',
            'senha' => 'required',
        ];
    }
}
