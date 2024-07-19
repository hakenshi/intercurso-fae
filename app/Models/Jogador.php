<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jogador extends Model
{
    use HasFactory;

    protected $table = "jogadores";

    protected $fillable = [
        'id',
        'id_usuario',
        'id_time',
        'status'
    ];

    public function time()
    {
        return $this->belongsTo(Time::class, "id_time");
    }

    public function usuario()
    {
        return $this->belongsTo(User::class, 'id_usuario');
    }

}
