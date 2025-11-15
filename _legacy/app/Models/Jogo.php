<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Validation\ValidationException;
use function PHPUnit\Framework\isNull;

class Jogo extends Model
{
    use HasFactory;

    protected $table = "jogos";

    public $timestamps = false;

    protected $fillable = [
        'id_fase',
        'placar_time_1',
        'placart_time_2',
        'id_time_1',
        'id_time_2',
        'id_time_vencedor',
        'id_proximo_jogo',
        "id_modalidade",
        'data_jogo',
        'local',
        'status',
    ];

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

    public function timeVencedor() : HasOne{
        return $this->hasOne(Time::class, 'id', 'id_time_vencedor');
    }

    public function fase(): BelongsTo
    {
        return $this->belongsTo(Fases::class, 'id_fase');
    }

    public static function defineKeySize(int $size)
    {
        if($size <= 3) {
            return 2;
        }
        elseif($size <= 7) {
            return 4;
        }
        elseif($size <= 15) {
            return 8;
        }
        elseif($size <= 31) {
            return 16;
        }
        elseif($size <= 63) {
            return 32;
        }
        return 1;
    }

    public static function organizeMatches ($teams)
    {

        $keySize = self::defineKeySize(count($teams));

        $timesNoChapeu = (count($teams) - $keySize) * 2;

        $shuffledTeams = shuffle($teams);

        $jogosNoChapeu = floor($timesNoChapeu / 2);

        $faseChapeu = [];
        $fasePrincipal = [];
        $quartas = [];

        $oitavas = [];

        $semifinais = [];

        $finais = [];

        $chaveChapeu = array_splice($teams, 0, $timesNoChapeu);

        $chavePrincipal = $teams;

        for($i = 0; $i < count($chaveChapeu); $i+=2) {
            $faseChapeu[] = [
                'time1' => $chaveChapeu[$i] ?? null,
                'time2' => $chaveChapeu[$i + 1] ?? null,
            ];
        }

        for($i = 0; $i < $keySize; $i+=2) {
            $fasePrincipal[] = [
                'time1' => $chavePrincipal[$i] ?? null,
                'time2' => $chavePrincipal[$i + 1] ?? null,
            ];
        }
        if ($keySize == 2){
            return [
                '2' => $faseChapeu,
                '6' => $fasePrincipal,
            ];
        }

        if ($keySize == 4) {
            self::arrayFillNull($finais, $keySize, 4);
            return [
                '1' => $faseChapeu,
                '2' => $fasePrincipal,
                '6' => $finais,
            ];
        }
        if ($keySize == 8) {
            self::arrayFillNull($semifinais, $keySize, 4);
            self::arrayFillNull($finais, $keySize, 8);
            return [
                '1' => array_filter($faseChapeu),
                '2' => $fasePrincipal,
                '5' => $semifinais,
                '6' => $finais,
            ];

        }
        if ($keySize == 16) {
            self::arrayFillNull($quartas, $keySize, 4);
            self::arrayFillNull($semifinais, $keySize, 8);
            self::arrayFillNull($finais, $keySize, 16);

            return [
                '1' => array_filter($faseChapeu),
                '2' => $fasePrincipal,
                '4' => $quartas,
                '5' => $semifinais,
                '6' => $finais,
            ];
        }

        self::arrayFillNull($quartas, $keySize, 4);
        self::arrayFillNull($quartas, $keySize, 8);
        self::arrayFillNull($quartas, $keySize, 16);
        self::arrayFillNull($quartas, $keySize, 32);

        return [
            '1' => array_filter($faseChapeu),
            '2' => $fasePrincipal,
            '3' => $oitavas,
            '4' => $quartas,
            '5' => $semifinais,
            '6' => $finais,
        ];
    }

    public static function arrayFillNull(&$array, $keySize, $n)
    {
        for($i = 0; $i < ceil($keySize / $n); $i++){
            $array[] = [
                'time1' => null,
                'time2' => null,
            ];
        }
    }

}
