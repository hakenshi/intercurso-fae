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
        'telefone' =>[
            'nullable',
            'max: 11',
        ],
        'email' => [
            'required',
            'email', 
            Rule::unique('usuarios')->ignore($this->route('id'))->where(function ($query) {
                return $query->where('id', $this->id); 
            }),
        ],
        'ra' =>[
            'required',
            Rule::unique('usuarios')->ignore($this->route('id'))->where(function($query){
                return $query->where('id', $this->id);
            }),
        ],
        'tipo_usuario' =>[
            'required'
        ]
       ];
        return $rules;
    }
}
