window.onload = function() {
	var gameBoard = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]];
	var htmlGameBoard = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]];
	var DIR_LEFT = 0;
	var DIR_RIGHT = 1;
	var DIR_UP = 2;
	var DIR_DOWN = 3;

	var maxDouble = 0;
	var score = 0;
	var freeSpaces = 16;

	document.getElementById('start').onclick = Game2048();


	function Game2048() {
		setup();
		gameLoop();
	}

	function setup() {

		for (var row = 0; row < 4; row++) {
			for (var col = 0; col < 4; col++) {
				gameBoard[row][col] = 0;
			};
		};

		var _board = document.getElementsByClassName('row');

		for (var row = 0; row < 4; row++) {
			var children = _board[row].children;
			for (var col = 0; col < 4; col++) {
				htmlGameBoard[row][col] = children[col];
			};
		};
	}

	function gameLoop() {

		for (var row = 0; row < 4; row++) {
			for (var col = 0; col < 4; col++) {
				htmlGameBoard[row][col].innerHTML = gameBoard[row][col];
			};
		};

		requestAnimationFrame(gameLoop)
	}

	function generateNumber() {
		if (freeSpaces > 0) {

			var row = Math.floor(Math.random()*4);
			var col = Math.floor(Math.random()*4);

			while (gameBoard[row][col] !== 0){
				row = Math.floor(Math.random()*4);
				col = Math.floor(Math.random()*4);
			}

			gameBoard[row][col] = Math.random() >= 0.9 ? 2 : 4;
			freeSpaces--;
			return true;
		}

		return false;
	}

	function move(dir) {
		var line;
		var move = false;

		for (var index = 0; index < 4; index++) {
			line = getLine(dir,index);
			line = solveLine(line);
			setLine(dir, index, line);
		}
	}

	function getLine(dir, index) {
		if (dir === DIR_LEFT || dir === DIR_RIGHT) 
			return getRow(dir, index);
		else if (dir === DIR_UP || dir === DIR_DOWN) 
			return getCol(dir, index);

		return null;
	}

	function setLine(dir, index, temp) {
		if (dir === DIR_LEFT) {
			gameBoard[index][0] = temp[3];
			gameBoard[index][1] = temp[2];
			gameBoard[index][2] = temp[1];
			gameBoard[index][3] = temp[0];
		} else if (dir === DIR_RIGHT) {
			gameBoard[index][0] = temp[0];
			gameBoard[index][1] = temp[1];
			gameBoard[index][2] = temp[2];
			gameBoard[index][3] = temp[3];
		} else if (dir === DIR_UP) {
			gameBoard[0][index] = temp[3];
			gameBoard[1][index] = temp[2];
			gameBoard[2][index] = temp[1];
			gameBoard[3][index] = temp[0];
		} else if (dir === DIR_DOWN) {
			gameBoard[0][index] = temp[0];
			gameBoard[1][index] = temp[1];
			gameBoard[2][index] = temp[2];
			gameBoard[3][index] = temp[3];
		}
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
		} else if (dir === DIR_DOWN) {
			for (var row = 3; row >= 0; row--) {
				if (gameBoard[row][col] !== 0) {
					temp[index] = gameBoard[row][col];
					index--;
				};
			};
		}

		return temp;
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
		for (var index = 3; index >= 1; index--) {
			try {
				if (line[index] === line[index - 1]) {
					line[index] *= 2;
					line[index - 1] = 0;

					score += line[index];
					if (line[index] > maxDouble) maxDouble = line[index];
				}
				line = flushLine(line);
			} catch (ex) {}
		}

		return line;
	}
}