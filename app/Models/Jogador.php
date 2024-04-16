<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jogador extends Model
{
    use HasFactory;

    protected $table = "jogadores";

    protected $primaryKey = 'id'; 

    protected $fillable = [
        'id_time',
        'id_usuario',
        'status'
    ];
    
    public function time(){
        return $this->belongsTo(Time::class, "id_time");
    }

    public function usuario(){
        return $this->belongsTo(User::class, 'id_usuario');
    }

}
