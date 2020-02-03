'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);

function init() {
    setQuestsFromStorage();
}

function onStartGuessing() {
    // hide the game-start section
    $('.game-start').attr('hidden', true);
    renderQuest();
    // show the quest section
    $('.quest').attr('hidden', false);

    $('.quest button').attr('hidden', false);
    $('.restart').attr('hidden', true);
}

function renderQuest() {
    // select the <h2> inside quest and update
    // its text by the currQuest text
    let txt = getCurrQuest().txt;
    $('.quest h2').text(txt)
}

function onUserResponse(res) {

    // If this node has no children
    if (isChildless(getCurrQuest())) {
        if (res === 'yes') {
            $('.quest h2').text('Yes, I knew it!');
            $('.quest button').attr('hidden', true);
            $('.restart').attr('hidden', false);

        } else {
            // hide and show new-quest section
            $('.quest').attr('hidden', true);
            $('.new-quest').attr('hidden', false);
        }
    } else {
        // update the lastRes global var
        gLastRes = res;
        moveToNextQuest(gLastRes);
        renderQuest();
    }
}

function onAddGuess() {
    let userGuessTxt = $('#newGuess').val();
    let diffQuestTxt = $('#newQuest').val();
    
    addGuess(diffQuestTxt, userGuessTxt, gLastRes)
    onRestartGame();
}


function onRestartGame() {
    $('.new-quest').attr('hidden', true);
    $('.quest').attr('hidden', true);
    $('.game-start').attr('hidden', false);
    gLastRes = null;
    restartGame();
}

