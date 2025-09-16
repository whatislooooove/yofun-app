<?php

use App\Http\Controllers\API\V1\MainController;
use App\Http\Middleware\InternalServiceAccess;
use Illuminate\Support\Facades\Route;

Route::middleware(['throttle:100,60', InternalServiceAccess::class])->group(function () {
    Route::get('/', [MainController::class, 'index'])->name('home');
    Route::get('/quizzes', [MainController::class, 'quizzes'])->name('quizzes');
    Route::get('/events', [MainController::class, 'events'])->name('events');
    Route::get('/static', [MainController::class, 'static'])->name('static');
});

Route::post('/feedback', [MainController::class, 'feedback'])->name('feedback');
