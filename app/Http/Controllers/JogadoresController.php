<?php

namespace App\Http\Controllers;

use App\Http\Requests\JogadoresRequest;
use App\Http\Resources\JogadoresResource;
use App\Http\Resources\TimeJogadoresResource;
use App\Http\Resources\TimeJogadorResource;
use App\Http\Resources\UsuariosResource;
use App\Models\Jogador;
use App\Models\Notificacao;
use App\Models\Time;
use App\Models\User;
use Illuminate\Http\Request;
use League\CommonMark\Extension\CommonMark\Node\Inline\Strong;

class JogadoresController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jogadores = Jogador::all();
        return JogadoresResource::collection($jogadores);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $jogadores = $request->all();
        $novosJogadores = [];        
        foreach ($jogadores as $jogador) {

            $idUsuario = $jogador['id_usuario'];
            $idTime = $jogador['id_time'];
            $status = $jogador['status'];
            $exists = Jogador::where('id_time', $idTime)
                ->where('id_usuario', $idUsuario)
                ->exists();

            if ($exists) {
                continue;
            }

            $data = [
                'id_usuario' => $idUsuario,
                'id_time' => $idTime,
                'status' => $status
            ];

            $novoJogador =  Jogador::create($data);

            Notificacao::criarNotificacao($idUsuario, "Você foi adicionado a um time!", 1);

            $novosJogadores[] = $novoJogador->id;
        }

        $jogadores = Jogador::whereIn('id', $novosJogadores)->get();

        return JogadoresResource::collection($jogadores);
    }

    public function show(string $id)
    {
        $jogadores = Jogador::findOrFail($id);
        return new JogadoresResource($jogadores);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

        $data = $request->all();

        $jogadores = Jogador::findOrFail($id);

        $jogadores->update($data);

        return new JogadoresResource($jogadores);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $jogador = Jogador::findOrFail($id);
        $jogador->delete();

        return new JogadoresResource($jogador);
    }

    public function expulsarJogador(string $id)
    {
        $jogador = Jogador::findOrFail($id);

        $jogador->id_time = null;
        $jogador->status = '0';

        $jogador->delete();

        return new TimeJogadorResource($jogador);
    }
}
