'use strict';

const KEY = 'quests';
var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;

function setQuestsFromStorage() {
    gQuestsTree = loadFromStorage(KEY);
    
    if(!gQuestsTree) {
        createQuestsTree();
        saveToStorage(KEY, gQuestsTree);
    }
    restartGame();
}

function createQuestsTree() {
    gQuestsTree = createQuest('Male?');
    gQuestsTree.yes = createQuest('Gandhi');
    gQuestsTree.no = createQuest('Rita');

    restartGame();
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null);
}

function moveToNextQuest(res) {
    // update the gPrevQuest, gCurrQuest global vars
    gPrevQuest = gCurrQuest;
    gCurrQuest = gCurrQuest[res];
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    // Create and Connect the 2 Quests to the quetsions tree
    let newQuest = {
        txt: newQuestTxt,
        yes: createQuest(newGuessTxt),
        no: createQuest(gCurrQuest.txt)
    };
    gPrevQuest[lastRes] = newQuest;
    saveToStorage(KEY, gQuestsTree);
}

function getCurrQuest() {
    return gCurrQuest;
}

function restartGame() {
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
}
