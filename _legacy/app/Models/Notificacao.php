<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notificacao extends Model
{
    use HasFactory;

    protected $table = "notificacoes";

    protected $fillable = [
        'id_usuario',
        'mensagem',
        'lida',
        "tipo_notificacao",
        'expires_at'
    ];


    public function usuario()
    {
        return $this->belongsTo(User::class, "id_usuario");
    }

    public static function criarNotificacao($id, $mensagem, $tipo)
    {
        $notificacao = new Notificacao();
        $notificacao->id_usuario = $id;
        $notificacao->mensagem = $mensagem;
        $notificacao->lida = "0";
        $notificacao->tipo_notificacao = $tipo;
        $notificacao->expires_at = now("America/Sao_Paulo")->addWeek();
        $notificacao->save();

        return $notificacao;
    }
}
