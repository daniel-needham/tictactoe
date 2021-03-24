const gameBoard = (() => {
    let board = ["O", "2", "3",
        "X", "5", "6",
        "7", "8", "9"];

    // const display = () => {
    //     console.log(board.slice(0,3) + "\n" + board.slice(3,6) + "\n" + board.slice(6,9));
    // }

    const state = () => {
        return board;
    }

    const updateState = (newBoard) => {
        board = newBoard;
    }

    //Event listeners for all buttons
    // const tileListener = () => {
    // const tile = document.querySelectorAll(".tile"); //this creats a node list which acts similarly to an array
    // tile.forEach((button) => {  //for.Each adds event listener to button in node list 
    //     button.addEventListener("click", () => {
    //         console.log(button.id);
    //         gameController.play(dan, button.id)
    //         displayController.board(gameBoard.state());
    //     });

    // });
    // }

    const tileListener = () => {
        const gameboard = document.querySelector("#gameboard"); //this creats a node list which acts similarly to an array
        const tile = document.querySelectorAll(".tile");
        gameboard.addEventListener("click", (e) => {
            if (e.target.className === "tile") {
                console.log(e.target.id);
                gameController.play(dan, e.target.id)
                displayController.board(gameBoard.state());
            }
            console.log();
        })
    }

    return {
        // display,
        state,
        tileListener,
        updateState
    }
})();

const displayController = (() => {

    const gameBoard = document.querySelector("#gameboard");

    const tile = (arrayItem, index) => {
        let tile = document.createElement("div");
        tile.setAttribute("class", "tile");
        if (arrayItem === "X") tile.setAttribute("class", "tile cross");
        if (arrayItem === "O") tile.setAttribute("class", "tile naught");
        tile.setAttribute("id", index);
        tile.textContent = arrayItem;
        gameBoard.appendChild(tile);
    }
    const board = (array) => {
        while (gameBoard.lastChild) gameBoard.removeChild(gameBoard.lastChild);
        let index = 0;
        array.forEach(arrayItem => {
            const thing = tile(arrayItem, index);
            index++;
        });
    }

    return {
        tile,
        board
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

    const play = (player, index) => {
        let selection = player.getTeam();
        let board = gameBoard.state();
        board[index] = selection.toString();
        gameBoard.updateState(board);
    }

    return {
        play
    }

})();

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

displayController.board(gameBoard.state());
gameBoard.tileListener();
const dan = Player("dan", "X");