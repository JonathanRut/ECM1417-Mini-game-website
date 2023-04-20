class Table{
    constructor(pairs, tripples, quads, totalCards, level){
        this.cards = [];
        this.level = level;
        this.guessing = false;
        this.turnedOverCards = [];
        this.remainingCards = pairs + tripples + quads;

        let takenStyles = [];
        let skins = ['green', 'red', 'yellow'];
        let mouths = ['open', 'sad', 'smiling', 'straight', 'surprise', 'teeth'];
        let eyes = ['closed', 'laughing', 'long', 'normal', 'rolling', 'winking'];
        
        for(let i = 0; i < pairs; i++){
            let style;
            let notOriganalStyle;
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
            takenStyles.push(style);

            for(let j = 0; j < 2; j++){
                let card = new Card(style[0], style[1], style[2], 2, this);
                this.cards.push(card);
            }
        }

        for(let i = 0; i < tripples; i++){
            let style = []
            do{
                let skin = skins[Math.floor(Math.random() * skins.length)];
                let mouth = mouths[Math.floor(Math.random() * skins.length)];
                let eye = eyes[Math.floor(Math.random() * eyes.length)];
                style.push(skin, mouth, eye);
            }while(takenStyles.some((takenStyle) => takenStyle.toString() === style.toString()));
            takenStyles.push(style);

            for(let j = 0; j < 3; j++){
                let card = new Card(style[0], style[1], style[2], 3, this);
                this.cards.push(card);
            }
        }

        for(let i = 0; i < quads; i++){
            let style = []
            do{
                let skin = skins[Math.floor(Math.random() * skins.length)];
                let mouth = mouths[Math.floor(Math.random() * skins.length)];
                let eye = eyes[Math.floor(Math.random() * eyes.length)];
                style.push(skin, mouth, eye);
            }while(takenStyles.some((takenStyle) => takenStyle.toString() === style.toString()));
            takenStyles.push(style);

            for(let j = 0; j < 4; j++){
                let card = new Card(style[0], style[1], style[2], 4, this);
                this.cards.push(card);
            }
        }
        
        for(let i = this.cards.length - 1; i > 0; i--){
            let j = Math.floor(Math.random() * (i + 1));
            let temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }

        this.tableDiv = document.querySelector('.card-table');
        let table = document.createElement('table');
        for(let i = 0; i < 2; i++){
            let row = document.createElement('tr');
            for(let j = 0; j < totalCards / 2; j++){
                let card = this.cards[j + totalCards / 2 * i].html;

                let data = document.createElement('td');
                let centreDiv = document.createElement('div');
                centreDiv.setAttribute('class', 'container-centre');
                let cardDiv = document.createElement('div');
                cardDiv.setAttribute('class', 'card-container');

                cardDiv.appendChild(card);
                centreDiv.appendChild(cardDiv);
                data.appendChild(centreDiv);
                row.appendChild(data);
            }
            table.appendChild(row);
        }
        this.tableDiv.appendChild(table);
        this.html = table;
    }

    foundSet(){
        this.remainingCards--;
        if (this.remainingCards == 0){
            this.level.endLevel();   
        }
    }
}

class Card{
    constructor(skin, mouth, eyes, numberToComplete, table){
        this.skin = skin;
        this.mouth = mouth;
        this.eyes = eyes;
        this.numberToComplete = numberToComplete;
        this.table = table;
        let card = document.createElement('div');
        card.setAttribute('class', 'game-card');
        card.addEventListener('click', (event)=>{
            if(!event.target.parentElement.classList.contains('flip')){
                this.html.classList.add('flip');
                if(this.table.guessing){
                    if(this.table.turnedOverCards[0].mouth === this.mouth && this.table.turnedOverCards[0].skin === this.skin && this.table.turnedOverCards[0].eyes === this.eyes){
                        this.table.turnedOverCards.push(this);
                        if(this.table.turnedOverCards.length == this.numberToComplete){
                            for(let i = 0; i < this.table.turnedOverCards.length; i++){
                                this.table.turnedOverCards[i].html.lastChild.style.borderColor = 'lightgreen';
                            }
                            this.table.guessing = false;
                            this.table.turnedOverCards = [];
                            setTimeout((table)=>{table.foundSet()}, 500, this.table);
                            if((Number(document.getElementById('level-score').innerHTML) - 2000) <= 0){
                                document.getElementById('level-score').innerHTML = 0;
                            }
                            else{
                                document.getElementById('level-score').innerHTML = Number(document.getElementById('level-score').innerHTML) - 2000;
                            }
                        }
                        else{
                            this.html.lastChild.style.borderColor = 'orange';
                        }
                    }
                    else{
                        this.table.turnedOverCards.push(this);
                        for(let i = 0; i < this.table.turnedOverCards.length; i++){
                            setTimeout(function(card){card.html.classList.remove('flip')}, 500, this.table.turnedOverCards[i]);
                            this.table.turnedOverCards[i].html.lastChild.style.borderColor = 'red';
                        }
                        this.table.guessing = false;
                        this.table.turnedOverCards = [];
                        if((Number(document.getElementById('level-score').innerHTML) - 2000) <= 0){
                            document.getElementById('level-score').innerHTML = 0;
                            this.table.level.endLevel();
                        }
                        else{
                            document.getElementById('level-score').innerHTML = Number(document.getElementById('level-score').innerHTML) - 2000;
                        }
                    }
                }
                else{
                    this.table.guessing = true;
                    this.table.turnedOverCards.push(this);
                    this.html.lastChild.style.borderColor = 'orange';
                }
            }   
        });
        card.innerHTML = '<div class="front-face"></div><div class="back-face"><div class = "emoji"><img id="skin" src="./assets/images/skin/'+skin+'.png"><img id="eyes" src="./assets/images/eyes/'+eyes+'.png"><img id="skin" src="./assets/images/mouth/'+mouth+'.png"></div></div>';    
        this.html = card;
    }
}

class Level{
    constructor(pairs, triples, quads, totalCards, game){
        this.pairs = pairs;
        this.triples = triples;
        this.quads = quads;
        this.totalCards = totalCards;
        this.game = game;
    }

    startLevel(){
        this.table = new Table(this.pairs, this.triples, this.quads, this.totalCards, this);
        let countDown = setInterval(()=>{
            if(Number(document.getElementById('level-score').innerHTML) - 7 <= 0){
                document.getElementById('level-score').innerHTML = 0;
                clearInterval(countDown);
                this.endLevel();
            }
            document.getElementById('level-score').innerHTML = Number(document.getElementById('level-score').innerHTML) - 7;
        }, 1);
        this.countDown = countDown;
    }

    endLevel(){
        document.getElementById('level-number').innerHTML = Number(document.getElementById('level-number').innerHTML) + 1;
        document.getElementById('overall-score').innerHTML = Number(document.getElementById('overall-score').innerHTML) + Number( document.getElementById('level-score').innerHTML);
        this.game.scores.push(Number(document.getElementById('level-score').innerHTML));
        document.getElementById('level-score').innerHTML = 100000;
        this.table.html.remove();
        clearInterval(this.countDown);
        this.game.nextLevel();
    }
}

class Game{
    constructor(){
        this.scores = [];
        this.levels = [
            new Level(1, 2, 1, 12, this),
            new Level(4, 0, 1, 12, this),
            new Level(2, 0, 2, 12, this),
            new Level(0, 0, 3, 12, this),
            new Level(3, 2, 0, 12, this),
            new Level(0, 4, 0, 12, this),
            new Level(6, 0, 0, 12, this),
            new Level(3, 0, 1, 10, this),
            new Level(1, 0, 2, 10, this),
            new Level(2, 2, 0, 10, this),
            new Level(5, 0, 0, 10, this),
            new Level(2, 0, 1, 8, this),
            new Level(0, 0, 2, 8, this),
            new Level(1, 2, 0, 8, this),
            new Level(4, 0, 0, 8, this),
            new Level(1, 0, 1, 6, this),
            new Level(0, 2, 0, 6, this),
            new Level(3, 0, 0, 6, this)
        ];
        let startButton = document.querySelector(".start-button");
        startButton.remove();
        let gameDiv = document.querySelector("#game");
        gameDiv.innerHTML = "<div class = 'score-bar'><div class='score'><h5>Score: </h5><h5><div id = 'overall-score'>0</div></h5></div></div><div class = 'card-table'></div><div class = 'score-bar'><div class = 'score'><h5>Level </h5><h5><div id='level-number'>1</div></h5><h5>: </h5></h5><h5><div id = 'level-score'>100000</div></h5></div></div>";
        this.levels.pop().startLevel();
    }

    nextLevel(){
        if(this.levels.length == 0){
            console.log(this.scores);
            for(let i = 0; i <= this.scores.length; i++){
                console.log(this.scores[i]);
            }
        }
        else{
            this.levels.pop().startLevel();
        }
    }
        
}


let startButton = document.querySelector(".start-button");
startButton.addEventListener('click', this.start);

function start(){
    let game = new Game();
}
