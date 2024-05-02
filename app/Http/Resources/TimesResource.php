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
            'id' => $this->id,
            'nome' => $this->nome,
            'status' =>$this->status == 0 ? "Ativo" : "Inativo",
            'modalidade' => [
               'id_modalidade' => $this->modalidade->id,
               'nome_modalidade' => $this->modalidade->nome,
            ],
            'usuario' => [
                'id_responsavel' => $this->id_responsavel,
                "nome_responsavel" => $this->usuario->nome,
            ],
            'informacoes' => [
                'jogadores' => $this->jogadores->map(fn($jogador) => [
                    'id' => $jogador->id_usuario,
                    'nome' => $jogador->usuario->nome,
                    'email' => $jogador->usuario->email,
                    'ra' => $jogador->usuario->ra,
                    'id_time' => $jogador->id_time,
                ]),
                'quantidade' => $this->jogadores->count(),
            ]            
        ];
    }
}
