<?php

namespace App\Exports;

use App\Models\Jogo;
use Maatwebsite\Excel\Concerns\FromCollection;

class JogoExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Jogo::all();
    }
}
