<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Patient>
 */
class PatientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'registration_year'=> fake()->randomElement(['2023','2024','2025','2026']),
            'dob'=> fake()->date('Y-m-d',now()),
            'age'=>fake()->randomNumber(2),
            'drtb_code'=> fake()->randomLetter(),
            'password'=> Hash::make('password')
        ];
    }
}
