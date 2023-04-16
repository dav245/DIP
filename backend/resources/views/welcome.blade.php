<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/png" sizes="32x32" href="favicon.png">

    <title>Thessenger</title>

    <style>
        @font-face {
            font-family: "Montserrat";
            src: url(/Montserrat-VariableFont_wght.ttf) format("truetype");
        }

        html,
        body {
            min-height: 100vh;
            width: 100%;
            margin: 0;
            font-family: 'Montserrat';
        }

        .main {
            background-color: rgb(245, 245, 255);
            width: 100%;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }
    </style>
</head>

<body>
    <main class="main">
        <h1>Thessenger Backend</h1>

        <p>Made possible by Laravel</p>
    </main>
</body>

</html>
