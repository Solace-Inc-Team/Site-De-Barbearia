<?php

use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Home')->name('home');
Route::post('/contato', [ContactController::class, 'store'])->name('contato.store');
