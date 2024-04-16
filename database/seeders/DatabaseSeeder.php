<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'id_curso' => '1',
            'nome' => 'admin',
            'email' => 'admin@admin.com',
            'senha' => bcrypt("123"),
            'telefone' => '(11)123456789',
            'ra' => '29113-5',
            'tipo_usuario' => '1'
        ]);
    }
}