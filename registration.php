<?php
$invalid_name = false;
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    session_start();
    $username = $_POST["username"];
    $skin = $_POST["skin"];
    $eyes = $_POST["eyes"];
    $mouth = $_POST["mouth"];

    $invalid_characters = ['!','@', '#', '"', "'", '%', '&', '*', '(', ')', '+', '=', '{', '}', '[', ']', '-', ';', ':', ' “', '<', '>', '?', '/'];
    foreach($invalid_characters as $character){
        if(strpos($username, $character)){
            $invalid_name = true;
        }
    }

    if(!$invalid_name){
        $_SESSION["username"] = $username;
        $_SESSION["skin"] = $skin;
        $_SESSION["eyes"] = $eyes;
        $_SESSION["mouth"] = $mouth;

        header("Location: ./index.php");
    }
}
?>
<html lang = "en">
    <head>
        <title>Register</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
        <link rel="stylesheet" type="text/css" href="./assets/css/style.css">
        <link rel="stylesheet" type="text/css" href="./assets/css/registration.css">
        <script src="./assets/js/registration.js"></script>
    </head>
    <body>
        <div id = "main">
        <?php
            require('./assets/php/navbar.php')
        ?>
            <h1 class="portrait-message">Rotate your device to register account</h1>
            <form method="post" action="registration.php">
                <div class="row form-div justify-content-center">
                    <div class="col-lg-2 col-md-3 col-sm-4 justify-content-center">
                        <div class="row ">
                            <h2>Skin</h2>
                            <div class="col">
                                <input type="radio" name="skin" value="yellow" id="yellow" checked="checked" onclick="skinChange('yellow')">
                                <label for="yellow"><img src="./assets/images/skin/yellow.png"></label>
                            </div>
                            <div class="col">
                                <input type="radio" name="skin" value="green" id="green" onclick="skinChange('green')">
                                <label for="green"><img src="./assets/images/skin/green.png"></label>
                            </div>
                            <div class="col">
                                <input type="radio" name="skin" value="red" id="red" onclick="skinChange('red')">
                                <label for="red"><img src="./assets/images/skin/red.png"></label>
                            </div>
                        </div>
                        <div class="row">
                            <h2>Eyes</h2>
                            <div class="col">
                                <input type="radio" name="eyes" value="closed" id="closed" checked="checked" onclick="eyeChange('closed')">
                                <label for="closed"><img src="./assets/images/eyes/closed.png"></label>
                                <input type="radio" name="eyes" value="normal" id="normal" onclick="eyeChange('normal')">
                                <label for="normal"><img src="./assets/images/eyes/normal.png"></label>
                            </div>
                            <div class="col">
                                <input type="radio" name="eyes" value="laughing" id="laughing" onclick="eyeChange('laughing')">
                                <label for="laughing"><img src="./assets/images/eyes/laughing.png"></label>
                                <input type="radio" name="eyes" value="rolling" id="rolling" onclick="eyeChange('rolling')">
                                <label for="rolling"><img src="./assets/images/eyes/rolling.png"></label>
                            </div>
                            <div class="col">
                                <input type="radio" name="eyes" value="long" id="long" onclick="eyeChange('long')">
                                <label for="long"><img src="./assets/images/eyes/long.png"></label>
                                <input type="radio" name="eyes" value="winking" id="winking" onclick="eyeChange('winking')">
                                <label for="winking"><img src="./assets/images/eyes/winking.png"></label>
                            </div>
                        </div>
                        <div class="row">
                            <h2>Mouth</h2>
                            <div class="col">
                                <input type="radio" name="mouth" value="open" id="open" checked="checked" onclick="mouthChange('open')">
                                <label for="open"><img src="./assets/images/mouth/open.png"></label>
                                <input type="radio" name="mouth" value="straight" id="straight" onclick="mouthChange('straight')">
                                <label for="straight"><img src="./assets/images/mouth/straight.png"></label>
                            </div>
                            <div class="col">
                                <input type="radio" name="mouth" value="sad" id="sad" onclick="mouthChange('sad')">
                                <label for="sad"><img src="./assets/images/mouth/sad.png"></label>
                                <input type="radio" name="mouth" value="surprise" id="surprise" onclick="mouthChange('surprise')">
                                <label for="surprise"><img src="./assets/images/mouth/surprise.png"></label>
                            </div>
                            <div class="col">
                                <input type="radio" name="mouth" value="smiling" id="smiling" onclick="mouthChange('smiling')">
                                <label for="smiling"><img src="./assets/images/mouth/smiling.png"></label>
                                <input type="radio" name="mouth" value="teeth" id="teeth" onclick="mouthChange('teeth')">
                                <label for="teeth"><img src="./assets/images/mouth/teeth.png"></label>
                            </div>
                        </div>
                    </div>
                    <div class="col text-div">
                        <div class="current-image">
                            <img id="current-skin" src="./assets/images/skin/yellow.png">
                            <img id="current-eyes"src="./assets/images/eyes/closed.png">
                            <img id="current-mouth"src="./assets/images/mouth/open.png">
                        </div>
                        <div class="input-group mb-1">
                            <span class="input-group-text" id="basic-addon1">@</span>
                            <input type="text" name="username" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
                        </div>
                        <?php
                        if($invalid_name){
                            echo "<p>Username cannot contain any special characters</p>";
                        }
                        ?>
                        <div class="d-grid gap-2">
                            <input type="submit" class="btn btn-primary btn-sm" value="Create">
                        </div>
                    </div>
                </div>
            </form>
            <div id = "fullscreen" class = "bg-primary"><img src = "./assets/images/fullscreen-enter.png"></div>
            <script src="./assets/js/fullscreen.js"></script>
        </div>
    </body>
</html>