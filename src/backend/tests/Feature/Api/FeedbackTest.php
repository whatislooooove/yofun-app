<?php

namespace tests\Feature\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Illuminate\Support\Facades\Queue;
use App\Models\Feedback;

class FeedbackTest extends TestCase
{
    use RefreshDatabase;

    public function test_feedback_creation_success_with_queue_fake(): void
    {
        Queue::fake();

        $data = [
            'name' => 'Тестовый пользователь (с телегой)',
            'email' => 'test@test.test',
            'subject' => 'Здесь должна была быть тема сообщения',
            'message' => 'Тестовая заявка. Создается при тестировании (в тестовой базе)',
        ];

        $response = $this->post(route('feedback'), $data);

        $response->assertStatus(201);
        $this->assertDatabaseHas('feedbacks', $data);
    }

    public function test_feedback_creation_with_telegram_with_queue_fake(): void
    {
        Queue::fake();

        $data = [
            'name' => 'Тестовый пользователь (с телегой)',
            'email' => 'test@test.test',
            'telegram' => '@test123',
            'subject' => 'Здесь должна была быть тема сообщения',
            'message' => 'Тестовая заявка. Создается при тестировании (в тестовой базе)',
        ];

        $response = $this->post(route('feedback'), $data);

        $response->assertStatus(201);
        $this->assertDatabaseHas('feedbacks', $data);
    }

    public function test_feedback_database_structure(): void
    {
        Queue::fake();

        $data = [
            'name' => 'Иван Иванов',
            'email' => 'ivan@test.test',
            'telegram' => '@ivanov',
            'subject' => 'Важная тема',
            'message' => 'Длинное тестовое сообщение для проверки обрезки',
        ];

        $response = $this->post(route('feedback'), $data);

        $response->assertStatus(201);

        // Проверяем что все данные сохранились правильно
        $feedback = Feedback::first();
        $this->assertEquals($data['name'], $feedback->name);
        $this->assertEquals($data['email'], $feedback->email);
        $this->assertEquals($data['telegram'], $feedback->telegram);
        $this->assertEquals($data['subject'], $feedback->subject);
        $this->assertEquals($data['message'], $feedback->message);
    }

    public function test_feedback_required_fields_validation(): void
    {
        $testCases = [
            [
                'data' => ['name' => ''],
                'expectedErrors' => ['name', 'email', 'message', 'subject']
            ],
            [
                'data' => ['name' => '', 'telegram' => 'incorrect'],
                'expectedErrors' => ['name', 'email', 'message', 'telegram']
            ],
            [
                'data' => ['email' => 'invalid', 'subject' => '1'],
                'expectedErrors' => ['email', 'message']
            ],
            [
                'data' => [],
                'expectedErrors' => ['name', 'email', 'message']
            ]
        ];

        foreach ($testCases as $case) {
            $response = $this->withHeaders([
                    'Accept' => 'application/json'
                ])->post(route('feedback'), $case['data']);
            $response->assertStatus(422);
            $response->assertJsonValidationErrors($case['expectedErrors']);
        }

        $this->assertDatabaseCount('feedbacks', 0);
    }


    public function test_feedback_with_special_characters(): void
    {
        Queue::fake();

        $data = [
            'name' => 'Тест & Спецсимволы <script>',
            'email' => 'test+special@test.test',
            'message' => 'Сообщение с HTML <strong>тегами</strong> и "кавычками"',
            'telegram' => '@ivanov',
            'subject' => 'Важная тема',
        ];

        $response = $this->post(route('feedback'), $data);

        $response->assertStatus(201);
        $this->assertDatabaseHas('feedbacks', [
            'email' => 'test+special@test.test'
        ]);
    }
}

