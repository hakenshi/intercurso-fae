<?php

namespace App\Http\Controllers;

use App\Http\Resources\PlacarResource;
use App\Models\Jogo;
use App\Models\Placar;
use Illuminate\Http\Request;

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
    public static function update(Placar $placar, Request $request){
        $data = $request->all();
        $jogo = Jogo::where("id_placar", $placar->id)->first();

        if($jogo->status == 1 && isset($data['id_time_vencedor'])){
            $jogo->status = 0;
            $jogo->save();
        }

        $placar->update($data);
        return new PlacarResource($placar);
    }
}
