function createPlayer(player, move){
    return {
        player: player,
        move: move,
    }
}

const gameModule = (function() {
    let gameScores = [];

    let displayGrid = (num) => {
        const container = document.querySelector(".game-container") 
        for (let i = 0; i < (num * num); i++){
            let cell = document.createElement("div")
            cell.classList.add("cell");
            container.append(cell)
            
        }
    }

    return {
        displayGrid,
    };
})();

gameModule.displayGrid(3);