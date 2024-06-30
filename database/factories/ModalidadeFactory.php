<?php

namespace Database\Factories;

use App\Models\Categoria;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Modalidade>
 */
class ModalidadeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id_categoria' => Categoria::factory(),
            'nome' => $this->faker->name(),
            'quantidade_participantes' => $this->faker->numberBetween(1, 20),
            'genero' => $this->faker->randomElement(['0', '1']),
        ];
    }
}
