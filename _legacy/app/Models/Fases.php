<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fases extends Model
{
    use HasFactory;

    protected $table = "fases";

    public $timestamps = false;

    protected $fillable = [
        'nome'
    ];

    public function jogos()
    {
        return $this->hasMany(Jogo::class, 'id_fase', 'id');
    }
}

