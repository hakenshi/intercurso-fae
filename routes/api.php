<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\FasesController;
use App\Http\Controllers\JogadoresController;
use App\Http\Controllers\JogosContoller;
use App\Http\Controllers\ModalidadesController;
use App\Http\Controllers\NotificacaoController;
use App\Http\Controllers\PlacarController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\TimeController;
use App\Http\Controllers\UserController;
use App\Http\Resources\UsuariosResource;
use App\Models\Termo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::prefix("/times")->group(function () {
    Route::get("/usuario/{id}", [TimeController::class, 'showTimesUsuario']);
});

Route::apiResources([
    '/modalidades' => ModalidadesController::class,
    '/times' => TimeController::class,
    '/jogos' => JogosContoller::class,
    '/categoria' => CategoriaController::class,
]);

Route::middleware('auth:sanctum')->group(function () {

    Route::apiResources([
        '/jogadores' => JogadoresController::class,
        '/usuarios' => UserController::class,
    ]);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    //Ações simples
    
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::patch('/expulsar-jogador/{id}', [JogadoresController::class, 'expulsarJogador']);
    Route::patch('/tornar-responsavel/{id}', [UserController::class, 'tornarResponsavel']);
    Route::post('/jogos/gerar-chaves', [JogosContoller::class, 'storeMany']);
    Route::get('/fases', [FasesController::class, 'index']);

    // Rota de notificação
    
    Route::prefix('/notificacao')->group(function () {
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
    Route::get('/search-times', [SearchController::class, 'times']);

    //Rotas para o placar

    Route::prefix('/placar')->group(function () {
        Route::patch('/{placar}', [PlacarController::class, 'update']);
    });
});

Route::prefix('/paginate')->group(function () {
    Route::get('jogos/{id}', [JogosContoller::class, 'indexPaginate']);
    Route::get('/users', [UserController::class, 'indexPaginate']);
    Route::get('/modalidades', [ModalidadesController::class, 'indexPaginate']);
    Route::get('/times/{id}', [TimeController::class, 'indexPaginate']);
});


Route::get('/termos/{id}', [UserController::class, 'termos']);

Route::post('/reset-password', [EmailController::class, 'sendResetPassword']);

Route::post('/cadastro', [AuthController::class, 'cadastro']);
Route::post('/login', [AuthController::class, 'login']);

