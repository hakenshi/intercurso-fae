<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class JogosRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {

        $user = Auth::user();

        if($user->tipo_usuario == "1"){
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
        return [
            [
                'id_fase' => 'required',
                'id_jogo_em_espera' => 'sometimes',
                'id_modalidade' => 'required',
                'id_time_1' => 'required',
                'id_time_2' => 'required',
                'data_jogo' => 'required',
                'local' => 'required|string',
                'status' => 'required'
            ]
        ];
    }
}
