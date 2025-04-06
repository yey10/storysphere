<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use App\Models\Subscription;
use Illuminate\Foundation\Testing\RefreshDatabase;

class SubscriptionTest extends TestCase
{
    use RefreshDatabase;

    public function test_subscription_belongs_to_user()
    {
        $user = User::factory()->create();
        $subscription = Subscription::factory()->create([
            'id_user' => $user->id_user,
        ]);

        $this->assertInstanceOf(User::class, $subscription->user);
        $this->assertEquals($user->id_user, $subscription->user->id_user);
    }

    public function test_subscription_dates_are_stored_correctly()
    {
        $subscription = Subscription::factory()->create([
            'subscription_type' => 'premium',
        ]);

        $this->assertEquals('premium', $subscription->subscription_type);
        $this->assertNotNull($subscription->start_date);
        $this->assertNotNull($subscription->end_date);
    }
}