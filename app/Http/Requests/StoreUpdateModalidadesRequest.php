<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUpdateModalidadesRequest extends FormRequest
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
            'nome' =>'required|min:3|max:255',
            'quantidade_participantes' => "integer",
            'genero' => 'boolean|required',
            'id_categoria' => 'required',
            Rule::unique('modalidades')->where(function($query){
                $query->where('nome', request()->nome)
                ->where('quantidade_participantes', request()->quantidade_participantes)
                ->where('genere', !request()->genero)
                ;
                                
            })
        ]; 


        return $rules;
    }
}
