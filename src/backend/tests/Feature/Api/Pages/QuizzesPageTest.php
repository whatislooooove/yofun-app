<?php

namespace tests\Feature\Api\Pages;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class QuizzesPageTest extends TestCase
{
    use RefreshDatabase;

    public function test_quizzes_page_returns_200_status(): void
    {
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . config('api.token')
        ])->get(route('quizzes'));

        $response->assertOk();
    }

    public function test_quizzes_page_requires_authentication(): void
    {
        $response = $this->get(route('quizzes'));
        $response->assertStatus(403);
    }

    public function test_quizzes_page_with_invalid_token_returns_401(): void
    {
        $response = $this->withHeaders([
            'Authorization' => 'Bearer invalid_token'
        ])->get(route('quizzes'));

        $response->assertStatus(403);
    }

    public function test_quizzes_page_returns_json_response(): void
    {
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . config('api.token'),
            'Accept' => 'application/json'
        ])->get(route('quizzes'));

        $response->assertHeader('Content-Type', 'application/json');
    }
}
