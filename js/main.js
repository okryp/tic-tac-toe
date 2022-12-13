const tiles = document.querySelectorAll("#container > div");
const iconTurn = document.querySelector("#icon"); 
const turnIndicator = document.querySelector("#turn-indicator")
const gameStartModal = document.querySelector("#game-start-modal");
const modalParagraph = document.querySelector(".modal-content > p");
const playerOneNameDisplay = document.querySelector("#player-1-name");
const playerTwoNameDisplay = document.querySelector("#player-2-name");
const playerOneScoreDisplay = document.querySelector("#player-1-points");
const playerTwoScoreDisplay = document.querySelector("#player-2-points");

const playerOneName = localStorage.getItem("playerOneName");
const playerTwoName = localStorage.getItem("playerTwoName");

// Player scores display functions
playerOneNameDisplay.innerHTML = playerOneName;
playerTwoNameDisplay.innerHTML = playerTwoName;

let icon = 0;		// Used as check for who's turn it is.
let playerOneChoice = 0;
let crossScore = 0,
	circleScore = 0;
let tieChecker = 0;
let winner = 0;
let grid = [
	0, 0, 0,
	0, 0, 0,
	0, 0, 0
];

let ySum = 0;
let xSum = 0;
let diagonalSumUD; //UP -> DOWN
let diagonalSumDU; //DOWN -> UP

const checkSums = () => {
	// Checks for potential vertical victories
	for (let j = 0; j < 3; j++) {
		ySum = 0;
		for (let i = j; i < grid.length; i+=3) {
			ySum += grid[i];
			if (ySum == 3 || ySum == -3) {
				return ySum;
			}
		}	
	}
	// Checks for potential horizontal victories
	for (let j = 0; j < grid.length; j+=3) {
		xSum = 0;
		for (let i = j; i < j+3; i++) {
			xSum += grid[i];
			if (xSum == 3 || xSum == -3) {
				return xSum;
			}
		}
	}
	// Checks for potential diagonal vicotories
	diagonalSumUD = (grid[0] + grid[4] + grid[8]) //UP -> DOWN
	diagonalSumDU = (grid[6] + grid[4] + grid[2]) //DOWN -> UP
	if (diagonalSumDU == 3 || diagonalSumUD == 3) {
		return diagonalSumDU;
	}
	if (diagonalSumUD == -3 || diagonalSumUD == -3) {
		return diagonalSumUD;
	}
}

const updateGrid = () => {
	/**
	 * Circle = 1
	 * Cross = -1
	 */
	tiles.forEach((element, index) => {
		if (element.classList.contains("circle") && grid[index] == 0) {
			grid[index] += 1;
		} else if (element.classList.contains("cross") && grid[index] == 0) {
			grid[index] -= 1;
		} 
	})
}

const updateScores = () => {
	playerOneNameDisplay.classList = null;
	playerTwoNameDisplay.classList = null;
	if (playerOneChoice == 1) {
		playerOneScoreDisplay.innerHTML = crossScore;
		playerTwoScoreDisplay.innerHTML = circleScore;
		playerOneNameDisplay.classList = "red";
		playerTwoNameDisplay.classList = "blue";
	} else {
		playerOneScoreDisplay.innerHTML = circleScore;
		playerTwoScoreDisplay.innerHTML = crossScore;
		playerOneNameDisplay.classList = "blue";
		playerTwoNameDisplay.classList = "red";	
	}
}

const checkVictory = () => {
	checkSums();
	if (ySum == 3 || xSum == 3 || diagonalSumUD == 3 || diagonalSumDU == 3) {
		displayVictoryModal(playerOneName.toUpperCase());
		circleScore += 1;
		updateScores();
		return;
	} else if (ySum == -3 || xSum == -3 || diagonalSumUD == -3 || diagonalSumDU == -3) {
		displayVictoryModal(playerTwoName.toUpperCase());
		crossScore += 1;
		updateScores();
		return;
	}
	tieChecker++;
	if (tieChecker == 9) {
		displayVictoryModal();
		return;
	}
}

tiles.forEach((element, index) => {
	tiles[index].addEventListener("click", () => {
		/**
		 * Ternary Operator added to remove switch case bloat.
		 * Code looked over by teacher.
		 */
		if (element.classList.contains("empty") || (!element.classList.contains("cross") && !element.classList.contains("circle"))) {
			element.classList = (icon === 0) ? "circle" : "cross";
			updateGrid();
			checkVictory();
			iconTurn.classList = (icon === 0) ? "cross" : "circle";
			icon = (icon === 0) ? 1 : 0;
		}
	});
}); 

const displayVictoryModal = (winner) => {
	document.querySelector("#winner-modal").style.display = "block";
	if (tieChecker == 9) {
		document.querySelector(".modal-content > p").innerHTML = "<h1>IT'S A TIE!</h1>"
		return;
	}
	document.querySelector(".modal-content > p").innerHTML = "<h1>" + winner + " WON</h1>"
}

const choosePlayer = (element) => {
	gameStartModal.style.display = "none";
	iconTurn.classList = element.target.id
	if (element.target.id == "cross") {
		icon = 1;
		playerOneChoice = 1;
	}
	turnIndicator.style.display = "block";
	updateScores();
}

const restartGame = () => {
	grid = [
		0, 0, 0,
		0, 0, 0,
		0, 0, 0
	]
	tiles.forEach((element) => {
		element.classList = "empty"
	})
	tieChecker = 0;
}

// On load related
turnIndicator.style.display = "none";
document.querySelector("#replay").addEventListener("click", () => {
	document.querySelector("#winner-modal").style.display = "none";
	restartGame();
})
document.querySelector("#circle").addEventListener("click", choosePlayer);
document.querySelector("#cross").addEventListener("click", choosePlayer);


			// -=^-^=- FANCY MEOW CERTIFIED (Phoebe)