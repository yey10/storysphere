<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Subscription;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Subscription>
 */
class SubscriptionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Subscription::class;

    public function definition(): array
    {
        return [
            'id_user' => User::factory(),
            'start_date' => now(),
            'end_date' => now()->addMonth(),
            'subscription_type' => $this->faker->randomElement(['basic', 'premium']),
        ];
    }
}
