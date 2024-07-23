<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        body {
            font-family: sans-serif;
            background: black;
            color: white;
        }
        picture{
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        img{
            width: min(100vw, 100vh);
            border-radius: 10px;
        }
    </style>
</head>
<body>
<picture>
<h1>You seem lost.</h1>
    <img alt="image" src="{{asset('image.webp')}}">
</picture>
</body>
</html>