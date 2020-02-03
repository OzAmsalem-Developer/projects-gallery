'use strict';

var gProjs = [
    {
        id: 'minesweeper',
        name: 'Minesweeper',
        title: 'Try stay alive..',
        desc: 'The first "big" project I start from scratch. I built a minesweeper with aditional features using html,css and javaScript.',
        publishedAt: 1580732662317,
        url: './projs/minesweeper/index.html',
        imgUrl: getImgUrl('minesweeper'),
        fullImgUrl: getImgUrl('minesweeper', true),
        labels: ['Board games', 'Recursion']
    },
    {
        id: 'touch-the-nums',
        name: 'Touch The Nums',
        title: 'Do it as fast as you can.',
        desc: 'Nice and uniqe board game that have used to be played a lot in the past.',
        publishedAt: 1580732662317,
        url: 'projs/touch-the-nums/index.html',
        imgUrl: getImgUrl('touch-the-nums'),
        fullImgUrl: getImgUrl('touch-the-nums', true),
        labels: ['Board games', 'Math']
    },
    {
        id: 'books-shop',
        name: 'Books shop',
        title: 'Manage your own books shop',
        desc: 'Built books shop according to MVC principles.',
        publishedAt: 1580732662317,
        url: 'projs/books-shop/index.html',
        imgUrl: getImgUrl('books-shop'),
        fullImgUrl: getImgUrl('books-shop', true),
        labels: ['MVC']
    },
    {
        id: 'in-picture',
        name: 'In Picture',
        title: 'Guess what in the picture',
        desc: 'Kids game',
        publishedAt: 1580732662317,
        url: 'projs/in-picture/index.html',
        imgUrl: getImgUrl('in-picture'),
        fullImgUrl: getImgUrl('in-picture', true),
        labels: ['JS', 'Games Exercises']
    },
    {
        id: 'pacman',
        name: 'Pacman',
        title: 'Pacman game',
        desc: 'The old pacman.',
        publishedAt: 1580732662317,
        url: 'projs/pacman/index.html',
        imgUrl: getImgUrl('pacman'),
        fullImgUrl: getImgUrl('pacman', true),
        labels: ['Board games', 'Javascript']
    },
    {
        id: 'guess-me',
        name: 'Guess Me',
        title: 'Think of someone, I will guess who is it',
        desc: 'Tree of questions that let the user make the app smarter by adding questions',
        publishedAt: 1580732662317,
        url: 'projs/guess-me/index.html',
        imgUrl: getImgUrl('guess-me'),
        fullImgUrl: getImgUrl('guess-me', true),
        labels: ['MVC', 'Javascript']
    }
];


function getProjs() {
    return gProjs;
}