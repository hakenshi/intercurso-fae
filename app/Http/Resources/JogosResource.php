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
                    'id' => $this->time1->id ?? "",
                    "nome" => $this->time1->nome ?? "Sem time",
                    'image' => $this->time1->foto_time ?? "",
                ],
                'time2' => [
                    'id' => $this->time2->id ?? "",
                    "nome" => $this->time2->nome ?? "Sem time",
                    'image' => $this->time2->foto_time ?? "",
                ]
            ],
            'placar' => new PlacarResource($this->placar),
            'modalidade' => new ModalidadesResource($this->modalidade),
            'jogo' => [
                'id' => $this->id,
                'data_jogo' => $this->data_jogo ? Carbon::make($this->data_jogo)->format('d/m/Y') : "Sem data definada",
                'hora_jogo' => $this->data_jogo ? Carbon::make($this->data_jogo)->format('H:i') : "Sem hora definida",
                'status' => $this->status,
                'local' => $this->local ?? "A definir",
            ]
        ];
    }
}
