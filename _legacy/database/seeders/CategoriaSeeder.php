<?php

namespace Database\Seeders;

use App\Models\Categoria;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Categoria::factory()->createMany([
            ['nome' => 'e-sports'],
            ['nome' => 'futebol'],
            ['nome' => 'volei'],
            ['nome' => 'handebol'],
            ['nome' => 'basquete'],
            ['nome' => 'jogos de mesa'],
        ]);
    }
}
