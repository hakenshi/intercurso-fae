<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ModalidadesResource extends JsonResource
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
            'quantidade_participantes' => $this->quantidade_participantes,
            'genero' => $this->genero == 0 ? "Masculino" : "Feminino",
            'criacao' => Carbon::make($this->created_at)->format("d/m/Y, H:i")
        ];
    }
}
