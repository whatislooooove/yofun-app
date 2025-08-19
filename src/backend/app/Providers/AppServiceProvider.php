<?php

namespace App\Providers;

use App\Contracts\AI\AI;
use App\Models\Announcement;
use App\Observers\AnnouncementObserver;
use app\Services\AI\MistralAI;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(AI::class, MistralAI::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Announcement::observe(AnnouncementObserver::class);
    }
}
