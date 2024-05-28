<?php

namespace App\Http\Controllers;

use App\Http\Requests\CadastroRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\StoreUpdateUsuariosRequest;
use App\Models\User;
use Dotenv\Exception\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

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
    
        $user = User::where('email', $data['email'])->first();

        if(!$user) return response(['msg' => 'Usuário não encontrado'], 401);

        if(!$user || !Hash::check($request->senha, $user->senha)){
            return response([
                'msg' => 'Email ou senha incorretos'
            ], 422);
        };

        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));

    }  

    public function logout(Request $request){

        $user = $request->user();
        $user->currentAccessToken()->delete();

        return response('', 204);

    }
}
