<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NotficacoesResource extends JsonResource
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
            'nome_usuario' => $this->usuario->nome,
            'notificacao' => $this->mensagem,
            'criada_em' => Carbon::make($this->created_at)->format('h:i'),
            'lida_em' => Carbon::make($this->updated_at)->format('h:i'),
        ];
    }
}
