let gameMatrix;
let score = 0;
let movesCount = 0;

const startGame = () => {
    document.getElementById("start_page").classList.add("hidden");
    document.querySelector("#game").classList.remove("hidden");

    gameMatrix = [
        ['','','',''],
        ['','','',''],
        ['','','',''],
        ['','','','']
    ];
    score = 0;
    movesCount = 0;

    //renderTiles();
    randomTiles();
    randomTiles();
    renderScore();
    renderMoves();

    document.addEventListener("keydown", logKeyPress)

}

const homePage = () => {
    document.getElementById("game").classList.add("hidden");
    document.getElementById("start_page").classList.remove("hidden");
}

const gameOver = () => {
    console.log("GAME OVER");
    document.removeEventListener("keydown", logKeyPress)
    let loseModal = document.getElementById("lose_modal");
    loseModal.style.display = "block";
    var span = document.getElementById("close_lose_modal");
    span.onclick = function() {
        loseModal.style.display = "none";
    }
}

const gameWon = () => {
    console.log("GAME WON");
    document.removeEventListener("keydown", logKeyPress)
    let winModal = document.getElementById("win_modal");
    winModal.style.display = "block";
    var span = document.getElementById("close_win_modal");
    span.onclick = function() {
        winModal.style.display = "none";
    }
}

const randomTiles = () => {
    console.log("Adding random tile")

    let positionEmpty = false;
    let foundEmptyTile = false;

    for(let j = 0; j < 4; j++){ // check for at least 1 empty tile
        for(let k = 0; k < 4; k++){
            if(gameMatrix[j][k] === ''){
                positionEmpty = true;
                break;
            }
        }
        if(positionEmpty) break;
    }

    console.log(positionEmpty)

    if(positionEmpty){
        while(!foundEmptyTile){
            // pick random x,y 
            randX = Math.floor(Math.random() * (4 - 0) + 0);
            randY = Math.floor(Math.random() * (4 - 0) + 0);
    
            // check matrix if x,y is empty
            if(gameMatrix[randX][randY] === ''){
                // put value in matrix
                gameMatrix[randX][randY] = Math.random() > 0.5 ? 4 : 2;
                console.log(`found empty tile [${randX};${randY}]`);
                foundEmptyTile = true;
            }
        } 
    }

    renderTiles();

}

const renderTiles = () => {
    // write gameMatrix values to tiles
    for(let i=0; i < 4; i++){
        for(let j=0; j < 4; j++){
            tile = document.getElementById(`tile${i}${j}`);
            tile.innerText = gameMatrix[i][j];
            if(gameMatrix[i][j] !== ''){
                tile.setAttribute("class", "")
                tile.classList.add("tile_shape");
                tile.classList.add(`number_${gameMatrix[i][j]}`);
            }
            if(gameMatrix[i][j] === ''){
                tile.setAttribute("class", "");
                tile.classList.add("tile_shape");
            }
            if(gameMatrix[i][j] === 2048){
                gameWon();
            }
        }
    }
}

const renderScore = () => {
    document.getElementById("score").innerText = score;
}
const renderMoves = () => {
    document.getElementById("moves").innerText = movesCount;
}

const leftMovePossible = () => {

    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++) {
            if(j !== 0){
                if(gameMatrix[i][j] === '') continue;
                else if(gameMatrix[i][j-1] === '') return true;
                else if(gameMatrix[i][j-1] === gameMatrix[i][j]) return true;
            }
        }
    }
    return false;

}

const upMovePossible = () => {

    for(let j = 0; j < 4; j++){
        for(let i = 0; i < 4; i++) {
            if(i !== 0){
                if(gameMatrix[i][j] === '') continue;
                else if(gameMatrix[i-1][j] === '') return true;
                else if(gameMatrix[i-1][j] === gameMatrix[i][j]) return true;
            }
        }
    }
    return false;

}

const rightMovePossible = () => {

    for(let i = 0; i < 4; i++){
        for(let j = 3; j >= 0; j--) {
            if(j !== 3){
                if(gameMatrix[i][j] === '') continue;
                else if(gameMatrix[i][j+1] === '') return true;
                else if(gameMatrix[i][j+1] === gameMatrix[i][j]) return true;
            }
        }
    }
    return false;

}

const downMovePossible = () => {

    for(let j = 0; j < 4; j++){
        for(let i = 3; i >= 0; i--) {
            if(i !== 3){
                if(gameMatrix[i][j] === '') continue;
                else if(gameMatrix[i+1][j] === '') return true;
                else if(gameMatrix[i+1][j] === gameMatrix[i][j]) return true;
            }
        }
    }
    return false;

}

const leftMove = () => {

    //check if tile is on the limits of the matrix

    // check if next tile in direction is empty, if yes, current tile can move, also empty current tile
    // check if next tile in direction is of the same value, if yes add them up to the next tile and empty current tile

    for(let idx = 0; idx < 4; idx++){
        for(let i = 0; i < 4; i++){
            for(let j = 0; j < 4; j++){
                if(j !== 0){

                    if(gameMatrix[i][j-1] === ''){
                        gameMatrix[i][j-1] = gameMatrix[i][j];
                        gameMatrix[i][j] = '';
                    }

                }
            }
        }
    }

    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            if(j !== 0){

                if(gameMatrix[i][j] === gameMatrix[i][j-1] && gameMatrix[i][j] !== ''){
                    gameMatrix[i][j-1] += gameMatrix[i][j-1];
                    gameMatrix[i][j] = '';
                    score = score + (gameMatrix[i][j-1]);
                    renderScore();
                }

            }
        }
    }

    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            if(j !== 0){

                if(gameMatrix[i][j-1] === ''){
                    gameMatrix[i][j-1] = gameMatrix[i][j];
                    gameMatrix[i][j] = '';
                }

            }
        }
    }

    renderTiles();
    randomTiles(1);

    movesCount++;
    renderMoves();

    return console.log("LEFT");
    
}
const upMove = () => {

    for(let idx = 0; idx < 4; idx++){
        for(let j = 0; j < 4; j++){
            for(let i = 0; i < 4; i++){
                if(i !== 0){
    
                    if(gameMatrix[i-1][j] === ''){
                        gameMatrix[i-1][j] = gameMatrix[i][j];
                        gameMatrix[i][j] = '';
                    }
    
                }
            }
        }
    }

    for(let j = 0; j < 4; j++){
        for(let i = 0; i < 4; i++){
            if(i !== 0){

                if(gameMatrix[i][j] === gameMatrix[i-1][j] && gameMatrix[i][j] !== ''){
                    gameMatrix[i-1][j] += gameMatrix[i-1][j];
                    gameMatrix[i][j] = '';
                    score = score + (gameMatrix[i-1][j]);
                    renderScore();
                }

            }
        }
    }

    for(let j = 0; j < 4; j++){
        for(let i = 0; i < 4; i++){
            if(i !== 0){

                if(gameMatrix[i-1][j] === ''){
                    gameMatrix[i-1][j] = gameMatrix[i][j];
                    gameMatrix[i][j] = '';
                }

            }
        }
    }

    renderTiles();
    randomTiles(1);

    movesCount++;
    renderMoves();


    return console.log("UP"); 

}
const rightMove = () => {

    for(let idx = 0; idx < 4; idx++){
        for(let i = 0; i < 4; i++){
            for(let j = 3; j >= 0; j--){
                if(j !== 3){
    
                    if(gameMatrix[i][j+1] === ''){
                        gameMatrix[i][j+1] = gameMatrix[i][j];
                        gameMatrix[i][j] = '';
                    }
    
                }
            }
        }
    }

    for(let i = 0; i < 4; i++){
        for(let j = 3; j >= 0; j--){
            if(j !== 3){

                if(gameMatrix[i][j] === gameMatrix[i][j+1] && gameMatrix[i][j] !== ''){
                    gameMatrix[i][j+1] += gameMatrix[i][j+1];
                    gameMatrix[i][j] = '';
                    score = score + (gameMatrix[i][j+1]);
                    renderScore();
                }

            }
        }
    }

    for(let i = 0; i < 4; i++){
        for(let j = 3; j >= 0; j--){
            if(j !== 3){

                if(gameMatrix[i][j+1] === ''){
                    gameMatrix[i][j+1] = gameMatrix[i][j];
                    gameMatrix[i][j] = '';
                }

            }
        }
    }

    randomTiles(1);

    movesCount++;
    renderMoves();

    return console.log("RIGHT");

}
const downMove = () => {

    for(let idx = 0; idx < 4; idx++){
        for(let j = 0; j < 4; j++){
            for(let i = 3; i >= 0; i--){
                if(i !== 3){
    
                    if(gameMatrix[i+1][j] === ''){
                        gameMatrix[i+1][j] = gameMatrix[i][j];
                        gameMatrix[i][j] = '';
                    }
    
                }
            }
        }
    }

    for(let j = 0; j < 4; j++){
        for(let i = 3; i >= 0; i--){
            if(i !== 3){

                if(gameMatrix[i][j] === gameMatrix[i+1][j] && gameMatrix[i][j] !== ''){
                    gameMatrix[i+1][j] += gameMatrix[i+1][j];
                    gameMatrix[i][j] = '';
                    score = score + (gameMatrix[i+1][j]);
                    renderScore();
                }

            }
        }
    }

    for(let j = 0; j < 4; j++){
        for(let i = 3; i >= 0; i--){
            if(i !== 3){

                if(gameMatrix[i+1][j] === ''){
                    gameMatrix[i+1][j] = gameMatrix[i][j];
                    gameMatrix[i][j] = '';
                }

            }
        }
    }

    randomTiles(1);

    movesCount++;
    renderMoves();

    return console.log("DOWN");
    
}

const logKeyPress = (e) => {
    if(e.keyCode === 37){
        if(leftMovePossible()){
            leftMove();
        }
        else if(!leftMovePossible() && !upMovePossible() && !rightMovePossible() && !downMovePossible()){
            gameOver();
        }
    }
    if(e.keyCode === 38){
        if(upMovePossible()){
            upMove();
        }
        else if(!leftMovePossible() && !upMovePossible() && !rightMovePossible() && !downMovePossible()){
            gameOver();
        }   
    }
    if(e.keyCode === 39){
        if(rightMovePossible()){
            rightMove(); 
        }
        else if(!leftMovePossible() && !upMovePossible() && !rightMovePossible() && !downMovePossible()){
            gameOver();
        }
    }
    if(e.keyCode === 40){
        if(downMovePossible()){
            downMove();
        }
        else if(!leftMovePossible() && !upMovePossible() && !rightMovePossible() && !downMovePossible()){
            gameOver();
        }
    }

}
