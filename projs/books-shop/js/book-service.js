'use strict';
const KEY = 'books'
const BOOKS_IN_PAGE = 3;

var gCurrPage = 1;
var gBooks = _getStoragedBooks();
var gSortBy = 'lastAdded';

function getBooksForDisplay() {
    // Sorting
    _sortBooks();
    // Paging
    let from = (gCurrPage - 1) * BOOKS_IN_PAGE;
    let to = from + BOOKS_IN_PAGE;
    let booksForDisplay = gBooks.slice(from, to);
    return booksForDisplay;
}

function removeBook(bookId) {
    let idx = gBooks.findIndex(function (book) {
        return (book.id === bookId)
    })

    gBooks.splice(idx, 1);
    saveToStorage(KEY, gBooks);
}

function getBook(bookId) {
    return gBooks.find(book => book.id === bookId)
}


function addBook(name, price) {
    let book = _createBook(name, null, null, price); //The func adapted to map params
    gBooks.unshift(book);
    saveToStorage(KEY, gBooks);
}

function updateBook(book) {
    let idx = gBooks.findIndex(currBook => currBook.id === book.id)
    gBooks[idx] = book;
    saveToStorage(KEY, gBooks);
}

function changePage(diff) {
    gCurrPage += diff;
    let lastPage = Math.ceil(gBooks.length / BOOKS_IN_PAGE);

    if (gCurrPage > lastPage) gCurrPage = 1;
    else if (gCurrPage < 1) gCurrPage = lastPage;
}

function updateRate(operator, book) {
    book.rate += (operator === '+' && book.rate < 10) ? 1 : (operator === '-' && book.rate > 0) ? -1 : 0;
    saveToStorage(KEY, gBooks);
}

function setSortBy(sortBy) {
    gSortBy = sortBy;
    gCurrPage = 1;
}

function getCabab(name) {
    let cababCaseName = name.toLowerCase().split(' ').join('-');
    return cababCaseName;
}

function getPage() {
    return gCurrPage;
}

// Private functions:
function _createBooks() {
    let books = ['Harry Potter', 'Be a dog', 'Froggramming', 'Kingdom man', 'Tree', 'Secret garden']
        .map(_createBook);

    return books;
}

function _createBook(name, idx, arr, price) {
    return {
        id: parseInt(Math.random() * 10000 + 5),
        name: name,
        price: (price) ? price : parseInt(Math.random() * 100),
        imgName: getCabab(name),
        isImg: (price) ? false : true,
        rate: 0
    }
}

function _getStoragedBooks() {
    let books = loadFromStorage(KEY);
    if (!books || books.length < 1) {
        books = _createBooks();
        saveToStorage(KEY, books);
    } return books;
}

function _sortBooks() {
    if (gSortBy === 'lastAdded') return;
    if (gSortBy === 'price' || gSortBy === 'id') {
        gBooks.sort((a, b) => +a[gSortBy] - +b[gSortBy]);
    }
    if (gSortBy === 'name') {
        gBooks.sort((a, b) => {
            // Supporting all langs sorting
            let lowA = gTrans[a.imgName][gCurrLang];
            let lowB = gTrans[b.imgName][gCurrLang];

            if (lowA < lowB) return -1;
            if (lowA > lowB) return 1;
            return 0;
        });
    }
}


