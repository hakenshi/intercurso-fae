<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cursos extends Model
{
    use HasFactory;

    protected $table = "cursos";

    public $timestamps = false;

    protected $fillable = [
        'nome_curso',
        'descricao_curso',
    ];

    public function usuario(){
        return $this->hasOne(User::class, "id_curso");
    }

}
