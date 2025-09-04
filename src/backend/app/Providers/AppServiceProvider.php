<?php

namespace App\Providers;

use App\Contracts\AI\AI;
use App\Models\Announcement;
use App\Models\Feedback;
use App\Observers\AnnouncementObserver;
use App\Observers\FeedbackObserver;
use app\Services\AI\MistralAIService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(AI::class, MistralAIService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Announcement::observe(AnnouncementObserver::class);
        Feedback::observe(FeedbackObserver::class);
    }
}
