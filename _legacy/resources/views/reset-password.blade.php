<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="{{asset('css/reset-password.css')}}">
</head>
<body class="background-card">
<div class="container">
    <div class="content-container">
        <div>
            <img class="logo" src="{{ asset('logo-unifae-2021.png') }}" alt="logo unifae">
        </div>
        <h1 class="title">Instruções para redefinir a senha</h1>
        <div class="message-container">
            <p>Olá, {{$data['user']}}. Parece que você esqueceu a sua senha.</p>
            <p>Por favor, clique no botão abaixo para redefini-la.</p>
        </div>
        <div class="button-container">
            <a class="reset-button" href="{{route('reset-password', ['token' => $data['token']])}}">Redefinir Senha</a>
            <p class="fallback-text">O botão não funciona? <a href="{{route('reset-password', ['token' => $data['token']])}}" class="fallback-link">Clique aqui</a></p>
        </div>
    </div>
</div>
</body>
</html>
