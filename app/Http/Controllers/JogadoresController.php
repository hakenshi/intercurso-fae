<?php

namespace App\Http\Controllers;

use App\Http\Requests\JogadoresRequest;
use App\Http\Resources\JogadoresResource;
use App\Models\Jogador;
use Illuminate\Http\Request;

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
    public function store(JogadoresRequest $request)
    {
        $data = $request->validated();

        $jogadores = Jogador::create($data);
        
        return new JogadoresResource($jogadores);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {   
        $jogadores = Jogador::findOrFail($id);

        // dd($jogadores);

        return new JogadoresResource($jogadores);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(JogadoresRequest $request, string $id)
    {
        $data = $request->validated();

        $jogadores = Jogador::findOrFail($id);

        $jogadores->update($data);

        return new JogadoresResource($jogadores);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $jogadores = Jogador::findOrFail($id);
        $jogadores->delete();
        return new JogadoresResource($jogadores);
    }
    
}
