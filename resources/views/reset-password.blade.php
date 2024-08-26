<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
{{--    @vite('resources/css/app.css')--}}
</head>
<body class="bg-card-white-1/50">
    <div  class="flex justify-center flex-col items-center p-5 gap-2 md:gap-5 text-center">

        <div class="bg-white p-5 min-h-96 md:min-h-[40rem] w-11/12 flex flex-col items-center justify-evenly">

            <div>
                <img class="w-32 md:w-72 lg:w-80" src="{{ asset("logo-unifae-2021.png") }}" alt="logo unifae">
            </div>

        <h1 class="text-base md:text-2xl font-bold">Instruções para redefinir a senha</h1>
           <div class="text-center flex flex-col gap-2">
               <p>Olá, {{$data['user']}}. Parece que você esqueceu a sua senha.</p>
               <p >Por favor clique no botão abaixo para redefini-la.</p>
           </div>
                <div class="flex flex-col items-center gap-4">
                    <a class="bg-unifae-green-1 w-fit text-white p-3 rounded-md" href="{{route('reset-password', ['token' => $data['token']])}}">Redefinir Senha</a>
                    <p class="text-sm"> O botão não funciona? <a href="{{route('reset-password', ['token' => $data['token']])}}" class="underline text-blue-500 visited:text-purple-800">Clique aqui</a></p>
                </div>
        </div>
    </div>
</body>
</html>
