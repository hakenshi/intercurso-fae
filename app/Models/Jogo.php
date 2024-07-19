<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Validation\ValidationException;

class Jogo extends Model
{
    use HasFactory;

    protected $table = "jogos";

    public $timestamps = false;

    protected $fillable = [
        'id_fase',
        'jogos_em_espera',
        'id_proximo_jogo',
        'id_placar',
        'id_time_1',
        'id_time_2',
        "id_modalidade",
        'data_jogo',
        'local',
        'status',
    ];

    protected $casts = [
        'jogos_em_espera' => 'array',
    ];
    public function placar()
    {
        return $this->hasOne(Placar::class, "id_jogo");
    }

    public function modalidade()
    {
        return $this->hasOne(Modalidade::class, "id", "id_modalidade");
    }

    public function time1()
    {
        return $this->hasOne(Time::class, 'id', 'id_time_1');
    }

    public function time2()
    {
        return $this->hasOne(Time::class, 'id', 'id_time_2');
    }

    public function fase(): BelongsTo
    {
        return $this->belongsTo(Fases::class, 'id_fase');
    }

    public static function gerarPartida($array, $modalidade, $fase)
    {
        // Obter os jogos da fase anterior que ainda não têm um próximo jogo atribuído
        $jogosFaseAnterior = Jogo::where('id_fase', $fase - 1)
            ->whereNull('id_proximo_jogo')
            ->get();

        if ($array) {
            foreach ($array as $item) {
                $jogosFaseAtual = Jogo::where('id_fase', $fase)
                    ->where(function ($query) {
                        $query->whereNull('id_time_1')
                            ->orWhereNull('id_time_2')
                            ->orWhere(function ($query) {
                                $query->whereNotNull('id_time_1')
                                    ->whereNotNull('id_time_2');
                            });
                    })
                    ->get();

                foreach ($jogosFaseAtual as $jogoAtual) {
                    // Verificar e atribuir jogos em espera da fase anterior
                    $jogosEmEspera = json_decode($jogoAtual->jogos_em_espera, true) ?: [];

                    foreach ($jogosFaseAnterior as $jogoAnterior) {
                        // Verificar se o jogo atual pode receber mais jogos em espera
                        if (count($jogosEmEspera) < 2) {
                            $jogosEmEspera[] = $jogoAnterior->id;
                            $jogoAnterior->id_proximo_jogo = $jogoAtual->id;
                            $jogoAnterior->save();

                            // Parar se o jogo atual já tiver dois jogos em espera
                            if (count($jogosEmEspera) >= 2) {
                                break;
                            }
                        }
                    }

                    // Atualizar o jogo atual com os jogos em espera
                    $jogoAtual->jogos_em_espera = json_encode($jogosEmEspera);
                    $jogoAtual->save();
                }

                // Criar um novo jogo para a fase atual com os times fornecidos
                $jogoNovo = Jogo::create([
                    'id_fase' => $fase,
                    'id_time_1' => $item['time1'],
                    'id_time_2' => $item['time2'],
                    'id_modalidade' => $modalidade,
                    'data_jogo' => null,
                    'local' => null,
                    'status' => '1',
                ]);

                $placar = Placar::create([
                    'id_jogo' => $jogoNovo->id,
                ]);

                $jogoNovo->id_placar = $placar->id;
                $jogoNovo->save();

                // Atualizar o jogo novo com os jogos em espera, se houver
                $jogosEmEsperaNovo = [];
                foreach ($jogosFaseAnterior as $jogoAnterior) {
                    if (count($jogosEmEsperaNovo) < 2) {
                        $jogosEmEsperaNovo[] = $jogoAnterior->id;
                        $jogoAnterior->id_proximo_jogo = $jogoNovo->id;
                        $jogoAnterior->save();
                    }
                }
                $jogoNovo->jogos_em_espera = json_encode($jogosEmEsperaNovo);
                $jogoNovo->save();
            }
        }

        return $jogoNovo ?? null;
    }


}
