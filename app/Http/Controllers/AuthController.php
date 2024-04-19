<?php

namespace App\Http\Controllers;

use App\Http\Requests\CadastroRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\StoreUpdateUsuariosRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    public function cadastro(CadastroRequest $request){
        $data = $request->validated();

        $data['senha'] = bcrypt($request->senha);

        $user = User::create($data);

        $token = $user->createToken('ACCESS_TOKEN')->plainTextToken;
        
        return response(compact('user', 'token'));
    }

    public function login(LoginRequest $request){
        $data = $request->validated();
        if(!Auth::attempt($data)){
            return response([
                'message' => 'email ou senha incorreta'
            ]);
        }
        
        $user = Auth::user();
        $user->createToken('ACCESS_TOKEN')->plainTextToken;

        return response(compact('user', 'token'));
    }   

    public function logout(Request $request){

        $user = $request->user();
        $user->currentAccessToken->delete();

        return response('', 204);

    }
}
