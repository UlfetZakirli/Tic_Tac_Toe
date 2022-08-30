const cells=document.querySelectorAll('.game-square')
const statusText=document.querySelector("#game-heading")
const restartBtn=document.querySelector('#restart-button')
//added 
document.getElementsByTagName('button')[0].setAttribute('cellIndex','0')
document.getElementsByTagName('button')[1].setAttribute('cellIndex','1')
document.getElementsByTagName('button')[2].setAttribute('cellIndex','2')
document.getElementsByTagName('button')[3].setAttribute('cellIndex','3')
document.getElementsByTagName('button')[4].setAttribute('cellIndex','4')
document.getElementsByTagName('button')[5].setAttribute('cellIndex','5')
document.getElementsByTagName('button')[6].setAttribute('cellIndex','6')
document.getElementsByTagName('button')[7].setAttribute('cellIndex','7')
document.getElementsByTagName('button')[8].setAttribute('cellIndex','8')

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let options = ["", "", "", "", "", "", "", "", ""]
let currentPlayer = "X"
let currentPlayerName = "Player1"
let running = false;

initializeGame()

function initializeGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked))
    restartBtn.addEventListener('click', restartGame)
    statusText.textContent = `${currentPlayerName}'s turn`
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex")
    if (options[cellIndex] != "" || !running) {
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
function changePlayer() {
    currentPlayer=(currentPlayer=="X") ? "O":"X";
    currentPlayerName = (currentPlayerName == "Player1") ? "Player2" : "Player1"
    statusText.textContent = `${currentPlayerName}'s turn`
}

function checkWinner() {
    let roundWon = false
    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]]
        const cellB = options[condition[1]]
        const cellC = options[condition[2]]
        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        statusText.textContent = `${currentPlayerName} wins!`;
        running = false;
        document.getElementById('restart-button').style.display='block'
    } else if (!options.includes("")) {
        statusText.textContent = `Tie Game!`;
        running = false;
        document.getElementById('restart-button').style.display='block'


    } else {
        changePlayer()
    }
}
function restartGame() {
    currentPlayerName = "Player1"
    options = ["", "", "", "", "", "", "", "", ""]
    statusText.textContent = `${currentPlayerName}'s turn`
    cells.forEach(cell => cell.textContent = "")
    running = true;
    document.getElementById('restart-button').style.display='none'

}