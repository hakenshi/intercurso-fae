<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TimeJogadorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'usuario' => [
                'id_usuario' => $this->usuario->id,
                'nome_usuario' => $this->usuario->nome,
                'email_usuario' => $this->usuario->email,
                'telefone_usuario' => $this->usuario->telefone,
                'ra_usuario' => $this->usuario->ra,
                'tipo_usuario' => $this->usuario->tipo_usuario
            ],
            'status' => $this->status,
        ];
    }
}
