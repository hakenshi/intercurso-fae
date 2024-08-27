<?php

namespace App\Http\Controllers;

use App\Mail\ResetPassword;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller
{
    public function sendResetPassword(Request $request){
        try {
            $data = $request->validate([
                'email' => 'required|email',
            ]);

            $user = User::where('email', $request->email)->firstOrFail();

            $data['user'] = $user->nome;

            $data['token'] = strval(rand(100000, 999999));

            $user->password_reset_token = $data['token'];

            $user->update();

            Mail::to($data['email'])->send(new ResetPassword($data));

            return response()->json(["success" => true]);

        }
        catch (ModelNotFoundException $e){
            return response()->json(["error" => 'Usuário não encontrado.']);
        }
        catch (\Exception $e) {
            return response()->json(["error" => $e->getMessage()]);
        }
    }

    public function sendTestEmail()
    {
        $toEmail = 'nyfornaziero@gmail.com'; // Endereço de e-mail para onde o e-mail será enviado

        try {
            Mail::raw('Ta funcionando o envio de email!', function ($message) use ($toEmail) {
                $message->to($toEmail)
                    ->subject('Teste de E-mail');
            });
        }catch (\Exception $e){
            dd($e->getMessage());
        }

//        $user = User::where('email', 'nyfornaziero@gmail.com')->firstOrFail();
//
//        $data['user'] = $user->nome;
//
//        $data['token'] = strval(rand(100000, 999999));
//
//        $user->password_reset_token = $data['token'];
//
//        $user->update();
//
//        try{
//            Mail::to($user->email)->send(new ResetPassword($data));
//
//        } catch (\Exception $e) {
//            // Se houver uma exceção, algo deu errado
//        dd('Falha ao enviar o e-mail: ' . $e->getMessage());
//
//        }
//
//        return response()->json(['message' => 'E-mail de teste enviado com sucesso!']);
    }
    public function resetPassword(Request $request){
        try {

//            dd($request->all());

            $data = $request->validate([
                'password-reset-token' => 'required',
                'senha' => 'required',
                'confirm_senha' => 'required',
            ]);

            $user = User::where("password_reset_token", $data["password-reset-token"])->firstOrFail();

            if ($data['senha'] == $data['confirm_senha']) {
                $data['senha'] = bcrypt($data['senha']);
            }

            $user->password_reset_token = null;

            $user->senha = $data['senha'];

            $user->update();

            return response()->json(["success" => "Senha alterada com sucesso"], 204);
        }
        catch (ModelNotFoundException $e){
            return response()->json(["msg" => "Token inválido"],404);
        }
        catch (\Exception $e){
            return response()->json(["error" => $e->getMessage()],500);
        }
    }

}
