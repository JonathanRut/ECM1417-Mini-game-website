<nav class="navbar bg-primary" data-bs-theme="dark">
    <div class="nav container-fluid">
        <a class="nav-link" href="index.php" name = "home">Home</a>
        <ul class="nav justify-content-end">
            <li class="nav-item">
                <a class="nav-link" href="pairs.php" name = "memory"> Play Pairs</a>
            </li>
            <?php
            if(isset($_COOKIE["username"]) && isset($_COOKIE["skin"]) && isset($_COOKIE["eyes"]) && isset($_COOKIE["mouth"])){
                echo '<li class="nav-item"><a class="nav-link" href="leaderboard.php" name="leaderboard">Leaderboard</a></li>';
            }
            else{
                echo '<li class="nav-item"><a class="nav-link" href="registration.php" name="register">Register</a></li>';
            }
            ?>
            <?php
            if(isset($_COOKIE["skin"]) && isset($_COOKIE["eyes"]) && isset($_COOKIE["mouth"])){
                echo '<li class="nav-item icon-item">';
                echo '<div class="icon">';
                echo '<img id="skin" src="./assets/images/skin/'. $_COOKIE["skin"] .'.png">';
                echo '<img id="eyes"src="./assets/images/eyes/'. $_COOKIE["eyes"] .'.png">';
                echo '<img id="mouth"src="./assets/images/mouth/'. $_COOKIE["mouth"] .'.png">';
                echo '</div>';
                echo '</li>';
            }
            ?>
            
                
            </li>
        </ul>
    </div>
</nav>