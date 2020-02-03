'use strict';

var gBoard = createBoard(16);
var gTimerInterval;
var gPrevNum = 0;


function initGame() {
    renderBoard();
}

function createBoard(size) {
    var board = [];
    for (let i = 1; i <= size; i++) {
        board.push(i);
    }
    board = shuffle(board);
    return board;
}

function renderBoard() {
    var boardCopy = gBoard.slice();
    var boardSize = Math.sqrt(gBoard.length);

    var strHtml = '';
    for (let i = 0; i < boardSize; i++) {
        strHtml += `<tr>`
        for (let j = 0; j < boardSize; j++) {
            strHtml += `<td class="cell" onclick="elNumClicked(this)">${boardCopy.shift()}</td>`
        }
        strHtml += `<tr/>`
    }
    document.querySelector('tbody').innerHTML += strHtml;
}

function elNumClicked(elNum) {
    var clickedNum = +elNum.innerText;
    if (clickedNum === 1 && !elNum.classList.contains('clicked')) {
        startTimer();
    }
    if (clickedNum === gPrevNum + 1) {
        elNum.classList.add('clicked');
        gPrevNum = clickedNum;
        document.querySelector('h4 span').innerText = clickedNum + 1;

        if (clickedNum === gBoard.length && elNum.classList.contains('clicked')) {
            document.querySelector('h4').innerText = 'Nice, try next level..';
            endGame();  //Game over.
        }
    }
}


function startTimer() {
    var startTime = Date.now();
    gTimerInterval = setInterval(() => {
        var passedTime = Date.now() - startTime;
        document.querySelector('.timer').innerText = (passedTime / 1000).toFixed(3);
    }, 1);
}

function endGame() {
    clearInterval(gTimerInterval);

}

function levelUp(elBtn) {
    endGame();
    gPrevNum = 0;
    document.querySelector('h4').innerHTML = `Next Number: <span></span>`;
    document.querySelector('h4 span').innerText = 1;
    document.querySelector('.timer').innerText = '0.000';
    gBoard = createBoard(+elBtn.value)
    document.querySelector('tbody').innerHTML = '';
    renderBoard();
}

//Helpers

function shuffle(array) {
    array.sort(function () {
        Math.random() - 0.5
    });
    return array;
}