'use strict';
var WALL = '#';
var FOOD = '.';
var EMPTY = ' ';
var SUPER_FOOD = '🍨';
var CHERRY = '🍒';

var gBoard;
var gPlaceCherryIvl;
var gGame = {
  score: 0,
  isOn: false
};

function init() {
  resetGame(); //All the settings to reset
  gBoard = buildBoard();
  createPacman(gBoard);
  createGhosts(gBoard);
  renderBoard(gBoard, '.board-container');
  placeCherries();
  gGame.isOn = true;
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;

      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 || //Add some walls inside:
        (j === 3 && i > 4 && i < SIZE - 2)) {
        board[i][j] = WALL;
      }
      if (i === 1 && j === 1 || i===1 && j===SIZE-2 || //Add some Super Food
          i===SIZE-2 && j===1 || j===SIZE-2 && i===SIZE-2) board[i][j] = SUPER_FOOD;
    }
  }
  return board;
}
function updateScore(value) {
  // Model
  gGame.score += value;
  // DOM
  document.querySelector('header h3 span').innerText = gGame.score;
}

function gameOver(isWin = false) {
  console.log('Game Over');
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  clearInterval(gPlaceCherryIvl);
  gIntervalGhosts = null;
  let selector = (isWin) ? '.victory' : '.restart';
  document.querySelector(selector).hidden = false;
  renderCell(gPacman.location, EMPTY);
}

function placeCherries() {
  gPlaceCherryIvl = setInterval(() => {
      let emptyCells = getEmptyCells();
      let randomEmptyCell = emptyCells[getRandomIntInclusive(0, emptyCells.length)];
      gBoard[randomEmptyCell.i][randomEmptyCell.j] = CHERRY;
      renderCell(randomEmptyCell, CHERRY);
  }, 15000);
}

function resetGame() {
  document.querySelector('.restart').hidden = true;
  document.querySelector('.victory').hidden = true;
  gGame.score = 0;
  document.querySelector('header h3 span').innerText = gGame.score;
}


