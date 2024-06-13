<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jogo extends Model
{
    use HasFactory;

    protected $table = "jogos";

    public $timestamps = false;

    protected $fillable = [
        'id_placar',
        'id_time_1',
        'id_time_2',
        "id_modalidade",
        'data_jogo',
        'local',
        'status',
    ];

    public function placar()
    {
        return $this->hasOne(Placar::class, "id_jogo");
    }

    public function modalidade()
    {
        return $this->hasOne(Modalidade::class, "id", "id_modalidade");
    }

    public function time1()
    {
        return $this->hasOne(Time::class, 'id', 'id_time_1');    
    }
    public function time2()
    {
        return $this->hasOne(Time::class, 'id', 'id_time_2');    
    }
}
