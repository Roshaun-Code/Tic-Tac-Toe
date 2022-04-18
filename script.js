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

    function switchP(e){
        
    }
    //function to check if a players wins
    function checkWin(){
        let p1 = board.reduce((a,e,i) =>
        (e === player1.move) ? a.concat(i) : a, [])

        let p2 = board.reduce((a,e,i) => 
        (e === player2.move) ? a.concat(i) : a, [])

        for (let [index, win] of winCombos.entries()){
            if (win.every(elem => p1.indexOf(elem) > -1)){
                gameModule.winner = "player1";
            } else if (win.every(elem => p2.indexOf(elem) > -1)){
                gameModule.winner = "player2";
            } else if (gameModule.winner == null && turns == 9){
                gameModule.winner = "tie";
            }
        }
        console.log(turns, gameModule.winner)
        return gameModule.winner
    }

    function gameOver(){
        if (gameModule.winner != null){
            player1.turn = false
            player2.turn = false
        }
    }
    return {board};
})();

const displayController = (function() {

    //gameModule.helloWorld()
})();