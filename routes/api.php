<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\JogadoresController;
use App\Http\Controllers\ModalidadesController;
use App\Http\Controllers\NotificacaoController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\TimeController;
use App\Http\Controllers\UserController;
use App\Http\Resources\UsuariosResource;
use App\Models\Notificacao;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResources([
    '/usuarios' => UserController::class,
    '/modalidades' => ModalidadesController::class,
    '/times' => TimeController::class,
    '/jogadores' => JogadoresController::class,
]);

Route::prefix("/times")->group(function(){
    Route::get("/usuario/{id}", [TimeController::class, 'showTimesUsuario']);
});

Route::middleware('auth:sanctum')->group(function () {
    
    //Essa rota é responsável por pegar o usuário que está logado no sistema

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

   //Ações simples
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::patch('/expulsar-jogador/{id}', [JogadoresController::class, 'expulsarJogador']);
    Route::patch('/tornar-responsavel/{id}', [UserController::class, 'tornarResponsavel']);
    // Rota de notificação
    Route::prefix('/notificacao')->group(function(){
        Route::get("{id}", [NotificacaoController::class, 'verNotificacao']);
        Route::post('create', [NotificacaoController::class, 'create']);
        Route::post('limpar-notificacao', [NotificacaoController::class, 'limparNotificacoes']);
        Route::patch('ler-notificacao/{id}', [NotificacaoController::class, "marcarComoLida"]);
    });
    //Rotas de busca
    Route::get("/search-jogadores", [SearchController::class, 'jogadores']);
    Route::get("/search-modalidades", [SearchController::class, 'modalidades']);
    Route::get("/responsaveis", [SearchController::class, 'responsaveis']);
    Route::get('/search-usuarios', [SearchController::class, 'usuarios']);
});

Route::post('/cadastro', [AuthController::class, 'cadastro']);
Route::post('/login', [AuthController::class, 'login']);
