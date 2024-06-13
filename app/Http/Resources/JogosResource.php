<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JogosResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    public function toArray($request): array
    {
        return [
            'times' => [
                'time1' => [
                    'id' => $this->time1->id,
                    "nome" => $this->time1->nome
                ],
                'time2' => [
                    'id' => $this->time2->id,
                    "nome" => $this->time2->nome,
                ]
            ],
            'placar' => new PlacarResource($this->placar),
            'modalidade' => [
                'id' => $this->modalidade->id,
                'nome' => $this->modalidade->nome,
            ],
            'jogo' => [
                'data_jogo' => Carbon::make($this->data_jogo)->format('d/m/Y'),
                'hora_jogo' => Carbon::make($this->data_jogo)->format('H:i'),
                'status' => $this->status,
                'local' => $this->local,
                'id' => $this->id,
            ]
        ];
    }
}
