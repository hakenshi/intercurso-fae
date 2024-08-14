<?php

namespace App\Http\Controllers;

use App\Http\Requests\CadastroRequest;
use App\Http\Requests\LoginRequest;
use App\Models\Termo;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{

    private function evalResponse($response): bool
    {
        return $response == "Sim" ? $response = 1 : $response = 0;
    }

    public function cadastro(CadastroRequest $request)
    {
        DB::beginTransaction();
        try {

            $data = $request->validated();

            $userInfo = collect($data)->except(['questionario'])->toArray();
            $questionarioInfo = collect($data)->only(['questionario'])->toArray();
            $data['senha'] = bcrypt($request->senha);

            $user = User::create($userInfo);

            $token = $user->createToken('ACCESS_TOKEN')->plainTextToken;

            if ($user) {
                $questionario = [
                    'id_usuario' => $user->id,
                    'dor_no_peito' => $this->evalResponse($questionarioInfo['questionario']['question1']),
                    'problema_cardiacao' => $this->evalResponse($questionarioInfo['questionario']['question2']),
                    'dor_no_peito_ultimo_mes' => $this->evalResponse($questionarioInfo['questionario']['question3']),
                    'desequilibrio_tontura' => $this->evalResponse($questionarioInfo['questionario']['question4']),
                    'problema_osseo_articular' => $this->evalResponse($questionarioInfo['questionario']['question5']),
                    'outra_condicao' => $this->evalResponse($questionarioInfo['questionario']['question6']),
                    'medicamento_pressao_cardiaco' => $this->evalResponse($questionarioInfo['questionario']['question7']),
                    'assinatura' => (string)Str::uuid(),
                    'accept_responsability' => $questionarioInfo['questionario']['accept_responsibility'] ? $questionarioInfo['questionario']['accept_responsibility'] = 1 : $questionarioInfo['questionario']['accept_responsibility'] = 0,
                ];

                $termo = Termo::create($questionario);
                DB::commit();
                return response(compact('user', 'token'));
            }

        } catch (\Throwable $e) {
            DB::rollBack();

            return response()->json([
                'msg' => "Alg deu errado",
                'error' => $e->getMessage(),
            ], 502);
        }
    }

    public function login(LoginRequest $request)
    {
        $data = $request->validated();

        $user = User::where('email', $data['email'])->first();

        if (!$user) return response(['msg' => 'Usuário não encontrado'], 401);

        if (!$user || !Hash::check($request->senha, $user->senha)) {
            return response([
                'msg' => 'Email ou senha incorretos'
            ], 422);
        };

        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));
    }

    public function logout(Request $request)
    {

        $user = $request->user();
        $user->currentAccessToken()->delete();

        return response('', 204);
    }
}
