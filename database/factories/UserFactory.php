<?php

namespace Database\Factories;

use App\Models\Cursos;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'foto_perfil' => null,
            'id_curso' => Cursos::factory(), // Assuming course IDs range from 1 to 100
            'nome' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'senha' => static::$password ??= Hash::make('password'), // Encrypting a default password
            'telefone' => fake()->phoneNumber(),
            'ra' => fake()->unique()->numerify('########'), // Assuming RA is an 8-digit number
            'data_de_nascimento' => fake()->date(),
            'bio' => fake()->text(120),
            'tipo_usuario' => fake()->numberBetween(2,3), // Assuming three types of users
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
