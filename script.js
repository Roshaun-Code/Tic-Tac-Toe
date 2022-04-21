const gameModule = (function() {
    function createPlayer(player, move, turn){
        return {
            player: player,
            move: move,
            turn: turn
        }
    }

    const player1 = createPlayer("player1", "X", true);
    const player2 = createPlayer("player2", "O", false);

    let board = [];

    let turns = 0;

    let winner = null;

    let playerMove = [];

    //this will turn true whenever a winner is decided
    let gameStatus = false;

    //win combinations
    const winCombos = [
        [0,1,2],
        [0,3,6],
        [3,4,5],
        [6,7,8],
        [1,4,7],
        [2,4,6],
        [2,5,8],
        [0,4,8]
    ];

    //player move
    let cells = document.querySelectorAll(".cell")
    cells.forEach(cell => {
        cell.addEventListener('click', (e) => {
            if (player1.turn == true && winner == null && e.target.innerHTML == ""){
                //adds the player move to the array
                board[e.target.id] = player1.move;
                //renders player move to the screen
                cell.innerHTML = player1.move
                player1.turn = false;
                player2.turn = true;
                console.log(board)
            }
            else if (player2.turn == true && winner == null && e.target.innerHTML == ""){
                board[e.target.id] = player2.move
                cell.innerHTML = player2.move;
                player1.turn = true;
                player2.turn =  false
                console.log(board)
            } else return;
            turns++;
            checkWin();
            gameOver();
        })
    })

    //function to check if a players wins
    function checkWin(){
        let p1 = board.reduce((a,e,i) =>
        (e === player1.move) ? a.concat(i) : a, [])

        let p2 = board.reduce((a,e,i) => 
        (e === player2.move) ? a.concat(i) : a, [])

        for (let [index, win] of winCombos.entries()){
            if (win.every(elem => p1.indexOf(elem) > -1)){
                gameModule.winner = "player1";
                gameModule.playerMove = win;
                gameModule.gameStatus = true;
            } else if (win.every(elem => p2.indexOf(elem) > -1)){
                gameModule.winner = "player2";
                gameModule.playerMove = win;
                gameModule.gameStatus = true;
            } else if (gameModule.winner == null && turns == 9){
                gameModule.winner = "tie";
                gameModule.playerMove = win;
                gameModule.gameStatus = true;
            }
        }
        console.log(turns, gameModule.winner)
        displayController.winnerDisplay();
        setTimeout(displayController.removeClass, 5000)

        return gameModule.winner
    }

    function gameOver(){
        if (gameModule.winner != null){
            player1.turn = false
            player2.turn = false
        }

    }

    gameReset = () => {
        gameModule.gameStatus = false;
        player1.turn = true;
        player2.turn = false;
        turns = 0;
        gameModule.winner = null;
        board.splice(0, board.length)
        console.log("reset")
    }
    return {board, gameReset, gameStatus, gameOver, winner, playerMove};
})();

const displayController = (function() {
    const body = document.body
    const resetButton = document.querySelectorAll(".reset")
    const cells = document.querySelectorAll(".cell")
    const winner = document.querySelector(".display-winner")

    function gameReplay(){
        cells.forEach(cell => {
            cell.textContent = ''
        })
        gameModule.gameReset()
    }
    
    // let winnerDisplay = () => {
    //     if (gameModule.winner === "player1"){
    //         const winnerScreen = document.createElement("div")
    //         winnerScreen.classList.add("display-winner");
    //         winnerScreen.innerText = "Player 1 wins!"
    //         body.appendChild(winnerScreen)
    //     } else if (gameModule.winner === "player2"){
    //         const winnerScreen = document.createElement("div")
    //         winnerScreen.classList.add("display-winner");
    //         winnerScreen.innerText = "Player 2 wins!"
    //         body.appendChild(winnerScreen)
    //     } else if (gameModule.winner === "tie"){
    //         const winnerScreen = document.createElement("div")
    //         winnerScreen.classList.add("display-winner");
    //         winnerScreen.innerText = "Its a tie!"
    //         body.appendChild(winnerScreen);
    //     } else return
    // }

    let winnerDisplay = () => {
        for (let i = 0; i < gameModule.playerMove.length; i++){
            let moves = document.getElementById(gameModule.playerMove[i])
            moves.classList.add("selected-cells")
        }

        if (gameModule.winner == "player1"){
            winner.classList.add("active")
            winner.innerText = "Player 1 wins!"
        }else if (gameModule.winner == "player2"){
            winner.classList.add("active")
            winner.innerText = "Player 2 wins!"
        }else if (gameModule.winner == "tie"){
            winner.classList.add("active")
            winner.innerText = "Its a tie!"
        } else return
    }

    let removeClass = () => {
        if (winner.classList.contains("active")){
            winner.classList.remove("active")
            winner.innerText = ""
        } else return
    }

    resetButton.forEach((button) => {
        button.addEventListener("click", () => {
            gameReplay()
            for (let i = 0; i < gameModule.playerMove.length; i++){
                let moves = document.getElementById(gameModule.playerMove[i])
                moves.classList.remove("selected-cells")
            }
        })
    })
    //resetButton.addEventListener("click", gameReplay)
    return {winnerDisplay, removeClass}
})();