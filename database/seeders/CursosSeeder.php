<?php

namespace Database\Seeders;

use App\Models\Cursos;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CursosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cursos = [
            ['nome_curso' => 'Administração', 'descricao' => 'Curso de Administração'],
            ['nome_curso' => 'Ciências Contábeis', 'descricao' => 'Curso de Ciências Contábeis'],
            ['nome_curso' => 'Direito', 'descricao' => 'Curso de Direito'],
            ['nome_curso' => 'Educação Física (Bacharelado)', 'descricao' => 'Curso de Educação Física (Bacharelado)'],
            ['nome_curso' => 'Enfermagem', 'descricao' => 'Curso de Enfermagem'],
            ['nome_curso' => 'Engenharia Civil', 'descricao' => 'Curso de Engenharia Civil'],
            ['nome_curso' => 'Engenharia Elétrica', 'descricao' => 'Curso de Engenharia Elétrica'],
            ['nome_curso' => 'Engenharia Mecânica', 'descricao' => 'Curso de Engenharia Mecânica'],
            ['nome_curso' => 'Engenharia Química', 'descricao' => 'Curso de Engenharia Química'],
            ['nome_curso' => 'Engenharia da Computação', 'descricao' => 'Curso de Engenharia da Computação'],
            ['nome_curso' => 'Engenharia de Produção', 'descricao' => 'Curso de Engenharia de Produção'],
            ['nome_curso' => 'Engenharia de Software', 'descricao' => 'Curso de Engenharia de Software'],
            ['nome_curso' => 'Farmácia', 'descricao' => 'Curso de Farmácia'],
            ['nome_curso' => 'Fisioterapia', 'descricao' => 'Curso de Fisioterapia'],
            ['nome_curso' => 'Jornalismo', 'descricao' => 'Curso de Jornalismo'],
            ['nome_curso' => 'Medicina', 'descricao' => 'Curso de Medicina'],
            ['nome_curso' => 'Odontologia', 'descricao' => 'Curso de Odontologia'],
            ['nome_curso' => 'Pedagogia', 'descricao' => 'Curso de Pedagogia'],
            ['nome_curso' => 'Psicologia', 'descricao' => 'Curso de Psicologia'],
            ['nome_curso' => 'Publicidade e Propaganda', 'descricao' => 'Curso de Publicidade e Propaganda'],
            ['nome_curso' => 'Engenharia Biomédica', 'descricao' => 'Curso de Engenharia Biomédica'],
            ['nome_curso' => 'Educação Fisica (Licenciatura)', 'descricao' => 'Curso de Educação Fisica (Licenciatura)'],
            ['nome_curso' => 'Comunicação e Mídias digitais', 'descricao' => 'Curso de Comunicação e Mídias digitais'],
            ['nome_curso' => 'Economia', 'descricao' => 'Curso de Economia']
        ];
    
        foreach ($cursos as $curso) {
            Cursos::create($curso);
        }

    }
}
