<?php

namespace Database\Seeders;

use App\Models\User;
use Database\Factories\UserFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'nome' => 'admin',
            'email' => 'admin@admin.com',
            'senha' => 'admin',
            'tipo_usuario' => 1
        ]);
        User::factory()->create([
            'nome' => 'Felipe Kafka Dias',
            'email' => 'felipe.dias@sou.fae.br',
            'senha' => '123',
            'tipo_usuario' => 2
        ]);

        User::factory()->count(15)->create();
    }
}
