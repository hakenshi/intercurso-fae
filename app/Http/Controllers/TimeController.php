<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateStoreTimesResource;
use App\Http\Resources\ModalidadesResource;
use App\Http\Resources\TimesResource;
use App\Models\Jogador;
use App\Models\Modalidade;
use App\Models\Time;
use App\Models\User;
use Illuminate\Http\Request;
use Psy\Command\WhereamiCommand;

class TimeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $times = Time::all();

        $modalidades = Modalidade::all("nome", "id", 'quantidade_participantes');
        $jogadores = User::all('id', 'nome', 'email', 'ra');

        return [
            'times' => TimesResource::collection($times),
            'modalidades' => $modalidades,
            'jogadores' => $jogadores
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UpdateStoreTimesResource $request)
    {
        $data = $request->validated();
        $time = Time::create($data);

        return new TimesResource($time);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $times = Time::where("id_responsavel", $id)->get();
        $modalidades = Modalidade::all("nome", "id", 'quantidade_participantes');
        $jogadores = User::all('id', 'nome', 'email', 'ra');


        return [
            'times' => TimesResource::collection($times),
            'modalidades' => $modalidades,
            'jogadores' => $jogadores
        ];
    }

    public function showTimesUsuario(string $id)
    {
        $times = Time::whereHas('jogadores', function ($query) use ($id) {
            $query->where('id_usuario', $id);
        })->with('jogadores')->get();        
        
        return TimesResource::collection($times);
    }

    public function update(Request $request, string $id)
    {
        $data = $request->all();

        $time = Time::findOrFail($id);

        $time->update($data);

        return new TimesResource($time);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $time = Time::findOrFail($id);

        $time->delete();

        return new TimesResource($time);
    }
}
