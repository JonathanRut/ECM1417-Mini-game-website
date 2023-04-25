<html lang = "en">
    <head>
        <title>Pairs</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
        <link rel="stylesheet" type="text/css" href="./assets/css/style.css">
        <link rel="stylesheet" type="text/css" href="./assets/css/pairs.css">
    </head>
    <body>
        <div id = "main">
        <?php
            // The navbar is displayed
            require('./assets/php/navbar.php')
        ?>
            <h1 class="portrait-message">Rotate your device to play the game</h1>
            <div id="game">
                <div class = "container-centre">
                    <button class="btn btn-primary btn-lg start-button"><h4>Start Game</h4></button>
                </div>
                
            </div>
            <div id = "fullscreen" class = "bg-primary"><img src = "./assets/images/fullscreen-enter.png"></div>
            <script src="./assets/js/fullscreen.js"></script>
        </div>
        <script src="./assets/js/pairs.js"></script>
    </body>
</html>