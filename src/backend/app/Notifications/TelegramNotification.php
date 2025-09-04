<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use NotificationChannels\Telegram\TelegramMessage;

class TelegramNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * @param string $message
     * @param array $options. Массив опций. Пока использую только кнопки
     * TODO: необходимо типизировать построже
     */
    public function __construct(private string $message, private array $options = []) {}

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(): array
    {
        return ['telegram'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toTelegram(): TelegramMessage
    {
        $message = TelegramMessage::create()
            ->to(config('services.telegram-bot-api.chat_id'))
            ->content($this->message)
            ->options($this->options);

        foreach (data_get($this->options, 'buttons', []) as $item) {
            $message->button($item['text'], $item['url']);
        }

        return $message;
    }

}
