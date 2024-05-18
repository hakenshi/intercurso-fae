<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUpdateUsuariosRequest;
use App\Http\Resources\UsuariosResource;
use App\Models\Jogador;
use App\Models\Time;
use App\Models\User as ModelsUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
        $data = $request->validated();

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

        $data = $request->validated();
                
        $user = ModelsUser::findOrFail($id);

        if ($request->hasFile('foto_perfil')) {

            if ($user->foto_perfil !== null) {
                Storage::disk('public')->delete($user->foto_perfil);
            }

            $image = $request->file('foto_perfil')->store('profile', 'public');
            $data['foto_perfil'] = $image;
        }

        if (!empty($data['senha'])) $data['senha'] = bcrypt($request->password);

        if (!empty($data['email'])) $data['email'] = $request->email;

        if (!empty($data['ra'])) $data['ra'] = $request->ra;

        $user->update($data);

        return new UsuariosResource($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = ModelsUser::findOrFail($id);        
        $jogador = Jogador::where('id_usuario', $user->id)->first();
        $timeResponsavel = Time::where('id_responsavel', $user->id)->get();
        
        if($timeResponsavel){
           foreach ($timeResponsavel as $responsavel) {
            $responsavel->id_responsavel = null;
            $responsavel->update();
        }
        }

        if($jogador){
            $jogador->delete();
        }

        $user->delete();

        return new UsuariosResource($user);
    }

    public function tornarResponsavel(string $id, Request $request)
    {

        $user = ModelsUser::findOrFail($id);
        $user->tipo_usuario = $request->tipo_usuario;

        $user->update();

        return new UsuariosResource($user);
    }
}
