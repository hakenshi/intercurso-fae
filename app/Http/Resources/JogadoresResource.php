<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JogadoresResource extends JsonResource
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
            'status' => $this->status,
            'usuario' => [
                'id_usuario' => $this->usuario->id,
                'foto_perfil' => $this->usuario->foto_perfil,
                'nome_usuario' => $this->usuario->nome,
                'email_usuario' => $this->usuario->email,
                'telefone_usuario' => $this->usuario->telefone,
                'ra_usuario' => $this->usuario->ra,
                'tipo_usuario' => $this->usuario->tipo_usuario
            ],
            'time' => [
                'id_time' => $this->id_time,
                'nome_time' => $this->time->nome
            ],
        ];
    }
}
