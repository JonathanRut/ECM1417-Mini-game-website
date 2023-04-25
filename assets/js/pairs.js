// This class represents the table for the game
class Table{
    // The arguments represent the setting the table must follow for the level
    constructor(pairs, tripples, quads, totalCards, level){
        // Attributes of the table are set
        this.cards = [];
        this.level = level;
        this.guessing = false;
        this.turnedOverCards = [];
        this.remainingSets = pairs + tripples + quads;

        // Variables for choosing the emoji styles are set
        let takenStyles = [];
        let skins = ['green', 'red', 'yellow'];
        let mouths = ['open', 'sad', 'smiling', 'straight', 'surprise', 'teeth'];
        let eyes = ['closed', 'laughing', 'long', 'normal', 'rolling', 'winking'];
        
        // This for loop creates the pairs needed for the table
        for(let i = 0; i < pairs; i++){
            let style;
            let notOriganalStyle;
            // A do while loop chooses an original style for the emoji
            do{
                style = [];
                let skin = skins[Math.floor(Math.random() * skins.length)];
                let mouth = mouths[Math.floor(Math.random() * mouths.length)];
                let eye = eyes[Math.floor(Math.random() * eyes.length)];
                style.push(skin, mouth, eye);
                notOriganalStyle = false;
                for(let j = 0; j < takenStyles.length; j++){
                    if(takenStyles[j].toString() === style.toString()){
                        notOriganalStyle = true;
                    }
                }
            }while(notOriganalStyle);
            // This style is pushed into the array of taken styles
            takenStyles.push(style);

            // This for loop created two identical cards which are then added to the cards array
            for(let j = 0; j < 2; j++){
                let card = new Card(style[0], style[1], style[2], 2, this);
                this.cards.push(card);
            }
        }

        // This for loop creates the triples needed for the table
        for(let i = 0; i < tripples; i++){
            let style;
            let notOriganalStyle;
            // A do while loop chooses an original style for the emoji
            do{
                style = [];
                let skin = skins[Math.floor(Math.random() * skins.length)];
                let mouth = mouths[Math.floor(Math.random() * mouths.length)];
                let eye = eyes[Math.floor(Math.random() * eyes.length)];
                style.push(skin, mouth, eye);
                notOriganalStyle = false;
                for(let j = 0; j < takenStyles.length; j++){
                    if(takenStyles[j].toString() === style.toString()){
                        notOriganalStyle = true;
                    }
                }
            }while(notOriganalStyle);
            // This style is pushed into the array of taken styles
            takenStyles.push(style);

            // This for loops created three identical cards which are then added to the cards array
            for(let j = 0; j < 3; j++){
                let card = new Card(style[0], style[1], style[2], 3, this);
                this.cards.push(card);
            }
        }

        // This for loop creates the quads needed for the table
        for(let i = 0; i < quads; i++){
            let style;
            let notOriganalStyle;
            // A do while loop chooses an original style for the emoji
            do{
                style = [];
                let skin = skins[Math.floor(Math.random() * skins.length)];
                let mouth = mouths[Math.floor(Math.random() * mouths.length)];
                let eye = eyes[Math.floor(Math.random() * eyes.length)];
                style.push(skin, mouth, eye);
                notOriganalStyle = false;
                for(let j = 0; j < takenStyles.length; j++){
                    if(takenStyles[j].toString() === style.toString()){
                        notOriganalStyle = true;
                    }
                }
            }while(notOriganalStyle);
            // This style is pushed into the array of taken styles
            takenStyles.push(style);

            // This for loop creates four identical cards which are then added to the cards array
            for(let j = 0; j < 4; j++){
                let card = new Card(style[0], style[1], style[2], 4, this);
                this.cards.push(card);
            }
        }
        
        // This for loop shuffles the cards in the cards array so they can be randomly placed on the board
        for(let i = this.cards.length - 1; i > 0; i--){
            let j = Math.floor(Math.random() * (i + 1));
            let temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }

        // A container and table are created
        this.tableDiv = document.querySelector('.card-table');
        let table = document.createElement('table');
        //  This for loop creates the rows for the table
        for(let i = 0; i < 2; i++){
            let row = document.createElement('tr');
            // This for loop creates tha cards for those rows in the table
            for(let j = 0; j < totalCards / 2; j++){
                // The cards html is retrieved
                let card = this.cards[j + totalCards / 2 * i].html;
                // Containers for the card are created
                let data = document.createElement('td');
                let centreDiv = document.createElement('div');
                centreDiv.setAttribute('class', 'container-centre');
                let cardDiv = document.createElement('div');
                cardDiv.setAttribute('class', 'card-container');
                // The card is then added to these containers and finally the table data is added to the row
                cardDiv.appendChild(card);
                centreDiv.appendChild(cardDiv);
                data.appendChild(centreDiv);
                row.appendChild(data);
            }
            // The row is added to the table
            table.appendChild(row);
        }
        // The table is added to it's container and the html reference for the table is stored
        this.tableDiv.appendChild(table);
        this.html = table;
    }

    foundSet(){
        // When a set is found the remaining sets attribute is decremented
        this.remainingSets--;
        // A check is made to see if the level is completed
        if (this.remainingSets == 0){
            this.level.endLevel();   
        }
    }
}

// This class represents the cards in the game
class Card{
    // Construction of the card takes attributes such as it's emojis features, the number of card to complete it's set and the table it belongs to
    constructor(skin, mouth, eyes, numberToComplete, table){
        // The attributes of the cards are set from the arguments
        this.skin = skin;
        this.mouth = mouth;
        this.eyes = eyes;
        this.numberToComplete = numberToComplete;
        this.table = table;
        // A card is created from a div element
        let card = document.createElement('div');
        card.setAttribute('class', 'game-card');
        // An event listener is added to the card for when it is clicked on
        card.addEventListener('click', (event)=>{
            // First a check is made to see if the card is already flipped
            if(!event.target.parentElement.classList.contains('flip')){
                // If not fliped then the card gets flipped and added to the array of turned over cards
                this.html.classList.add('flip');
                this.table.turnedOverCards.push(this);
                // A check is made to see if there are already cards turned over
                if(this.table.guessing){
                    // Next a check is made to see if the card matches ones already turned over
                    if(this.table.turnedOverCards[0].mouth === this.mouth && this.table.turnedOverCards[0].skin === this.skin && this.table.turnedOverCards[0].eyes === this.eyes){
                        // If it does a check is made to see if the set is complete
                        if(this.table.turnedOverCards.length == this.numberToComplete){
                            // If complete then the border of all the cards in the set are set to green
                            for(let i = 0; i < this.table.turnedOverCards.length; i++){
                                this.table.turnedOverCards[i].html.lastChild.style.borderColor = 'lightgreen';
                            }
                            // The table is no longer guessing and there would be no card in the turnedOverCards array
                            this.table.guessing = false;
                            this.table.turnedOverCards = [];
                            // 2000 points are then subtracted from the level score ensuring that it doesn't go 0 or bellow
                            if((Number(document.getElementById('level-score').innerHTML) - 2000) <= 0){
                                // If it goes 0 or bellow then the level ends and the score for the level is given as 0
                                document.getElementById('level-score').innerHTML = 0;
                                this.table.level.endLevel();
                            }
                            else{
                                // If not then 2000 is subtracted from the score and a timeout call foundSet when the final card is completely turned over
                                document.getElementById('level-score').innerHTML = Number(document.getElementById('level-score').innerHTML) - 2000;
                                setTimeout((table)=>{table.foundSet()}, 500, this.table);
                            }
                        }
                        else{
                            // If the set is not complete then the border colour is set to orange
                            this.html.lastChild.style.borderColor = 'orange';
                        }
                    }
                    else{
                        // If the features of the card do not match then all the card turned over are unflipped and given a border colour of red
                        for(let i = 0; i < this.table.turnedOverCards.length; i++){
                            setTimeout(function(card){card.html.classList.remove('flip')}, 500, this.table.turnedOverCards[i]);
                            this.table.turnedOverCards[i].html.lastChild.style.borderColor = 'red';
                        }
                        // The table is no longer guessing and there would be not card in the turnedOverCards array
                        this.table.guessing = false;
                        this.table.turnedOverCards = [];
                        // 2000 points are then subtracted from the level score ensuring that it doesn't go 0 or bellow
                        if((Number(document.getElementById('level-score').innerHTML) - 2000) <= 0){
                            // If it goes 0 or bellow then the level ends and the score for the level is given as 0
                            document.getElementById('level-score').innerHTML = 0;
                            this.table.level.endLevel();
                        }
                        else{
                            // If not then 2000 is subtracted from the score
                            document.getElementById('level-score').innerHTML = Number(document.getElementById('level-score').innerHTML) - 2000;
                        }
                    }
                }
                else{
                    // If not then the marker is set to true and the border colour is set to orange
                    this.table.guessing = true;
                    this.html.lastChild.style.borderColor = 'orange';
                }
            }   
        });
        // The front face and the back face of the card are set and the reference to the cards html is stored
        card.innerHTML = '<div class="front-face"></div><div class="back-face"><div class = "emoji"><img id="skin" src="./assets/images/skin/'+skin+'.png"><img id="eyes" src="./assets/images/eyes/'+eyes+'.png"><img id="skin" src="./assets/images/mouth/'+mouth+'.png"></div></div>';    
        this.html = card;
    }
}

// This class represents the levels in the game
class Level{
    // Construction of the level takes attribute for it's setting, the highscore for the level and the game that the level belongs to
    constructor(pairs, triples, quads, totalCards, highscore, game){
        // The attributes for the level are set
        this.pairs = pairs;
        this.triples = triples;
        this.quads = quads;
        this.totalCards = totalCards;
        this.highscore = highscore
        this.game = game;
    }

    startLevel(){
        // When the level is started the table is created
        this.table = new Table(this.pairs, this.triples, this.quads, this.totalCards, this);
        // A interval is used to subtract from the score every millisecond
        let countDown = setInterval(()=>{
            // 7 points are subtracted from the level score ensuring that it doesn't go 0 or bellow
            if(Number(document.getElementById('level-score').innerHTML) - 7 <= 0){
                // If the score goes bellow 0 then the level score is set to 0 the interval is cleared and the level in ended
                document.getElementById('level-score').innerHTML = 0;
                clearInterval(countDown);
                this.endLevel();
            }
            else{
                // If not then 7 is subtracted from the score
                document.getElementById('level-score').innerHTML = Number(document.getElementById('level-score').innerHTML) - 7;
                // If the score has gone bellow the highscore then the background of the game is set to gray otherwise it is set to gold
                if(Number(document.getElementById('level-score').innerHTML) < this.highscore){
                    document.getElementById('game').style.backgroundColor = 'gray';
                }
                else{
                    document.getElementById('game').style.backgroundColor = '#FFD700';
                }
            }
            
        }, 1);
        // The countdown is set as an attribute
        this.countDown = countDown;
    }

    endLevel(){
        // When the level ends the countdown is removed, the level number is incremented by 1 and the overall score is increased
        clearInterval(this.countDown);
        document.getElementById('level-number').innerHTML = Number(document.getElementById('level-number').innerHTML) + 1;
        document.getElementById('overall-score').innerHTML = Number(document.getElementById('overall-score').innerHTML) + Number( document.getElementById('level-score').innerHTML);
        // The level score is added to the array of other level scores the reset to it's intital value of 100,000
        this.game.scores.push(Number(document.getElementById('level-score').innerHTML));
        document.getElementById('level-score').innerHTML = 100000;
        // The table is removed and the game goes onto the next level
        this.table.html.remove();
        this.game.nextLevel();
    }
}

// This class represents the game
class Game{
    // The game is constructed using previous level highscores
    constructor(levelHighScores){
        // Attributes for the game are set
        this.scores = [];
        this.levelHighScores = levelHighScores;
        this.levels = [
            new Level(1, 2, 1, 12, levelHighScores[17], this),
            new Level(4, 0, 1, 12, levelHighScores[16], this),
            new Level(2, 0, 2, 12, levelHighScores[15], this),
            new Level(0, 0, 3, 12, levelHighScores[14], this),
            new Level(3, 2, 0, 12, levelHighScores[13], this),
            new Level(0, 4, 0, 12, levelHighScores[12], this),
            new Level(6, 0, 0, 12, levelHighScores[11], this),
            new Level(3, 0, 1, 10, levelHighScores[10], this),
            new Level(1, 0, 2, 10, levelHighScores[9], this),
            new Level(2, 2, 0, 10, levelHighScores[8], this),
            new Level(5, 0, 0, 10, levelHighScores[7], this),
            new Level(2, 0, 1, 8, levelHighScores[6], this),
            new Level(0, 0, 2, 8, levelHighScores[5], this),
            new Level(1, 2, 0, 8, levelHighScores[4], this),
            new Level(4, 0, 0, 8, levelHighScores[3], this),
            new Level(1, 0, 1, 6, levelHighScores[2], this),
            new Level(0, 2, 0, 6, levelHighScores[1], this),
            new Level(3, 0, 0, 6, levelHighScores[0], this)
        ];
        // The div for the game retrieved and the score bars are added to it
        let gameDiv = document.querySelector("#game");
        gameDiv.innerHTML = "<div class = 'score-bar'><div class='score badge text-bg-primary'><h5>Score: </h5><h5><div id = 'overall-score'>0</div></h5></div></div><div class = 'card-table'></div><div class = 'score-bar'><div class = 'score badge text-bg-primary'><h5>Level </h5><h5><div id='level-number'>1</div></h5><h5>: </h5></h5><h5><div id = 'level-score'>100000</div></h5></div></div>";
        // The first level is then started
        this.levels.pop().startLevel();
    }

    nextLevel(){
        // When the game moves onto the next level a check is made to see if there are any more levels left
        if(this.levels.length == 0){
            // If there are none the game ends
            this.endGame();
        }
        else{
            // If there is another level it is then removed from the array and started
            this.levels.pop().startLevel();
        }
    }

    endGame(){
        // When the game ends first the interval for repeating the music is cleared and the music is stopped
        clearInterval(repeatMusic);
        backgroundMusic.pause();
        
        // The overall score is retrieved and stored in a variable
        let overallScore = Number(document.getElementById('overall-score').innerHTML);
        //Then the content inside the game is removed from the document
        let scoreBars = document.getElementById('game').childNodes;
        for(let i = 0; i < scoreBars.length; i++){
            scoreBars[i].remove();
        }

        // An xml http request is made using POST to the levelscore.php updating the level and overall highscores for a player
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", "./assets/php/levelscores.php", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // The overall scores is added to the scores and the scores are turned into a json string
        this.scores.push(overallScore);
        let data = JSON.stringify(this.scores);

        xhttp.onreadystatechange = ()=>{
            // Every ready state change a check is made to see if the POST request was successful and the request was complete
            if(xhttp.readyState == 4 && xhttp.status == 200){
                // The game div retrieved and given a gray background
                let gameDiv = document.getElementById('game');
                gameDiv.style.backgroundColor = 'gray';

                // The card table is removed and then a table for the players scores is created
                document.querySelector('.card-table').remove();
                let scoreboard = document.createElement('table');
                scoreboard.setAttribute('class', 'scoreboard');
                // The header for the table is added
                let header = document.createElement('tr');
                header.innerHTML = '<th>Level</th><th>Score</th><th>Personal Best</th>';
                scoreboard.appendChild(header);
                // This for loop iterates over the level scores and adds them to the table each score getting its own row
                for(let i = 0; i < this.scores.length - 1; i++){
                    let row = document.createElement('tr');
                    // Depending if the player beat their personal best the background of the cell with the scores is gold
                    if(this.scores[i] >= this.levelHighScores[i]){
                        row.innerHTML = '<td>Level '+ (i + 1) +'</td><td class = "gold">'+ this.scores[i] +'</td><td class = "gold">'+ this.scores[i] +'</td>';
                    }
                    else{
                        row.innerHTML = '<td>Level '+ (i + 1) +'</td><td>'+ this.scores[i] +'</td><td>'+ this.levelHighScores[i] +'</td>';
                    }
                    scoreboard.appendChild(row);
                }
                // A row is created for the overall score
                let row = document.createElement('tr');
                // Depending if the player beat their personal best the background of the cell with the scores is gold
                if(this.scores[18] >= this.levelHighScores[18]){
                    row.innerHTML = '<td class = "blue overall-score">Overall Score</td><td class = "gold">'+ this.scores[18] +'</td><td class = "gold">'+ this.scores[18] +'</td>';
                }
                else{
                    row.innerHTML = '<td class = "blue overall-score">Overall Score</td><td>'+ this.scores[18] +'</td><td>'+ this.levelHighScores[18] +'</td>';
                }
                // The scoreboard is added to its container then added to the game div
                scoreboard.appendChild(row);
                let scoreboardDiv = document.createElement('div');
                scoreboardDiv.setAttribute('class', 'scoreboard-container');
                scoreboardDiv.appendChild(scoreboard);
                gameDiv.appendChild(scoreboardDiv);

                // A div is created to contain the buttons and text for the user to chose what to do next
                let nextStageDiv = document.createElement('div');
                nextStageDiv.setAttribute('class', 'next-stage');
                // If the user is using a registered session they can submit their score to the leaderboard otherwise they can only play again
                if(document.querySelector('.icon') == null){
                    // The contents of the div is set and the div is added to the game div
                    nextStageDiv.innerHTML = '<h5>To submit scores you must be a registered player, would you like to </h5><button class = "btn btn-primary play-again">Play Again</button>';
                    gameDiv.appendChild(nextStageDiv);
                }
                else{
                    // The contents of the div is set and the div is added to the game div
                    nextStageDiv.innerHTML = '<h5>Would you like to </h5><button class = "btn btn-primary submit-scores">Submit</button><h5> to the leaderboard or </h5><button class = "btn btn-primary play-again">Play Again</button>';
                    gameDiv.appendChild(nextStageDiv);
                    // The button for submitting scores is retrieved
                    let submitButton = document.querySelector('.submit-scores');
                    // A event listener is added to the button for when it is clicked
                    submitButton.addEventListener('click', ()=>{
                        // A xml http request is created to submit the players scores to the leaderboard
                        let xhttp = new XMLHttpRequest();
                        // The score are turned into a json string
                        let data = JSON.stringify(this.scores);
                        xhttp.onreadystatechange = ()=>{
                            // When the scores have been successfully sent the user is redirected to the leaderboard page
                            if(xhttp.readyState == 4 && xhttp.status == 200){
                                window.location.href = './leaderboard.php';
                            }
                        };
                        
                        // The scores are send via a POST method to leaderboard.php
                        xhttp.open('POST', './leaderboard.php');
                        xhttp.send(data);
                    });
                }
                // The button for playing again is retrieved
                let playAgainButton = document.querySelector('.play-again');
                // A lister is added to the button for when it is clicked
                playAgainButton.addEventListener('click', ()=>{
                    // A xml http request is made to retrieve the level highscores for the player
                    let xhttp = new XMLHttpRequest();

                    xhttp.onreadystatechange = ()=>{
                        if(xhttp.readyState == 4 && xhttp.status == 200){
                            // Once the scores are retrieved a new game is started
                            let game = new Game(JSON.parse(xhttp.responseText));
                            // The background music starts to play
                            backgroundMusic.play();
                            // This set interval loops the background music every 2 minutes
                            repeatMusic = setInterval(()=>{
                                backgroundMusic.pause();
                                backgroundMusic = new Audio('./assets/sounds/background.mp3');
                                backgroundMusic.play();
                            }, 120000);
                        }
                    };
                    // The scores are retrieved by sending a GET request to levelscores.php
                    xhttp.open("GET", "./assets/php/levelscores.php", true);
                    xhttp.send();
                });
            }
        }
        // Finally the score are sent
        xhttp.send(data);
    }
        
}

// The start button is retrieved from the document
let startButton = document.querySelector(".start-button");
// A event listener is added to the button for when it is clicked
startButton.addEventListener('click', this.start);

// Background music and repeat music variables are instantiated;
let backgroundMusic = new Audio('./assets/sounds/background.mp3');
let repeatMusic;

// This function is called when the start button is pressed
function start(){
    // A xml http request is made to retrieve the level highscores for the player
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = ()=>{
        if(xhttp.readyState == 4 && xhttp.status == 200){
            // Once the scores are retrieved a new game is started
            let game = new Game(JSON.parse(xhttp.responseText));
            // The background music starts to play
            backgroundMusic.play();
            // This set interval loops the background music every 2 minutes
            repeatMusic = setInterval(()=>{
                backgroundMusic.pause();
                backgroundMusic = new Audio('./assets/sounds/background.mp3');
                backgroundMusic.play();
            }, 120000);
        }
    };
    // The scores are retrieved by sending a GET request to levelscores.php
    xhttp.open("GET", "./assets/php/levelscores.php", true);
    xhttp.send();
}