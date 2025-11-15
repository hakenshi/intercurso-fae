<?php

namespace Database\Factories;

use App\Models\Modalidade;
use App\Models\Time;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class TimeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id_modalidade' => Modalidade::factory(),
            'id_responsavel' => User::factory(),
            'foto_time' => null,
            'nome' => $this->faker->name(),
            'status' => $this->faker->boolean(),
        ];
    }
}
