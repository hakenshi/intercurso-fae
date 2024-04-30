<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUpdateUsuariosRequest;
use App\Http\Resources\UsuarioResponsavelResource;
use App\Http\Resources\UsuariosResource;

use App\Models\User as ModelsUser;

use Illuminate\Foundation\Auth\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = ModelsUser::paginate(6);

        return UsuariosResource::collection($user);
    }
    public function indexResponsaveis()
    {
        $user = ModelsUser::where("tipo_usuario", 2)->paginate(6);

        return UsuariosResource::collection($user);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUpdateUsuariosRequest $request)
    {   

        // dd($request);

        $data = $request->validated();
        // dd($data);
        
        $data['senha'] = bcrypt($request->password);
        
        $user = ModelsUser::create($data);
        
        return new UsuariosResource($user);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = ModelsUser::findOrFail($id);

        return new UsuariosResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreUpdateUsuariosRequest $request, string $id)
    {
        // dd($request);
        
        $data = $request->validated();
        $user = ModelsUser::findOrFail($id);

        if(!empty($data['senha'])) $data['senha'] = bcrypt($request->password);

        if(!empty($data['email'])) $data['email'] = $request->email;

        if(!empty($data['ra'])) $data['ra'] = $request->ra;

        $user->update($data);

        return new UsuariosResource($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = ModelsUser::findOrFail($id);
        $user->delete();
        return new UsuariosResource($user);
    }

    
    public function responsaveis(Request $request){
      $data = $request->input('value');

      if(empty($data)){
        return response()->json([]);
      }

      $results = ModelsUser::where("tipo_usuario", 2)
      ->where('nome', "LIKE", "%".$data."%")
      ->get();

      return response()->json($results);
    }

}
