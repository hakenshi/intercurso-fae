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
        Categoria::factory()->create([
           'nome' => 'e-sports',
        ]);
        Categoria::factory()->create([
           'nome' => 'futebol',
        ]);
        Categoria::factory()->create([
           'nome' => 'volei',
        ]);Categoria::factory()->create([
           'nome' => 'handebol',
        ]);
        Categoria::factory()->create([
           'nome' => 'basquete',
        ]);
        Categoria::factory()->create([
           'nome' => 'jogos de mesa',
        ]);
    }
}
