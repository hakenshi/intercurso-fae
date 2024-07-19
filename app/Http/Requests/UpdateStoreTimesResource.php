<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateStoreTimesResource extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {

        $user = Auth::user();

        if($user->tipo_usuario == "1" || $user->tipo_usuario == "2"){
            return true;
        }


        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'id_modalidade' => 'required',
            'id_responsavel' => 'required',
            'nome' => [
                'required',
                'min:3',
                'max:255',
                'unique:times,nome'
            ],
            'stauts' => 'boolean',
        ];

        if ($this->method() === "PATCH") {
            $rules['id_modalidade'] = [
                'required',
                Rule::unique("time")->ignore($this->id)
            ];

            $rules['id_responsavel'] = [
                'required',
                Rule::unique("time")->ignore($this->id)
            ];
            $rules['nome'] = [
                'required',
                'min:3',
                'max:255',
                Rule::unique("time")->ignore($this->id)
            ];
        }

        return $rules;
    }
}
