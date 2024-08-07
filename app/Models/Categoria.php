<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'categorias';

    public function modalidades()
    {
        return $this->belongsTo(Modalidade::class, 'id_categoria', 'id');
    }
}
