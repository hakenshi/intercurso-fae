<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    @vite('resources/css/app.css')
    @vite('resources/js/app.js')
    <title>Intercurso</title>
</head>
<body>
 <div class="bg-[#262626] min-h-screen flex justify-center items-center">

<div class="md:w-1/2 bg-white rounded-md lg:w-[33vw] p-3 md:p-5 lg:p-10">
    <div class="flex items-center flex-col h-[15vh] justify-center">
        <img src="{{ asset("logo-unifae-2021.png") }}" alt="unifae-logo" class="w-3/4"/>
        <span class="text-unifae-green-1 font-semibold">Intercurso</span>
    </div>
    <form id="form" class="flex flex-col items-center gap-6 p-4 lg:p-0">
        @csrf
        <div class="flex flex-col justify-center">
            <input type="hidden" id="reset-token" name="password_reset_token" value="{{$token ?? ""}}">
            <label class="text-lg" for="email">Senha</label>
            <input class="input-login" type="password" name="senha" id="senha" placeholder="••••••••"/>
            <p class="px-2 py-1 text-xs text-black/80" id="email-error"></p>
        </div>
        <div class="flex flex-col justify-center">
            <label class="text-lg" for="senha">Confirmar Senha</label>
            <input class="input-login" type="password" name="confirm-senha" id="confirm-senha" placeholder="••••••••"/>
            <p class="px-2 py-1 text-xs text-black/80" id="senha-error"></p>
        </div>
        <button type="submit" class="btn-lg btn-green">Entrar</button>

    </form>
 </div>
</div>
</body>
</html>