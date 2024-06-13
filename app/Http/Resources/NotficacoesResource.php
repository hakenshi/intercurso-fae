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
            'notificacao' => $this->mensagem,
            'lida_em' => Carbon::make($this->updated_at)->format('d/m/Y h:i'),
            'tipo_notificacao' => $this->tipo_notificacao,
            'expira_em' => Carbon::make($this->expires_at)->format("d/m/Y h:i"),
        ];
    }
}
