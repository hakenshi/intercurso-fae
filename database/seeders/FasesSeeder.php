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
            ['nome' => 'Primeira Fase'],
            ['nome' => 'Segunda Fase'],
            ['nome' => 'Terceira Fase'],
            ['nome' => 'Quarta Fase'],
            ['nome' => 'Final'],
        ]);
    }
}
