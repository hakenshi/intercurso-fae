<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateStoreTimesResource;
use App\Http\Resources\ModalidadesResource;
use App\Http\Resources\TimesResource;
use App\Models\Jogador;
use App\Models\Modalidade;
use App\Models\Time;
use Illuminate\Http\Request;

class TimeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $times = Time::all();
        $modalidades = Modalidade::all("nome", "id");
        return [
            'times' => TimesResource::collection($times),
            'modalidades' => $modalidades,
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
        $time = Time::findOrFail($id)
        ;
        return new TimesResource($time);
    }

    /**
     * Update the specified resource in storage.
     */
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
        $jogadores = Jogador::count("id");

        $time = Time::findOrFail($id);

        $time->delete();

        return new TimesResource($time);
    }


}
