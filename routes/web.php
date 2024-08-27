<?php

use App\Http\Controllers\EmailController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('reset-password');
});

Route::get('/reset-password/{token}', function ($token){
    return view('reset-password-form', with(['token' => $token]));
})->name('reset-password');

Route::post('/reset-password', [EmailController::class, 'resetPassword'])->name('reset-password-request');