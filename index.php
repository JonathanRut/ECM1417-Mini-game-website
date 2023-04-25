<html lang = "en">
    <head>
        <title>Pairs</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
        <link rel="stylesheet" type="text/css" href="./assets/css/style.css">
        <link rel="stylesheet" type="text/css" href="./assets/css/index.css">
        <link rel="icon" href="./assets/images/favicon.png">
    </head>
    <body>
        <div id = "main">
        <?php
            // The navbar is displayed
            require('./assets/php/navbar.php')
        ?>
        <h1 class="welcome">Welcome to Pairs</h1>
            
            <div class = "message">
                <?php
                    // If the user is registered a button to play the game is displayed otherwise a link to the registration page is displayed
                    if(isset($_SESSION["username"]) && isset($_SESSION["skin"]) && isset($_SESSION["eyes"]) && isset($_SESSION["mouth"])){
                        echo '<button type="submit" class="btn btn-primary btn-lg" onclick="window.location.href=\'pairs.php\'">Click here to play</button>';
                    }
                    else{
                        echo '<div class="badge bg-primary text-wrap">You\'re not using a registered session? <a href="registration.php">Register now</a></div>';
                    }
                ?>                
            </div>
            <div id = "fullscreen" class = "bg-primary"><img src = "./assets/images/fullscreen-enter.png"></div>
            <script src="./assets/js/fullscreen.js"></script>
        </div>
    </body>
</html>


