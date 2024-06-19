<?php

namespace App\Models;

use App\Http\Resources\TermosResource;
use GuzzleHttp\Psr7\Request;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Termo extends Model
{
    use HasFactory;

    protected $table = "termos";

    public $timestamps = false;
    
    protected $fillable = [
        'id_usuario',
        'problema_cardiacao',
        'dor_no_peito',
        'dor_no_peito_ultimo_mes',
        'desequilibrio_tontura',
        'problema_osseo_articular',
        'outra_condicao',
        'medicamento_pressao_cardiaco',
        'assinatura',
        'accept_responsability',
        'created_at',
    ];

    public function usuario() {
        return $this->belongsTo(User::class, 'id_usuario');
    }



}
