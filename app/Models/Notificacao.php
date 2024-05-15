<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notificacao extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_usuario',
        'mensagem',
        'lida'
    ];


    public function usuario()
    {
        return $this->belongsTo(User::class, "id_usuario");
    }

}
