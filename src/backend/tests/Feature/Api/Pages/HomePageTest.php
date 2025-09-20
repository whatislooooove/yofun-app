<?php

namespace tests\Feature\Api\Pages;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class HomePageTest extends TestCase
{
    use RefreshDatabase;

    public function test_home_page_returns_200_status(): void
    {
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . config('api.token')
        ])->get(route('home'));

        $response->assertOk();
    }

    public function test_home_page_requires_authentication(): void
    {
        $response = $this->get(route('home'));
        $response->assertStatus(403);
    }

    public function test_home_page_with_invalid_token_returns_401(): void
    {
        $response = $this->withHeaders([
            'Authorization' => 'Bearer invalid_token'
        ])->get(route('home'));

        $response->assertStatus(403);
    }

    public function test_home_page_returns_json_response(): void
    {
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . config('api.token'),
            'Accept' => 'application/json'
        ])->get(route('home'));

        $response->assertHeader('Content-Type', 'application/json');
    }
}
