<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;

class CategoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Categoria::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $categoria = Categoria::create($request->all());

        return response()->json($categoria);
    }

    /**
     * Display the specified resource.
     */
    public function show(Categoria $categorium)
    {
        return response()->json($categorium);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Categoria $categorium)
    {
       $categoria =  $categorium->update($request->all());

        return response()->json($categoria);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Categoria $categorium)
    {
       $categoria = $categorium->delete();

       return response()->json($categoria);
    }
}
