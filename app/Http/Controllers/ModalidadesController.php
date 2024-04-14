<?php

namespace App\Http\Controllers;

use App\Http\Requests\ModalidadesRequest;
use App\Http\Requests\StoreUpdateModalidadesRequest;
use App\Http\Resources\ModalidadesResource;
use App\Models\Modalidade;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class ModalidadesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $modadidade = Modalidade::all();

        return ModalidadesResource::collection($modadidade);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUpdateModalidadesRequest $request){
        // dd($request);

        $data = $request->validated();
        
        $modalidade = Modalidade::create($data);
        
        return new ModalidadesResource($modalidade);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $modalidade = Modalidade::findOrFail($id);

        return new ModalidadesResource($modalidade);
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreUpdateModalidadesRequest $request, string $id)
    {
        $data = $request->validated();

        $modalidade = Modalidade::findOrFail($id);

        $modalidade->update($data);

        return new ModalidadesResource($modalidade);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $modalidade = Modalidade::findOrFail($id);
        
        $modalidade->delete();

        return new ModalidadesResource($modalidade);
    }
}
