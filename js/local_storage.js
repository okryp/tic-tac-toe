console.log("loaded");

const playerOneInput = document.querySelector("#player-one");
const playerTwoInput = document.querySelector("#player-two");
const submitButton = document.querySelector("#submit-names");

const logInputs = () => {
    const playerOneName = playerOneInput.value;
    const playerTwoName = playerTwoInput.value;

    localStorage.setItem("playerOneName", playerOneName);
    localStorage.setItem("playerTwoName", playerTwoName);

    window.open("./game.htm");
    window.close();
}

submitButton.addEventListener("click", logInputs);