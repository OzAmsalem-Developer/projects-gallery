var gPacman;  
var PACMAN  = '<img src="img/pac-left.png" />';
function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5
    },
    isSuper: false
  }; 
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}


function movePacman(eventKeyboard) {
  if (!gGame.isOn) return;
  // console.log('eventKeyboard:', eventKeyboard);
  
  var nextLocation = getNextLocation(eventKeyboard);
  // User pressed none-relevant key in the keyboard
  if (!nextLocation) return;
  
  var nextCell = gBoard[nextLocation.i][nextLocation.j];
  
  // Hitting a WALL, not moving anywhere
  if (nextCell === WALL) return;
  
  // Hitting FOOD? update score
  if (nextCell === FOOD)  updateScore(1);
  if (nextCell === CHERRY) updateScore(10);
  else if (nextCell === GHOST) {
    if(gPacman.isSuper) {
      //If the packman is super, eat the ghost
      //Update the model
     gGhosts.splice(getGhostIdx(nextLocation),1);
    } else {
      gameOver();
      return;
    }
} else if(nextCell === SUPER_FOOD) {
      if(gPacman.isSuper) return;
    gPacman.isSuper = true;
    changeGhostsColor();
    setTimeout(() => { 
      gPacman.isSuper = false;
      changeGhostsColor();
      //After time out, create ghosts
      while(gGhosts.length < 3) {
        //Model:
        var ghost = createGhost(gBoard);
        //DOM:
        renderCell(ghost.location, getGhostHTML(ghost.color))
      }
    }, 5000);
  }
  
  // Update the model to reflect movement
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // Update the DOM
  renderCell(gPacman.location, EMPTY);
  
  // Update the pacman MODEL to new location  
  gPacman.location = nextLocation;

  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // Render updated model to the DOM
  renderCell(gPacman.location, PACMAN);

  if(!isFoodLeft()) gameOver(true);
  
}

function getNextLocation(keyboardEvent) {
  var nextLocation = {
    i: gPacman.location.i, 
    j: gPacman.location.j
  };
  
  //+Bonus
  switch (keyboardEvent.code) { //Tried to do document.querySelector but the code dont want to cooperate
    case 'ArrowUp':             // To ask in class code review
    PACMAN = '<img style="transform: rotate(90deg)" src="img/pac-left.png" />'
      nextLocation.i--;
      break;
    case 'ArrowDown': 
    PACMAN = '<img style="transform: rotate(270deg)" src="img/pac-left.png" />'
      nextLocation.i++;
      break;
    case 'ArrowLeft': 
    PACMAN = '<img src="img/pac-left.png" />'
      nextLocation.j--;
      break; 
    case 'ArrowRight': 
    PACMAN = '<img style="transform: rotate(180deg)" src="img/pac-left.png" />'
      nextLocation.j++;
      break; 
      default: return null;          
  }
  return nextLocation;
}