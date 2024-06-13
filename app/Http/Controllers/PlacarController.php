<?php

namespace App\Http\Controllers;

use App\Http\Resources\PlacarResource;
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
        $placar->update($data);

        return new PlacarResource($placar);
    }
}
