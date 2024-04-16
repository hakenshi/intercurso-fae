<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUpdateUsuariosRequest extends FormRequest
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
        'telefone' =>[
            'required',
            'min:6',
            'max:14'
        ],
        'ra' =>[
            'required',
            'unique:usuarios,ra',
            'max:10'
        ],
        
       ];

       if($this->method() === 'PATCH'){
        $rules['senha'] =[
            'nullable',
            'min:6',
            'max:100'
        ];
        $rules['email'] = [
            'required',
            'email',
            'max:255',
            Rule::unique('usuarios')->ignore($this->id),
        ];
        $rules['ra'] = [
            'required',
            'max:10',
            Rule::unique('usuarios')->ignore($this->id),
        ];
       }

        return $rules;
    }
}
