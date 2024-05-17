<?php

namespace App\Models;

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
        'expires_at'
    ];


    public function usuario()
    {
        return $this->belongsTo(User::class, "id_usuario");
    }

}
