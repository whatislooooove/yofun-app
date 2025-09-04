<?php

namespace app\Services;

use App\Models\Feedback;
use App\Notifications\TelegramNotification;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Str;

class FeedbackNotificationService
{
    public function __construct(private readonly Feedback $feedback) {}

    public function sendFeedbackNotification(): void
    {
        $message = self::createFeedbackMessage();
        $options = self::getNotificationOptions();

        $notification = new TelegramNotification($message, $options);
        $notification->onQueue('telegram');

        Notification::send(
            new \Illuminate\Notifications\AnonymousNotifiable(),
            $notification
        );
    }

    private function createFeedbackMessage(): string
    {
        return sprintf(
            "📝 *Новый фидбек* #%d\n\n" .
            "👤 *От:* %s\n" .
            "📧 *Email:* %s\n" .
            "📞 *Telegram:* %s\n" .
            "📋 *Тема:* %s\n" .
            "💬 *Сообщение:* %s\n\n" .
            "⏰ *Создан:* %s",
            $this->feedback->id,
            $this->feedback->name,
            $this->feedback->email,
            $this->feedback->telegram ?? 'Не указан',
            $this->feedback->subject,
            Str::limit($this->feedback->message, 50),
            $this->feedback->created_at->format('d.m.Y H:i')
        );
    }

    private function getNotificationOptions(): array
    {
        return [
            'buttons' => [
                [
                    'text' => '📁 Открыть в админке',
                    'url' => route('moonshine.resource.page', [
                        "resourceUri" => "feedback-resource",
                        "pageUri" => "detail-page",
                        "resourceItem" => $this->feedback->id,
                    ])
                ],
            ]
        ];
    }
}
