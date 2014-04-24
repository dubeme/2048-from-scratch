var gameBoard = [
	[2,2,4,4],
	[0,0,4,4],
	[2,0,4,4],
	[4,0,4,2]
];
var DIR_LEFT = 0;
var DIR_RIGHT = 1;
var DIR_UP = 2;
var DIR_DOWN = 3;

function Game2048() {
	
}

function move(dir) {
	var line;
	var move = false;

	for (var index = 0; index < 4; index++ {
		line = getLine(dir,index);
		move = solveLine(line);
		setRow(dir, index, line);
	}
}

function getLine(dir, index) {
	if (dir === DIR_LEFT || dir === DIR_RIGHT) 
		return getRow(dir, index);
	else if (dir === DIR_UP || dir === DIR_DOWN) 
		return getCol(dir, index);

	return null;
}

function getRow(dir, row) {
	var temp = [0,0,0,0];
	var index = 3;

	if (dir === DIR_LEFT) {
		for (var col = 0; col < 4; col++) {
			if (gameBoard[row][col] !== 0) {
				temp[index] = gameBoard[row][col];
				index--;
			};
		};
	} else if (dir === DIR_RIGHT) {
		for (var col = 3; col >= 0; col--) {
			if (gameBoard[row][col] !== 0) {
				temp[index] = gameBoard[row][col];
				index--;
			};
		};
	}

	return temp;
}

function getCol(dir, col) {
	var temp = [0,0,0,0];
	var index = 3;

	if (dir === DIR_UP) {
		for (var row = 0; row < 4; row++) {
			if (gameBoard[row][col] !== 0) {
				temp[index] = gameBoard[row][col];
				index--;
			};
		};
	} else if (dir === DIR_RIGHT) {
		for (var row = 3; row >= 0; row--) {
			if (gameBoard[row][col] !== 0) {
				temp[index] = gameBoard[row][col];
				index--;
			};
		};
	}

	return temp;
}

function setRow(dir, row, temp) {
	if (dir === DIR_LEFT) {
		gameBoard[row][0] = temp[3];
		gameBoard[row][1] = temp[2];
		gameBoard[row][2] = temp[1];
		gameBoard[row][3] = temp[0];
	} else if (dir === DIR_RIGHT) {
		gameBoard[row][0] = temp[0];
		gameBoard[row][1] = temp[1];
		gameBoard[row][2] = temp[2];
		gameBoard[row][3] = temp[3];
	}
}

function setCol(dir, col, temp) {
	if (dir === DIR_UP) {
		gameBoard[row][0] = temp[3];
		gameBoard[row][1] = temp[2];
		gameBoard[row][2] = temp[1];
		gameBoard[row][3] = temp[0];
	} else if (dir === DIR_DOWN) {
		gameBoard[row][0] = temp[0];
		gameBoard[row][1] = temp[1];
		gameBoard[row][2] = temp[2];
		gameBoard[row][3] = temp[3];
	}
}

function flushLine(line) {
	var temp = [0,0,0,0];
	var index = 3;

	for (var _index = 3; _index >= 0; _index--) {
		if (line[_index] !== 0) {
			temp[index] = line[_index];
			index--;
		};
	};

	return temp;
}

function solveLine(line) {
	var move = false;

	for (var index = 3; index >= 1; index--) {
		try {
			if (temp[index] === temp[index - 1]) {
				temp[index] *= 2;
				temp[index - 1] = 0;
				// TODO: react to move
				move = true;
			}
			line = flushLine(line);
		} catch (ex) {}
	};
}

console.log("Before");
gameBoard.forEach(function(item) { console.log(item) });


function moveDown() {
	var move = false;

	for (var col = 0; col < 4; col++) {
		var temp = [0,0,0,0];
		var rowToPlaceNewNumber = 3;

		// Move all the numbers down
		for (var row = 3, _index = 3; row >= 0; row--)
			if (gameBoard[row][col] !== 0)
				temp[_index--] = gameBoard[row][col];

		// Start from the 2nd to last row, then move up
		for (var row = 2; row >= 0; row--) {
			try {
				if (temp[row] !== 0) {
					// If the numbers match
					if (temp[row] === temp[rowToPlaceNewNumber]) {
						temp[rowToPlaceNewNumber] *= 2;
						temp[row] = 0;
						rowToPlaceNewNumber -= 1;		// Move up 2 rows
						row--;
						// TODO: react to move
						move = true;
					}
					else if (temp[rowToPlaceNewNumber] === 0) {
						temp[rowToPlaceNewNumber] = temp[row];
						temp[row] = 0;
						rowToPlaceNewNumber -= 1;		// Move up 1 row
						move = true;
					} else {
						rowToPlaceNewNumber -= 1;
					}
				}
			} catch (ex) {}
		}

		gameBoard[0][col] = temp[0];
		gameBoard[1][col] = temp[1];
		gameBoard[2][col] = temp[2];
		gameBoard[3][col] = temp[3];
	}

	return move;
}

function moveRight(){
	var move = false;

	for (var col = 0; col < 4; col++) {
		var temp = [0,0,0,0];
		var rowToPlaceNewNumber = 3;

		// Move all the numbers down
		for (var row = 3, _index = 3; row >= 0; row--)
			if (gameBoard[row][col] !== 0)
				temp[_index--] = gameBoard[row][col];

		// Start from the 2nd to last row, then move up
		for (var row = 2; row >= 0; row--) {
			try {
				if (temp[row] !== 0) {
					// If the numbers match
					if (temp[row] === temp[rowToPlaceNewNumber]) {
						temp[rowToPlaceNewNumber] *= 2;
						temp[row] = 0;
						rowToPlaceNewNumber -= 2;		// Move up 2 rows
						// TODO: react to move
						move = true;
					}
					else if (temp[rowToPlaceNewNumber] === 0) {
						temp[rowToPlaceNewNumber] = temp[row];
						temp[row] = 0;
						rowToPlaceNewNumber -= 1;		// Move up 1 row
						move = true;
					} else {
						rowToPlaceNewNumber -= 1;
					}
				}
			} catch (ex) {}
		}

		gameBoard[0][col] = temp[0];
		gameBoard[1][col] = temp[1];
		gameBoard[2][col] = temp[2];
		gameBoard[3][col] = temp[3];
	}

	return move;
}

function moveUp() {
	var move = false;

	for (var col = 0; col < 4; col++) {
		var temp = [0,0,0,0];
		var rowToPlaceNewNumber = 3;

		// Move the current colum into temp in reverse order
		for (var row = 0, _index = 3; row < 4; row++)
			if (gameBoard[row][col] !== 0)
				temp[_index--] = gameBoard[row][col];

		// Start from the 2nd to last row, then move up
		for (var row = 2; row >= 0; row--) {
			try {
				if (temp[row] !== 0) {
					// If the numbers match
					if (temp[row] === temp[rowToPlaceNewNumber]) {
						temp[rowToPlaceNewNumber] *= 2;
						temp[row] = 0;
						rowToPlaceNewNumber -= 2;		// Move up 2 rows
						// TODO: react to move
						move = true;
					}
					else if (temp[rowToPlaceNewNumber] === 0) {
						temp[rowToPlaceNewNumber] = temp[row];
						temp[row] = 0;
						rowToPlaceNewNumber -= 1;		// Move up 1 row
						move = true;
					} else {
						rowToPlaceNewNumber -= 1;
					}
				}
			} catch (ex) {}
		}

		gameBoard[0][col] = temp[0];
		gameBoard[1][col] = temp[1];
		gameBoard[2][col] = temp[2];
		gameBoard[3][col] = temp[3];
	}

	return move;
}

function moveLeft(){
	var move = false;

	for (var col = 0; col < 4; col++) {
		var temp = [0,0,0,0];
		var rowToPlaceNewNumber = 3;

		// Move all the numbers down
		for (var row = 3, _index = 3; row >= 0; row--)
			if (gameBoard[row][col] !== 0)
				temp[_index--] = gameBoard[row][col];

		// Start from the 2nd to last row, then move up
		for (var row = 2; row >= 0; row--) {
			try {
				if (temp[row] !== 0) {
					// If the numbers match
					if (temp[row] === temp[rowToPlaceNewNumber]) {
						temp[rowToPlaceNewNumber] *= 2;
						temp[row] = 0;
						rowToPlaceNewNumber -= 2;		// Move up 2 rows
						// TODO: react to move
						move = true;
					}
					else if (temp[rowToPlaceNewNumber] === 0) {
						temp[rowToPlaceNewNumber] = temp[row];
						temp[row] = 0;
						rowToPlaceNewNumber -= 1;		// Move up 1 row
						move = true;
					} else {
						rowToPlaceNewNumber -= 1;
					}
				}
			} catch (ex) {}
		}

		gameBoard[0][col] = temp[0];
		gameBoard[1][col] = temp[1];
		gameBoard[2][col] = temp[2];
		gameBoard[3][col] = temp[3];
	}

	return move;
}

while(moveDown()){
	console.log("After")
	gameBoard.forEach(function(item) { console.log(item) });;
}