<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Modalidade extends Model
{
    use HasFactory;

    protected $table = "modalidades";
    
    protected $fillable = [
        'nome',
        'id_categoria',
        'quantidade_participantes',
        'genero',
    ];

    public function time(){
        return $this->hasOne(Time::class, "id_modalidade");
    }
    public function jogo()
    {
        return $this->hasOne(Jogo::class, 'id_modalidade');
    }
    public function categoria()
    {
        return $this->hasOne(Categoria::class, 'id', 'id_categoria');
    }
}
