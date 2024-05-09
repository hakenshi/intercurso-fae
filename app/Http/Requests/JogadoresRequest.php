<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class JogadoresRequest extends FormRequest
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
            'array',
            // 'jogadores.*.id_time' => [
            //     'required',
            // ],
            // 'jogadores.*.id_usuario' => [
            //     'required'
            // ],
            // 'jogadores.*.status' => 'required|boolean',
        ];

        return $rules;
    }
}
