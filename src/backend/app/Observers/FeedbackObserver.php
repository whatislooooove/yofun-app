<?php

namespace App\Observers;

use App\Models\Feedback;
use App\Services\FeedbackNotificationService;

class FeedbackObserver
{
    /**
     * Handle the Feedback "created" event.
     */
    public function created(Feedback $feedback): void
    {
        app(FeedbackNotificationService::class, [
            'feedback' => $feedback
        ])->sendFeedbackNotification();
    }
}
