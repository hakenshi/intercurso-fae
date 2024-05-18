<?php

namespace App\Http\Controllers;

use App\Http\Resources\UsuariosResource;
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
    
    public function seachResource($data, $results, $Resource)
    {

      if(empty($data)){
        return $Resource::collection([]);
      }
      return $Resource::collection($results);
    }

        
    public function usuarios(Request $request)
    {
     $data = $request->input('value');
     
     $usuarios = User::paginate(6);
     
      if($data){
        $usuarios = User::where("nome", "LIKE", "%".$data."%")->paginate(6);
        return $this->seachResource($data, $usuarios, UsuariosResource::class);
      }
      
    
     return UsuariosResource::collection($usuarios);

    }


     public function responsaveis(Request $request){
        $data = $request->input('value');

        $results = User::where("tipo_usuario", 2)
        ->where('ra', "LIKE", "%".$data."%")
        ->get();
        
       return $this->search($data, $results);
        
     }
     public function jogadores(Request $request){
        $data = $request->input('value');
        $jogadores = User::where('ra', 'LIKE', "%".$data."%")->get();
        // dd($jogadores);
        return $this->search($data, $jogadores);
     }
     
     

}
