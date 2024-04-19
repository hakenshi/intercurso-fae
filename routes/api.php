<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\JogadoresController;
use App\Http\Controllers\ModalidadesController;
use App\Http\Controllers\TimeController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::apiResources([
    '/usuarios' => UserController::class,
    '/modalidades' => ModalidadesController::class,
    '/times' => TimeController::class,
    '/jogadores' => JogadoresController::class,
]);

Route::post('/cadastro', [AuthController::class, 'cadastro']);