<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TermosResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'termos' => [
                'id' => $this->id,
                'dor_no_peito' => $this->dor_no_peito,
                'dor_no_peito_ultimo_mes' => $this->dor_no_peito_ultimo_mes,
                'problema_cardiacao' => $this->problema_cardiacao,
                'desequilibrio_tontura' => $this->desequilibrio_tontura,
                'problema_osseo_articular' => $this->problema_osseo_articular,
                'outra_condicao' => $this->outra_condicao,
                'medicamento_pressao_cardiaco' => $this->medicamento_pressao_cardiaco,
                'assinatura' => $this->assinatura,
                'accept_responsability' => $this->accept_responsability,
                'created_at' => $this->created_at,
            ],
        ];
    }
}
