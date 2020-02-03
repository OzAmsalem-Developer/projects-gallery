
function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function renderBoard(board, selector) {
  var strHTML = '<table border="0"><tbody>';
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < board[0].length; j++) {
      var cell = board[i][j];
      var className = `cell cell${i}-${j}`;
     
      strHTML += `<td class="${className}">` ;
      if (cell === GHOST) strHTML += `<span class="ghost">${cell}</span>` ;
      else strHTML += cell + '</td>';
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>';
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
  renderGhostsColor();
  //Render ghosts colors for the first time.
}

function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

function isFoodLeft() {
  for (let i = 0; i < gBoard.length; i++) {
    for (let j = 0; j < gBoard[0].length; j++) {
      var cell = gBoard[i][j];
      if (cell === FOOD) return true;
    }
  }
  return false;
}

function getEmptyCells() { 
  let cells = [];
  for (let i = 0; i < gBoard.length; i++) {
    for (let j = 0; j < gBoard[0].length; j++) {
      var cell = {i: i, j: j};
      if (gBoard[i][j] === EMPTY) cells.push(cell);
    }
  }
  return cells;
}

