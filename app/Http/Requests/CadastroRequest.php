<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CadastroRequest extends FormRequest
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
        $rules = [
            'id_curso' => 'required',
            'nome' => [
                'required',
                'string',
                'min: 3',
                'max: 255',
            ],
            'email' =>[
                'required',
                'email',
                'max:255',
                'unique:usuarios,email'
            ],
            'senha' => [
                'required',
                'min:3',
                'max:100'
            ],
            'ra' =>[
                'required',
                'unique:usuarios,ra',
                'max:10'
            ],
            'tipo_usuario' => [
                'required'
            ]
            ];

        return $rules;
    }
}
