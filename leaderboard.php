<?php
// The scores variable is initialized 
$scores = [];
// A check is made to see if the request method is POST or GET
if($_SERVER["REQUEST_METHOD"] == "POST"){
    session_start();
    // The data posted is retrieved
    $data = json_decode(file_get_contents('php://input'));
    // A check is then made to see if the data is set and the user is a registered player
    if(isset($data) && isset($_SESSION["username"])){
        // The files containing all the leader board scores is read and a record for the players overall score is created
        $scores = json_decode(file_get_contents('./assets/scores.json'), true);
        $overallRecord = json_decode('{"username":"' . $_SESSION["username"] . '", "skin":"'. $_SESSION["skin"] .'", "eyes":"'. $_SESSION["eyes"] .'", "mouth":"'. $_SESSION["mouth"] .'", "score":'. $data[18] .'}', true);
        // A check is made to see if there are any overall scores stored in the json file already if not the players score is added
        if(count($scores["Overall"]) == 0){
            $scores["Overall"][0] = $overallRecord;
        }
        else{
            // This for loop finds and inserts the player record into the leaderboard 
            $notAdded = true;
            for($i = 0; $i < count($scores["Overall"]); $i++){
                if($scores["Overall"][$i]["score"] <= $data[18]){
                    array_splice($scores["Overall"], $i, 0, [$overallRecord]);
                    $notAdded = false;
                    break;
                }
            }
            // If the score doesn't get inserted it is then added to the end of the leaderboard
            if($notAdded){
                $scores["Overall"][count($scores["Overall"])] = $overallRecord;
            }
        }
        // This for loop iterates over each level and adds the players record to the leaderboard
        for($i = 1; $i <= 18; $i++){
            // The level record for the player is created
            $levelRecord = json_decode('{"username":"' . $_SESSION["username"] . '", "skin":"'. $_SESSION["skin"] .'", "eyes":"'. $_SESSION["eyes"] .'", "mouth":"'. $_SESSION["mouth"] .'", "score":'. $data[$i - 1] .'}', true);
            // A check is made to see if there are any level scores stored in the json file already if not the players score is added
            if(count($scores["Level ".$i]) == 0){
                $scores["Level ".$i][0] = $levelRecord;
            }
            else{
                // This for loop finds and inserts the player record into the leaderboard 
                $notAdded = true;
                for($j = 0; $j < count($scores["Level ".$i]); $j++){
                    if($scores["Level ".$i][$j]["score"] <= $data[$i - 1]){
                        array_splice($scores["Level ".$i], $j, 0, [$levelRecord]);
                        $notAdded = false;
                        break;
                    }
                }
                // If the score doesn't get inserted it is then added to the end of the leaderboard
                if($notAdded){
                    $scores["Level ".$i][count($scores["Level ".$i])] = $levelRecord;
                }
            }
        }
        // Finally the new json string is written to the json file
        file_put_contents('./assets/scores.json', json_encode($scores));
    }
}
elseif($_SERVER["REQUEST_METHOD"] == "GET"){
    // The json file containing scores is read
    $scores = json_decode(file_get_contents('./assets/scores.json'), true);
}
?>
<html lang = "en">
    <head>
        <title>Leaderboard</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
        <link rel="stylesheet" type="text/css" href="./assets/css/style.css">
        <link rel="stylesheet" type="text/css" href="./assets/css/leaderboard.css">
    </head>
    <body>
        <div id = "main">
        <?php
            require('./assets/php/navbar.php')
        ?>
            <div id = 'leaderboards'>
                <h2 class = "title">Overall Score</h2>
                <div class = "scoreboard-container">
                    <table class = "scoreboard">
                        <tr>
                            <th>Position</th>
                            <th>Username</th>
                            <th>Score</th>
                            <?php
                                // The for loop iterates over the overall scores and adds them to the table
                                for($i = 0; $i < count($scores["Overall"]); $i++){
                                    echo '<tr>';
                                    echo '<td>' . ($i + 1) . '</td>';
                                    echo '<td><div class = "emoji"><img src = "./assets/images/skin/' . $scores["Overall"][$i]["skin"] .'.png"><img src = "./assets/images/eyes/' . $scores["Overall"][$i]["eyes"] .'.png"><img src = "./assets/images/mouth/' . $scores["Overall"][$i]["mouth"] .'.png"></div>' . $scores["Overall"][$i]["username"] . '</td>';
                                    echo '<td>' . $scores["Overall"][$i]["score"] . '</td>';
                                    echo '</tr>';
                                }
                            ?>
                        </tr>
                    </table>
                </div>
                <br>
                <?php
                    // The for loop iterates over each level and creates a table for each levels records
                    for($i = 0; $i < 18; $i++){
                        // A title container, table and headers are created
                        echo '<h2 class = "title">Level ' . ($i + 1) . '</h2>';
                        echo '<div class = "scoreboard-container"><table class = "scoreboard"><tbody>';
                        echo '<tr><th>Position</th><th>Username</th><th>Score</th></tr>';
                        // The records are iterated over and added to the table
                        for($j = 0; $j < count($scores["Level " . ($i + 1)]); $j++){
                            echo '<tr>';
                            echo '<td>' . ($j + 1) . '</td>';
                            echo '<td><div class = "emoji"><img src = "./assets/images/skin/' . $scores["Level " . ($i + 1)][$j]["skin"] .'.png"><img src = "./assets/images/eyes/' . $scores["Level " . ($i + 1)][$j]["eyes"] .'.png"><img src = "./assets/images/mouth/' . $scores["Level " . ($i + 1)][$j]["mouth"] .'.png"></div>' . $scores["Level " . ($i + 1)][$j]["username"] . '</td>';
                            echo '<td>' . $scores["Level " . ($i + 1)][$j]["score"] . '</td>';
                            echo '</tr>';
                        }
                        echo '</tbody></table></div><br>';
                    }
                ?>
            </div>
            <div id = "fullscreen" class = "bg-primary"><img src = "./assets/images/fullscreen-enter.png"></div>
            <script src="./assets/js/fullscreen.js"></script>
        </div>
    </body>
</html>