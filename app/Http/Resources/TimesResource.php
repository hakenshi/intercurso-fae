<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TimesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'time' => [
                'id' => $this->id,
                'nome' => $this->nome,
                'status' => $this->status,
            ],
            'modalidade' => [
                'id_modalidade' => $this->modalidade->id,
                'nome_modalidade' => $this->modalidade->nome,
            ],
            'usuario' => [
                'id_responsavel' => $this->id_responsavel ? $this->id_responsavel : "",
                "nome_responsavel" => $this->id_responsavel != null ? $this->usuario->nome : "Sem responsavel",
            ],
            'informacoes' => [
                'jogadores' => $this->jogadores->map(fn($jogador) => [
                    'id' => $jogador->id,
                    'id_usuario' => $jogador->id_usuario,
                    'foto_perfil' => $jogador->usuario->foto_perfil,
                    'id_time' => $jogador->id_time,
                    'nome' => $jogador->usuario->nome,
                    'email' => $jogador->usuario->email,
                    'ra' => $jogador->usuario->ra,
                    'status' => $jogador->status,
                ]),
                'quantidade' => $this->jogadores->count(),
            ]
        ];
    }
}
