<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUpdateUsuariosRequest;
use App\Http\Resources\UsuariosResource;

use App\Models\User as ModelsUser;

use Illuminate\Foundation\Auth\User;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = ModelsUser::all();

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

        // dd($user);

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
        $user = User::findOrFail($id);
        $user->delete();
        return new UsuariosResource($user);
    }

    
}
