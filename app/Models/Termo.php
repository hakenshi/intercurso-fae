<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Termo extends Model
{
    use HasFactory;
    
    protected $primaryKey = 'id_usuario';

    protected $timeStamps = false;

    protected $fillable = [
        'id_usuario',
        'data_aceite_termos',
        'pdf_termos'
    ];

    public function usuario() {
        return $this->belongsTo(User::class, 'id_usuario');
    }

}
