<?php

use App\Http\Controllers\MainController;
use Illuminate\Support\Facades\Route;

Route::get('/', [MainController::class, 'index'])->name('home_old');
Route::get('/about', [MainController::class, 'about'])->name('about');
