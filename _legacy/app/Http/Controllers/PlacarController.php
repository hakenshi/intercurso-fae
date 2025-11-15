<?php

namespace App\Http\Controllers;

use App\Http\Resources\JogosResource;
use App\Http\Resources\PlacarResource;
use App\Models\Jogo;
use App\Models\Placar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PlacarController extends Controller
{
    public static function gerarPlacar($id)
    {
        $placar = Placar::create([
            'id_jogo' => $id,
            'placar_time_1' => 0,
            'placar_time_2' => 0,
        ]);
        return $placar->id;
    }

    public static function update(Request $request)
    {
        $data = $request->all();
        $jogo = Jogo::findOrFail($data['id_jogo']);

        $proximoJogo = Jogo::where('id', $data['id_proximo_jogo'])->first();

        if ($jogo->status == 1 && isset($data['id_time_vencedor'])) {
            $jogo->id_time_vencedor = $data['id_time_vencedor'];
            $jogo->placar_time_1 = $data['placar_time_1'];
            $jogo->placar_time_2 = $data['placar_time_2'];
            $jogo->status = 0;
            $jogo->save();

        }
        if ($proximoJogo) {
            if(is_null($proximoJogo->id_time_1) && ($proximoJogo->id_time_2 !== $data['id_time_vencedor'])) {
                $proximoJogo->id_time_1 = $data['id_time_vencedor'];
            }
            else if(is_null($proximoJogo->id_time_2) && ($proximoJogo->id_time_1 !== $data['id_time_vencedor'])) {
                $proximoJogo->id_time_2 = $data['id_time_vencedor'];
            }
            $proximoJogo->save();
        }
        return new JogosResource($jogo);
    }
}
