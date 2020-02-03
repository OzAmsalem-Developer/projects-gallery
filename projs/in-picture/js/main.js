'use strict';

var gNextId = 1;
var gQuests = createQuests();
var gCurrQuestIdx = 0;
var gOnProcces = false;
const audioWrong = new Audio('sounds/wrong.wav');
const audioRight = new Audio('sounds/correct.wav');

function initGame() {
    renderQuest();
}

function renderQuest() {
    document.querySelector('.restart').style.display = 'none';
    let imgUrl = 'img/' + gQuests[gCurrQuestIdx].id + '.jpg';
    let questTxt = gQuests[gCurrQuestIdx].questTxt;
    let opts = gQuests[gCurrQuestIdx].opts;
    document.querySelector('.quest-img').src = imgUrl;
    document.querySelector('.txt').innerText = questTxt;
    var htmlStr = '';
    for (let i = 0; i < opts.length; i++) {
        htmlStr += `<div onclick="optClicked(this, ${i})">${opts[i]}</div>`;
    }
    document.querySelector('.opts-container').innerHTML = htmlStr;
    gOnProcces = false;
}

function createQuests() {
    let quests = [
        createQuest(['Eating', 'Smell his teddy'], 1, 'What tituf is doing?'),
        createQuest(['Everyone is hungry', 'Everyone like to make some sport', 'Something happened in the sky'], 2, 'What you can realize from the picture?'),
        createQuest(['The dog is barking', 'The family watch TV'], 1, 'What`s happening in this family?')
    ];
    return quests;
}

function createQuest(questOpts, correctOptIndex, questTxt) {
    let quest = {
        id: gNextId++,
        opts: questOpts,
        questTxt: questTxt,
        correctOptIndex: correctOptIndex
    }
    return quest;
}

function optClicked(elOpt, optIdx) {
    if (gOnProcces) return;
    let isCorrect = checkAnswer(optIdx);
    if (isCorrect) {
        audioRight.play();
        elOpt.style.backgroundColor = 'lightgreen';
        gCurrQuestIdx++;
        gOnProcces = true;
        if (gQuests.length === gCurrQuestIdx) {
            setTimeout(onGameOver, 600);
            return;
        }
        setTimeout(renderQuest, 600);
    } else {
        audioWrong.play();
        elOpt.style.backgroundColor = 'red';
        setTimeout(() => {
            elOpt.style.backgroundColor = 'white'
        }, 500);
    }
}

function checkAnswer(selectedOptIdx) {
    let correctIdx = gQuests[gCurrQuestIdx].correctOptIndex;
    return (correctIdx === selectedOptIdx);
}

function onGameOver() {
    document.querySelector('.opts-container').innerHTML = '';
    document.querySelector('.quest-img').src = './img/win.png'
    document.querySelector('.txt').innerText = 'Awesome! you done! click to play again';
    document.querySelector('.restart').style.display = 'inline-block';
    gOnProcces = false;
}

function restart() {
    gCurrQuestIdx = 0;
    renderQuest();
}