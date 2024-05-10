<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UsuariosResource extends JsonResource
{

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'curso' => [
                'id_curso' => $this->id_curso,
                'nome_curso' => $this->curso->nome_curso,
                'descricao' => $this->curso->descricao,
            ],
            'usuario' => [
                'id' => $this->id,
                'nome' => $this->nome,
                'email' => $this->email,
                'ra' => $this->ra,
                'tipo_usuario' => $this->tipo_usuario,
                'telefone' => $this->telefone,
                // 'data_criacao' => Carbon::make($this->created_at)->format('Y-m-d')
            ],
        ];
    }
}
