localStorage.clear()
console.log("local_storage.js loaded");

const playerOneInput = document.querySelector("#player-one");
const playerTwoInput = document.querySelector("#player-two");
const submitButton = document.querySelector("#submit-names");
const cpuGameButton = document.querySelector('#cpu-game-button');

const startPVPGame = () => {
    const playerOneName = playerOneInput.value;
    const playerTwoName = playerTwoInput.value;

    if (playerOneName == '' || playerTwoName == '') {
        return;
    }

    localStorage.setItem('gameState', 'playerVersusPlayer')

    localStorage.setItem("playerOneName", playerOneName);
    localStorage.setItem("playerTwoName", playerTwoName);

    window.open("./game.htm");
    window.close();
}

const startComputerGame = () => {

    localStorage.setItem('gameState', 'playerVersusComputer')

    window.open('./game.htm');
    window.close();
}

submitButton.addEventListener("click", startPVPGame);
cpuGameButton.addEventListener('click', startComputerGame);