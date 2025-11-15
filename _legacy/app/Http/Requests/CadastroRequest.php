<?php

namespace App\Http\Requests;

use App\Rules\EmailRule;
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
        return [
            'id_curso' => 'required',
            'nome' => [
                'required',
                'string',
                'min: 3',
                'max: 255',
            ],
            'email' => [
                'required',
                'email',
                new EmailRule(),
                'max:255',
                'unique:usuarios,email'
            ],
            'senha' => [
                'required',
                'min:3',
                'max:100'
            ],
            'ra' => [
                'required',
                'unique:usuarios,ra',
                'max:10'
            ],
            'tipo_usuario' => [
                'required'
            ],
            'questionario' => 'required'
        ];
    }

    public function messages(): array
    {
        return [
            'id_curso.required' => "Por favor, escolha seu curso",
            'nome.required' => 'Por favor, insira seu nome completo',
            'nome.min' => "Por favor, insira um nome que tenha no mínimo 3 letras",
            'nome.max' => "O nome fornecido é grande de mais",
            'email.required' => "Por favor, insira seu email",
            'email.email' => "Por favor insira um email válido",
            'email.max' => "O email fornecido é grande de mais",
            'email.unique' => "Parece que esse email já está sendo utilizado",
            'senha.required' => 'Por favor, insira uma senha',
            'senha.min' => "Por favor, insira uma senha que contenha no mínimo 3 caracteres",
            'senha.max' => "A senha inserida é grande de mais",
            'ra.required' => 'Por favor insira um ra',
            'ra.unique' => "Parece que esse ra já está sendo utilizado",
            'ra.max' => "Esse ra é muito grande, tem certeza de que ele está correto?",
        ];
    }

}
