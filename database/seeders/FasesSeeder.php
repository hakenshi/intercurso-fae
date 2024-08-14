<?php

namespace Database\Seeders;

use App\Models\Fases;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FasesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Fases::factory()->createMany([
            ['nome' => 'Fase Chapéu'],
            ['nome' => 'Fase Principal'],
            ['nome' => 'Oitavas'],
            ['nome' => 'Quartas'],
            ['nome' => 'Semifinais'],
            ['nome' => 'Final'],
        ]);
    }
}
