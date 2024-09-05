<?php

namespace App\Http\Resources;

use App\Models\Jogo;
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
                    'jogadores' => $this->time1?->jogadores
                        ->map(fn($jogador) => [
                            'id' => $jogador->id,
                            'foto_perfil' => $jogador->usuario->foto_perfil,
                            'nome' => $jogador->usuario->nome,
                            'email' => $jogador->usuario->email,
                            'ra' => $jogador->usuario->ra,
                            'status' => $jogador->status == "0"
                                ? "Pendente"
                                : ($jogador->status == "1"
                                    ? "Ativo"
                                    : "Negado"),
                        ]),
                ],
                'time2' => [
                    'id' => $this->time2->id ?? "",
                    "nome" => $this->time2->nome ?? "Sem time",
                    'image' => $this->time2->foto_time ?? "",
                    'jogadores' => $this->time2?->jogadores->map(fn($jogador) => [
                        'id' => $jogador->id,
                        'foto_perfil' => $jogador->usuario->foto_perfil,
                        'nome' => $jogador->usuario->nome,
                        'email' => $jogador->usuario->email,
                        'ra' => $jogador->usuario->ra,
                        'status' => $jogador->status == "0"
                            ? "Pendente"
                            : ($jogador->status == "1"
                                ? "Ativo"
                                : "Negado"),
                    ]),
                ],
            ],
            'placar' => [
                'placar_time_1' => $this->placar_time_1 ?? "",
                'placar_time_2' => $this->placar_time_2 ?? "",
                'time_vencedor' => [
                    'id' => $this->timeVencedor->id ?? "",
                    'nome' => $this->timeVencedor->nome ?? 'Não há time vencedor',
                ],
            ],
            'modalidade' => new ModalidadesResource($this->modalidade),
            'jogo' => [
                'id' => $this->id,
                'fase' => [
                    'id' => $this->fase->id,
                    'nome' => $this->fase->nome ?? '',
                ],
                'id_proximo_jogo' => $this->id_proximo_jogo,
                'data_jogo' => $this->data_jogo ? Carbon::make($this->data_jogo)->format('d/m/Y') : "Sem data definada",
                'hora_jogo' => $this->data_jogo ? Carbon::make($this->data_jogo)->format('H:i') : "Sem hora definida",
                'status' => $this->status,
                'local' => $this->local ?? "A definir",
                'likes' => [
                    'likes_time_1' => $this->likes_time_1,
                    'likes_time_2' => $this->likes_time_2,
                ],
            ]
        ];
    }
}
