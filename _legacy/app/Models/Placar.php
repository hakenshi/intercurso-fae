<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Placar extends Model
{
    use HasFactory;

    protected $table = "placares";

    public $timestamps = false;

    protected $fillable = [
        'id_jogo',
        'id_time_vencedor',
        'placar_time_1',
        'placar_time_2',
    ];

    public function jogo()
    {
        return $this->belongsTo(Jogo::class, "id_jogo");
    }

    public function time()
    {
        return $this->belongsTo(Time::class, "id_time_vencedor", "id");
    }
}
