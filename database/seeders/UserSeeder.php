<?php

namespace Database\Seeders;

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
        $users = [
            [
                'id_curso' => 2,
                'nome' => 'Maria Silva',
                'email' => 'maria.silva@example.com',
                'senha' => 'maria123',
                'ra' => '123456',
                'tipo_usuario' => '3'
            ],
            [
                'id_curso' => 1,
                'nome' => 'João Souza',
                'email' => 'joao.souza@example.com',
                'senha' => 'joao123',
                'ra' => '654321',
                'tipo_usuario' => '3'
            ],
            [
                'id_curso' => 3,
                'nome' => 'Ana Santos',
                'email' => 'ana.santos@example.com',
                'senha' => 'ana123',
                'ra' => '987654',
                'tipo_usuario' => '3'
            ],
            [
                'id_curso' => 2,
                'nome' => 'Pedro Oliveira',
                'email' => 'pedro.oliveira@example.com',
                'senha' => 'pedro123',
                'ra' => '111222',
                'tipo_usuario' => '3'
            ],
            [
                'id_curso' => 1,
                'nome' => 'Carla Pereira',
                'email' => 'carla.pereira@example.com',
                'senha' => 'carla123',
                'ra' => '333444',
                'tipo_usuario' => '3'
            ],
            [
                'id_curso' => 3,
                'nome' => 'Lucas Martins',
                'email' => 'lucas.martins@example.com',
                'senha' => 'lucas123',
                'ra' => '555666',
                'tipo_usuario' => '3'
            ],
            [
                'id_curso' => 2,
                'nome' => 'Mariana Costa',
                'email' => 'mariana.costa@example.com',
                'senha' => 'mariana123',
                'ra' => '777888',
                'tipo_usuario' => '3'
            ],
            [
                'id_curso' => 1,
                'nome' => 'Gabriel Santos',
                'email' => 'gabriel.santos@example.com',
                'senha' => 'gabriel123',
                'ra' => '999000',
                'tipo_usuario' => '3'
            ]
        ];

        DB::table("usuarios")->insert($users);
    }
}
