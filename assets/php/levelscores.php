<?php
session_start();
if($_SERVER["REQUEST_METHOD"] == "GET"){
    if(isset($_SESSION["level-scores"])){
        header('Content-Type: application/json');
        echo $_SESSION["level-scores"];
    }
    else{
        header('Content-Type: application/json');
        $_SESSION["level-scores"] = json_encode(array_fill(0, 19, 0));
        echo $_SESSION["level-scores"];
    }
}
elseif($_SERVER["REQUEST_METHOD"] == "POST"){
    $data = json_decode(file_get_contents('php://input'));
    if(isset($data)){
        $levelScores = json_decode($_SESSION['level-scores']);
        for($i = 0; $i < count($levelScores); $i++){
            if($data[$i] > $levelScores[$i]){
                $levelScores[$i] = $data[$i];
            }
        }
        $_SESSION['level-scores'] = json_encode($levelScores);
    }
    else{
        http_response_code(406);
        die();
    }
}
else{
    http_response_code(405);
    die();
}

?>