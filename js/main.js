const tiles = document.querySelectorAll("#container > div");
const iconTurn = document.querySelector("#icon");

/**
 * Used for the switch case.
 * Defines who's turn it is.
 */
let icon = 0;
let tieChecker = 0
let grid = [
	0, 0, 0,
	0, 0, 0,
	0, 0, 0
];

let ySum = 0;
let xSum = 0;
let diagonalSumUD; //UP -> DOWN
let diagonalSumDU; //DOWN -> UP

const verticalCheckSum = () => {
	for (let j = 0; j < 3; j++) {
		ySum = 0;
		for (let i = j; i < grid.length; i+=3) {
			ySum += grid[i];
			console.log("GRID[y]:",grid[i], i);
			console.log("ySUM", ySum);

			if (ySum == 3 || ySum == -3) {
				return ySum;
			}
		}	
	}
}

const horizontalCheckSum = () => {
	for (let j = 0; j < grid.length; j+=3) {
		xSum = 0;
		for (let i = j; i < j+3; i++) {
			xSum += grid[i];
			console.log("GRID[x]: ", grid[i], i);
			console.log("xSUM: ", xSum);

			if (xSum == 3 || xSum == -3) {
				return xSum;
			}
		}
	}
}

const diagonalCheckSum = () => {
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
		// console.log(element, index)
		if (element.classList.contains("circle") && grid[index] == 0) {
			grid[index] += 1;
		} else if (element.classList.contains("cross") && grid[index] ==0) {
			grid[index] -= 1;
		} 
	})
	console.log("Current grid:\n", grid);
}

const checkVictory = () => {
	verticalCheckSum();
	horizontalCheckSum();
	diagonalCheckSum();
	if (ySum == 3 || xSum == 3 || diagonalSumUD == 3 || diagonalSumDU == 3) {
		alert("circle wins")
		return;
	} else if (ySum == -3 || xSum == -3 || diagonalSumUD == -3 || diagonalSumDU == -3) {
		alert("cross wins");
		return;
	}
	
	grid.forEach((element) => {
		if (element != 0) {tieChecker += 1}
	})
	console.log("tiechecker: ", tieChecker)
	if (tieChecker == 45) {
		alert("It's a tie!");
		return;
	}
}

tiles.forEach((element, index) => {
	tiles[index].addEventListener("click", () => {
		/** 			
		 * 	Only allows to "click" on a tile if it's empty and doesn't contain the cross or circle class
		 * 	This was the only way i could get it to not break the rules of the game.
		 * 	More optimisation highly possible, looking into it in the future.
		*/
		switch(icon) {
		case 0:
			if (element.classList.contains("empty") || (!element.classList.contains("cross") && !element.classList.contains("circle"))) {
				element.classList = "circle";
				updateGrid();
				checkVictory();
				iconTurn.classList = "cross";
				icon = 1;
				break;
			} else {
				console.log("contains char")
			}
		case 1:
			if (element.classList.contains("empty") || (!element.classList.contains("cross") && !element.classList.contains("circle"))) {
				element.classList = "cross";
				updateGrid();
				checkVictory();
				iconTurn.classList = "circle";
				icon = 0;
				break;
			} else {
				console.log("contains char");
			}
		}
	});
}); 

/**
 * Check if anyone has won by going through all possible win conditions
 * (3 horizonal, 3 vertical, 2 diagonal)
 */
//  const checkWin = (player) => {
// 	let playerSum = 3;
// 	while (playerSum > -3) {
// 		// DIAGONAL CHECK
// 		if ((grid[0][0] + grid[1][1] + grid [2][2]) == playerSum) {
// 			console.log(player, "wins | Top Left - Bottom Right");
// 			return;
// 		} else if ((grid[0][2] + grid[1][1] + grid[2][0] == playerSum)) {
// 			console.log(player, "wins | Top Right - Bottom Left");
// 			return;
// 		}
// 		// HORIZTAL && VERTICAL CHECK
// 		for (let i = 0; i <= 2; i++) {
// 			if (checkSum(grid[i] === playerSum)) {
// 				console.log(player, "wins | Horizontal Line");
// 				return;
// 			}
// 			for (let j = 0; i <= 2; j++) {
// 				let ySum = 0;
// 				ySum += grid[i][j];
// 				if (ySum == playerSum) {
// 					console.log(player, "wins | Vertical Line");
// 					return;
// 				}
// 			}
// 		}
// 	playerSum -= 6;
// 	}
// 	return;
// }

// First move will be circle thus i set the class here for it to show up on site load
iconTurn.classList = "circle";