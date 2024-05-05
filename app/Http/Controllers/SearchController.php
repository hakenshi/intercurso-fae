<?php

namespace App\Http\Controllers;

use App\Models\Jogador;
use App\Models\User;
use Illuminate\Http\Request;

use function Laravel\Prompts\search;

class SearchController extends Controller
{
    public function search($data, $results){


        // dd($data, $results);

          if(empty($data)){
          return response()->json([]);
        }
        
        return response()->json($results);
    }
    
     public function responsaveis(Request $reqeust){
        $data = $reqeust->input('value');

        $results = User::where("tipo_usuario", 2)
        ->where('nome', "LIKE", "%".$data."%")
        ->get();
        
       return $this->search($data, $results);
        
     }
     
     public function jogadores(Request $request){
        $data = $request->input('value');
        $jogadores = Jogador::join('usuarios', "jogadores.id_usuario", "=", "usuarios.id")
        ->where("usuarios.ra", 'like', '%'.$data.'%')
        ->get();
        // dd($jogadores);
        return $this->search($data, $jogadores);
     }
     
}
