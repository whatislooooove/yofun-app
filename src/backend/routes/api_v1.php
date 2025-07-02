<?php

use App\Http\Controllers\API\V1\MainController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/', [MainController::class, 'index'])->name('home');
Route::get('/quizzes', [MainController::class, 'quizzes'])->name('quizzes');
Route::get('/events', [MainController::class, 'events'])->name('events');
Route::get('/static', [MainController::class, 'static'])->name('static');
