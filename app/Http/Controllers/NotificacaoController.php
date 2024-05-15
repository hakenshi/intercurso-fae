<?php

namespace App\Http\Controllers;

use App\Http\Resources\NotficacoesResource;
use App\Models\Notificacao;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificacaoController extends Controller
{
    public function enviarNotificacao(string $id)
    {
        $notificao = Notificacao::where('id_usuario', $id)
        ->where('lida', 0)
        ->orderByDesc('created_at')
        ->get();
        ;
        
        return NotficacoesResource::collection($notificao);
    }



}
