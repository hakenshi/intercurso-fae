<?php

namespace App\Http\Controllers;

use App\Http\Resources\JogadoresResource;
use App\Http\Resources\JogosResource;
use App\Http\Resources\ModalidadesResource;
use App\Http\Resources\PlacarResource;
use App\Models\Jogo;
use App\Models\Modalidade;
use App\Models\Placar;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PhpParser\Node\Expr\New_;

class JogosContoller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function indexPaginate(){

        return JogosResource::collection(Jogo::paginate(6));
    }

    /**
     * Store a newly created resource in storage.
     */

    public function index()
    {

        $jogos = Jogo::orderBy('status', 'desc')->get();

        return JogosResource::collection($jogos);
    }


    private function carbonFormat($date)
    {
        return Carbon::createFromFormat("d/m/Y H:i", $date)->format("Y/m/d H:i:s");
    }

    public function store(Request $request)
    {
        DB::beginTransaction();

        try {
            $data = $request->validate([
                'id_modalidade' => 'required',
                'id_time_1' => 'required',
                'id_time_2' => 'required',
                'data_jogo' => 'required',
                'local' => 'required|string',
                'status' => 'required'
            ]);

            if ($data['id_time_1'] == $data['id_time_2']) {
                return response()->json([
                    'message' => 'Um time não pode enfrentar a si mesmo'
                ]);
            }

            $data['data_jogo'] = $this->carbonFormat($request->data_jogo);

            // $data['data_jogo'] = Carbon::now();

            $jogos = Jogo::create($data);

            $placar = Placar::create([
                'id_jogo' => $jogos->id,
            ]);

            $jogos->id_placar = $placar->id;

            $jogos->save();

            DB::commit();

            return new JogosResource($jogos);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Jogo $jogo)
    {
        return new JogosResource($jogo);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Jogo $jogo)
    {
        $data = $request->all();

        if ($data['id_time_1'] == $data['id_time_2']) {
            return response()->json([
                'message' => 'Um time não pode enfrentar a si mesmo'
            ]);
        }

        $data['data_jogo'] = $this->carbonFormat($request->data_jogo);

        $jogo->update($data);

        return new JogosResource($jogo);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Jogo $jogo)
    {
        if ($jogo->placar) {
            $jogo->placar->delete();
        }
        $jogo->delete();
        return new JogosResource($jogo);
    }
}
