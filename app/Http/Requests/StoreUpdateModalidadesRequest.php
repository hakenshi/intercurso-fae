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
            'quantidade_participantes' => "nullable",
            'genero' => 'boolean|required',
            Rule::unique('modalidades')->where(fn($query) => $query->where('gernero', request()->genero))
        ]; 


        return $rules;
    }
}
