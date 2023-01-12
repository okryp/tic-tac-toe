const returnRandomNumber = () => {
    return Math.floor(Math.random() * 9);
}

const generateBotTurn = (opponentIcon) => {
    let randomIndex = -1;
    while (grid[randomIndex] != 0) {
        randomIndex = returnRandomNumber();
    }
    console.log(randomIndex);
    console.log(opponentIcon);
    grid[randomIndex] = opponentIcon;
}