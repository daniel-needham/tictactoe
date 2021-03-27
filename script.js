//player factory function
const Player = (name, team) => {
    const getName = () => name;
    const getTeam = () => team;

    let wins = 0;
    const addWin = () => {
        wins += 1;
        return wins;
    }

    return { getName, getTeam, addWin };
}

const naughts = Player("naughts", "O");
const crosses = Player("crosses", "X");

const gameBoard = (() => {
    let board = ["", "", "",
        "", "", "",
        "", "", ""];

    const state = () => {
        return board;
    }

    const updateState = (newBoard) => {
        board = newBoard;
    }

    //event listener for tiles
    const tileListener = () => {
        const gameboard = document.querySelector("#gameboard");
        const tile = document.querySelectorAll(".tile");
        gameboard.addEventListener("click", (e) => { //add event listener to gameboard div
            if (e.target.className === "tile") { //if class matches then event listener is triggered
                console.log(e.target.id);                                         //this means event listener doesnt need to be reapplied when dom changes
                gameController.play(gameController.getPlayer(), e.target.id)
                displayController.board(gameBoard.state());
                if (gameController.winCheck(gameBoard.state(),gameController.getPlayer().getTeam())){
                    console.log("Win");
                } else {
                gameController.playerToggle();
                displayController.turn();
                }
                
            }
        });
    }

    return {
        state,
        tileListener,
        updateState
    }
})();

const displayController = (() => {

    const gameBoard = document.querySelector("#gameboard");

    //creates tiles in dom and gives index as id
    const tile = (arrayItem, index) => {
        let tile = document.createElement("div");
        tile.setAttribute("class", "tile");
        if (arrayItem === "X") tile.setAttribute("class", "tile cross");
        if (arrayItem === "O") tile.setAttribute("class", "tile naught");
        tile.setAttribute("id", index);
        tile.textContent = arrayItem;
        gameBoard.appendChild(tile);
    }

    //turns board array into gameboard
    const board = (array) => {
        while (gameBoard.lastChild) gameBoard.removeChild(gameBoard.lastChild);
        let index = 0;
        array.forEach(arrayItem => {
            const thing = tile(arrayItem, index); //creates tile and gives index as id
            index++;
        });
    }

    let firstLoad = true;

    //shows the player turn
    const turn = () => {
        const naughtsInd = document.querySelector("#naughts");
        const crossesInd = document.querySelector("#crosses");
        if (firstLoad) {
            naughtsInd.className = "";
            firstLoad = false;
        } else if (gameController.getPlayer() === naughts) {
            crossesInd.className = "fade";
            window.setTimeout(function() {naughtsInd.className = "";}, 230);
        } else {
            naughtsInd.className = "fade";
            window.setTimeout(function() {crossesInd.className = "";}, 230);
        }
    }


    return {
        tile,
        board,
        turn
    }

})();

const gameController = (() => {

    const winningPath = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 5, 8],
        [3, 4, 5],
        [6, 7, 8],
        [2, 4, 6]
    ];

    let player = naughts;

    const getPlayer = () => {
        return player
    }

    const playerToggle = () => {
        console.log(player.getName());
        if (player === crosses) {
            player = naughts;
        } else {
            player = crosses;
        }
        console.log(player.getTeam());
    }

    const play = (player, index) => {
        let selection = player.getTeam();
        let board = gameBoard.state();
        board[index] = selection.toString();  //creates new gameboard array and stores
        gameBoard.updateState(board);
    }

    //used to find all indexs of piece in gameboard
    const getIndexes = (arr, team) => {
        let indexes = [];
        for (let i = 0; i < 9; i++) {
            if (arr[i] === team) indexes.push(i);
        }
        return indexes;
    }



    //check gameboard to see if move has won
    const winCheck = (array, team) => {
        let win = false;
        //returns array of all the indexes X or O is on the gameboard 
        let indexes = gameController.getIndexes(array, team);
        //iterates through winningpath 
        winningPath.some(element => {
            
            let result = element.filter(arr => indexes.includes(arr)); 
            if (result.toString() === element.toString()) {
                win = true;
                console.log(win);
            }
            
        });
        return win
        
        
        
    }

    // let result = winningPath[1].filter(arr => indexes.includes(arr));
    const won = () => {

    }

    return {
        getPlayer,
        playerToggle,
        play,
        getIndexes,
        winCheck,
    }

})();

displayController.board(gameBoard.state());
gameBoard.tileListener();
displayController.turn();
console.log(gameController.getIndexes(gameBoard.state(), "X"))
