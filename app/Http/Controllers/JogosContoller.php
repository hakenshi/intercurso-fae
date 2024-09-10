<?php

namespace App\Http\Controllers;

use App\Exports\TimesExport;
use App\Http\Resources\JogosResource;
use App\Models\Jogo;
use App\Models\Time;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;

class JogosContoller extends Controller
{
    public function indexPaginate(string $id)
    {
        if ($id == 0){
        return JogosResource::collection(Jogo::paginate(6));
        }
        return  JogosResource::collection(Jogo::where('id_modalidade', $id)->paginate(6));
    }

    /**
     * Store a newly created resource in storage.
     */

    public function index()
    {
        return JogosResource::collection(Jogo::whereNotNull('id_time_1')
            ->whereNotNull('id_time_2')
            ->orderBy('status', 'desc')->get());
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
                'id_fase' => 'required',
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

            $jogos = Jogo::create($data);

            DB::commit();
            return new JogosResource($jogos);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function storeMany(Request $request)
    {
        $id_modalidade = $request->id_modalidade;

        $teams = Time::where('id_modalidade', $id_modalidade)->where('status', '1')->get('id')->toArray();

        $organizedMatches = Jogo::organizeMatches(array_column($teams, 'id'));

        $this->storeMachesAndLink($organizedMatches, $id_modalidade);

    }

    private function storeMachesAndLink($organizedMatches, $id_modalidade)
    {
        $faseJogos = [];

        foreach ($organizedMatches as $id_fase => $matches){
            foreach ($matches as $match){

                $jogo = Jogo::create([
                    'id_fase' => $id_fase,
                    'id_time_1' => $match['time1'],
                    'id_time_2' => $match['time2'],
                    'id_time_vencedor' => null,
                    'id_proximo_jogo' => null,
                    'id_modalidade' => $id_modalidade,
                    'data_jogo' => null,
                    'local' => null,
                    'status' => "1",
                ]);
                $faseJogos[$id_fase][] = $jogo->id;
            }
        }
        $this->linkMatches($faseJogos, $id_modalidade);
    }

    private function linkMatches($faseJogos, $id_modalidade)
    {
        $allMatchIds = Jogo::where('id_modalidade', $id_modalidade)->where('id_proximo_jogo', null)->where('status', '1')->pluck('id')->toArray();

        foreach ($allMatchIds as $jogoId) {
            $jogo = Jogo::find($jogoId);

            $jogosProximaFase = Jogo::where('id_fase', ">", $jogo->id_fase)
                ->where(function ($query) {
                    $query->whereNull('id_time_1')
                        ->orWhereNull('id_time_2');
                })
                ->whereNotIn('id', function ($query){
                    $query->select('id_proximo_jogo')
                    ->from('jogos')
                    ->groupBy('id_proximo_jogo')
                    ->havingRaw("COUNT(id_proximo_jogo) >= 2");
                })
                ->first();

            if ($jogosProximaFase) {
                 if (in_array($jogo->id, $allMatchIds)) {
                    Jogo::where('id', $jogoId)->update(['id_proximo_jogo' => $jogosProximaFase->id]);
                } else {
                    Jogo::where('id', $jogoId)->update(['id_proximo_jogo' => null]);
                }
            }
        }

        $lastGameId = end($allMatchIds);
        Jogo::where('id', $lastGameId)->update(['id_proximo_jogo' => null]);

    }

    public function show(string $id)
    {
        $jogo = Jogo::where('id_modalidade', $id)->paginate(6);

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



    public function destroy(Jogo $jogo)
    {
        if ($jogo->placar) {
            $jogo->placar->delete();
        }
        $jogo->delete();
        return new JogosResource($jogo);
    }

    public function export(Request $request)
    {

        $data = $request->all();

        dd($data);

        return Excel::download(new TimesExport($data), 'jogos.csv', \Maatwebsite\Excel\Excel::CSV, [
            'Content-Type' => 'text/csv',
        ]);
    }

}
