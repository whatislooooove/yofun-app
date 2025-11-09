<?php

use App\Console\Commands\Announcements\ActualizeAnnouncements;
use App\Console\Commands\Sources\ParseSource;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api_v1.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
        apiPrefix: 'api/v1'
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->trustProxies(at: '*');
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })
    ->withSchedule(function (Schedule $schedule) {
        $schedule->command(ActualizeAnnouncements::class)
            ->name('Actualize data')
            ->dailyAt('00:05')
            ->withoutOverlapping()
            ->runInBackground();
        $schedule->command(ParseSource::class, ['--all --queue'])
            ->name('Main crawlers')
            ->dailyAt('00:10')
            ->withoutOverlapping()
            ->runInBackground();
    })
    ->create();
