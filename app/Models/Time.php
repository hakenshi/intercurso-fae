<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Time extends Model
{
    use HasFactory;

    protected $table = "times";

    protected $fillable = [
        'id_modalidade',
        'id_responsavel',
        'nome',
        'status',
    ];

    public function modalidade()
    {
        return $this->belongsTo(Modalidade::class, "id_modalidade");
    }

    public function usuario()
    {
        return $this->belongsTo(User::class, 'id_responsavel');
    }

    public function jogadores()
    {
        return $this->hasMany(Jogador::class, "id_time", "id");
    }

    public function jogos()
    {
        return $this->belongsToMany(Jogo::class);
    }

}
