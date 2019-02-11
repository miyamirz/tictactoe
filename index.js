/**
 * This program is a boilerplate code for the standard tic tac toe game
 * Here the “box” represents one placeholder for either a “X” or a “0”
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 *
 * Below are the tasks which needs to be completed:
 * Imagine you are playing with the computer so every alternate move should be done by the computer
 * X -> player
 * O -> Computer
 *
 * Winner needs to be decided and has to be flashed
 *
 * Extra points will be given for approaching the problem more creatively
 *
 */

let grid,
	counter = 0,
	finished = false;
const GRID_LENGTH = 3;
let turn = 'X';
let initialTurn = true;
function initializeGrid() {
	grid = [];
	for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
		const tempArray = [];
		for (let rowidx = 0; rowidx < GRID_LENGTH; rowidx++) {
			tempArray.push(0);
		}
		grid.push(tempArray);
	}
}

function getRowBoxes(colIdx) {
	let rowDivs = '';
	for (let rowIdx = 0; rowIdx < GRID_LENGTH; rowIdx++) {
		let additionalClass = 'darkBackground';
		let content = '';
		const sum = colIdx + rowIdx;
		if (sum % 2 === 0) {
			additionalClass = 'lightBackground';
		}
		const gridValue = grid[colIdx][rowIdx];
		if (gridValue === 1) {
			content = '<span class="cross">X</span>';
		} else if (gridValue === 2) {
			content = '<span class="cross">O</span>';
		}
		rowDivs =
			rowDivs +
			'<div colIdx="' +
			colIdx +
			'" rowIdx="' +
			rowIdx +
			'" class="box ' +
			additionalClass +
			'">' +
			content +
			'</div>';
	}
	return rowDivs;
}

function getColumns() {
	let columnDivs = '';
	for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
		let coldiv = getRowBoxes(colIdx);
		coldiv = '<div class="rowStyle">' + coldiv + '</div>';
		columnDivs = columnDivs + coldiv;
	}
	return columnDivs;
}

function renderMainGrid() {
	const parent = document.getElementById('grid');
	const columnDivs = getColumns();
	parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
	if (!finished) {
		var rowIdx = this.getAttribute('rowIdx');
		var colIdx = this.getAttribute('colIdx');
		initialTurn = false;
		if (grid[colIdx][rowIdx] == 0) {
			let newValue = turn == 'X' ? 1 : 2;
			grid[colIdx][rowIdx] = newValue;
			counter++;
			renderMainGrid();
			addClickHandlers();
			let gameWon = checkWinner();
			if (gameWon) {
				console.log('game won by : ' + gameWon);
				let winner = gameWon == 1 ? 'Player' : 'Computer';
				// appStarter();
				var msg = {
					lbl: `won by : ${winner}`,
					type: 'win'
				};
				showPopup(msg);
				finished = true;
			} else {
				if (counter == 9) {
					showPopup({ lbl: 'Match Drawn', type: 'drawn' });
				} else {
					changeTurn();
				}
			}
		} else {
			alert('OOPS!!!!Already selected');
			return;
		}
	} else {
		alert('Game Finished');
        appStarter();
        finished=false;
        counter=0;
	}
}
function changeTurn() {
	turn = turn == 'X' ? 'O' : 'X';
}

function addClickHandlers() {
	var boxes = document.getElementsByClassName('box');
	for (var idx = 0; idx < boxes.length; idx++) {
		boxes[idx].addEventListener('click', onBoxClick, false);
	}
}
function appStarter() {
	initializeGrid();
	renderMainGrid();
	addClickHandlers();
}

function checkWinner() {
	let final = [];
	for (var i = 0; i < GRID_LENGTH; i++) {
		for (var j = 0; j < GRID_LENGTH; j++) {
			final.push(grid[i][j]);
		}
	}
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (final[a] && final[a] === final[b] && final[a] === final[c]) {
			return final[a];
		}
	}

	return null;
}

function addEventListenerToContainer() {
	console.log('adding listener');
	var container = document.getElementById('container');
	container.addEventListener('click', hidePopup, false);
}

function showPopup(msg) {
	var popup = document.getElementById('popup-container');
	popup.style.display = 'block';
	let className = msg.type == 'win' ? 'popup splash' : 'popup';
	var child =
		'<div class="' +
		className +
		'"><button value="x" onClick =hidePopup()>X</button><p>' +
		msg.lbl +
		'</p></div>';
	popup.innerHTML = child;

	// addEventListenerToContainer();
}

function hidePopup() {
	debugger;
	console.log('hiding');
	var popup = document.getElementById('popup-container');
	popup.style.display = 'none';
}
appStarter();
