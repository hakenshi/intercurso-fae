<?php

namespace App\Http\Controllers;

use App\Http\Resources\NotficacoesResource;
use App\Models\Notificacao;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificacaoController extends Controller
{
    public function verNotificacao(string $id)
    {
        $notificao = Notificacao::where('id_usuario', $id)
            ->where('lida', "0")
            ->orderByDesc('created_at')
            ->get();;

        return NotficacoesResource::collection($notificao);
    }

    public function create(Request $request)
    {
        
        $data['expires_at'] = now()->addDay();
        
        $data = $request->all();
        $notificao = Notificacao::create($data);

        return new NotficacoesResource($notificao);
    }

    public function limparNotificacoes(Request $request)
    {
        $data = $request->all();
        
        $deletedNotifications = [];

        foreach($data as $id){
            $notificao = Notificacao::findOrFail($id);
            $notificao->delete();
            $deletedNotifications[] = $notificao;
        }

        return NotficacoesResource::collection($deletedNotifications);
    }

    public function marcarComoLida(string $id)
    {
        $notificao = Notificacao::findOrFail($id);

        // $notificao->lida = 1;

        // $notificao->update();

        return response()->json([
            'lida' => 1,
            'lida_em' => Carbon::now()->tz('America/Sao_Paulo')
        ]);

    }

}
