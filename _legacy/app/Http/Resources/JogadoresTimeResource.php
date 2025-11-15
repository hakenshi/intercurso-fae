<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JogadoresTimeResource extends JsonResource
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
                    'id' => $this->time->id,
                    'foto_time' => $this->time->foto_time,
                    'nome' => $this->time->nome,
                    'modalidade' => $this->time->modalidade->nome,
                    'responsavel' => $this->time->usuario->nome,
                    'quantidade_jogadores' => $this->time->count(),
                    'jogadores' => [
                        $this->time->jogadores->map(fn($jogador) => [
                            'id' => $jogador->id,
                            'foto_perfil' => $jogador->usuario->foto_perfil,
                            'nome' => $jogador->usuario->nome,
                            'email' => $jogador->usuario->email,
                            'ra' => $jogador->usuario->ra,
                        ])
                    ]
                ],
                'id' => $this->id,
                'status' => $this->status,
            ];
    }
}
