<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{asset('css/form-styles.css')}}">
    <title>Intercurso</title>
</head>
<body class="form-page">
<div class="form-container">
    <div class="logo-container">
        <img src="{{ asset('logo-unifae-2021.png') }}" alt="unifae-logo" class="logo"/>
        <span class="logo-text">Intercurso</span>
    </div>
    <form id="form" class="form">
        <div class="input-group">
            <input type="hidden" id="reset-token" name="password_reset_token" value="{{$token ?? ''}}">
            <label class="label" for="senha">Senha</label>
            <input class="input" type="password" name="senha" id="senha" placeholder="••••••••"/>
            <p class="error-message" id="email-error"></p>
        </div>
        <div class="input-group">
            <label class="label" for="confirm-senha">Confirmar Senha</label>
            <input class="input" type="password" name="confirm-senha" id="confirm-senha" placeholder="••••••••"/>
            <p class="error-message" id="senha-error"></p>
        </div>
        <button type="submit" class="submit-button">Entrar</button>
    </form>
</div>
<script src="{{asset('js/script.js')}}"></script>
</body>
</html>
