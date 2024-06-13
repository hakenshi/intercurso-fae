<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PlacarResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        return [
            'id_placar' => $this->id,
            'placar_time_1' => $this->placar_time_1,
            'placar_time_2' => $this->placar_time_2,
            'time_vencendor' =>
            $this->id_time_vencedor ?
                [
                    "id" => $this->time->id,
                    "nome" => $this->time->nome,
                ] : null,
        ];
    }
}
