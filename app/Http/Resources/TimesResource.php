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
            'modalidade' => [
               'id_modalidade' => $this->modalidade->id,
               'nome_modalidade' => $this->modalidade->nome,
            ],
            'usuario' => [
                'id_responsavel' => $this->id_responsavel,
                "nome_responsavel" => $this->usuario->nome,
            ],
            
            'nome' => $this->nome,
            'status' =>$this->status == 0 ? "Ativo" : "Inatvio",
        ];
    }
}
