<?php
// A session is started
session_start();
// A check is made to see if the request method is GET, POST or neither
if($_SERVER["REQUEST_METHOD"] == "GET"){
    // If there is a session variable for level scores already that is echoed
    if(isset($_SESSION["level-scores"])){
        header('Content-Type: application/json');
        echo $_SESSION["level-scores"];
    }
    // Otherwise an array of length 19 and all element 0 is echoed as a json string
    else{
        header('Content-Type: application/json');
        $_SESSION["level-scores"] = json_encode(array_fill(0, 19, 0));
        echo $_SESSION["level-scores"];
    }
}
elseif($_SERVER["REQUEST_METHOD"] == "POST"){
    // The data from the POST request is retrieved 
    $data = json_decode(file_get_contents('php://input'));
    // A check is made to see if the data is set
    if(isset($data)){
        // The level score are retrieved as an array
        $levelScores = json_decode($_SESSION['level-scores']);
        // The level scores are iterated through
        for($i = 0; $i < count($levelScores); $i++){
            // If the new score is greater than the one stored then the level score is updated
            if($data[$i] > $levelScores[$i]){
                $levelScores[$i] = $data[$i];
            }
        }
        // The level scores session variable is updated
        $_SESSION['level-scores'] = json_encode($levelScores);
    }
    else{
        // If the data is not set then the http response code is set to 406 as input is not acceptable
        http_response_code(406);
        die();
    }
}
else{
    // If neither a error code 405 is set as the method is not allowed
    http_response_code(405);
    die();
}

?>