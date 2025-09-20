<?php

namespace tests\Feature\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class StaticDataTest extends TestCase
{
    use RefreshDatabase;
    public function test_static_data(): void
    {
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . config('api.token')
        ])->get(route('static'));

        $response->assertOk();
    }

    public function test_static_page_requires_authentication(): void
    {
        $response = $this->get(route('static'));
        $response->assertStatus(403);
    }

    public function test_static_page_with_invalid_token_returns_401(): void
    {
        $response = $this->withHeaders([
            'Authorization' => 'Bearer invalid_token'
        ])->get(route('static'));

        $response->assertStatus(403);
    }

    public function test_static_page_returns_json_response(): void
    {
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . config('api.token'),
            'Accept' => 'application/json'
        ])->get(route('static'));

        $response->assertHeader('Content-Type', 'application/json');
    }
}

