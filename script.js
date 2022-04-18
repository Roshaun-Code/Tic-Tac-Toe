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
                board[e.target.id] == player1.move;
                //renders player move to the screen
                cell.innerHTML = player1.move;
                player1.turn = false;
                player2.turn = true;
                turns++;
                console.log(turns)
            }
            else if (player2.turn == true && winner == null && e.target.innerHTML == ""){
                board[e.target.id] == player2.move;
                cell.innerHTML = player2.move;
                player1.turn = true;
                player2.turn =  false
                turns++;
                console.log(turns)
            } else return;
        })
    })

    function checkWin(boardArray, player){
        let plays = boardArray.reduce((a,e,i) =>
            (e === player) ? a.concat(i) : a, [])

    }
})();

const displayController = (function() {

    //gameModule.helloWorld()
})();