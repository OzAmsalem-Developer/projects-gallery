'use strict';

function onInit() {
    renderBooks();
}

function renderBooks() {
    let books = getBooksForDisplay();

    let strHTMLs = books.map(function (book) {
        let readBtn = `<button class="action-btn btn" onclick="onOpenModal(${book.id})">Read</button>`;
        let updateBtn = `<button class="action-btn btn" onclick="onEditBook(${book.id})">Update</button>`;
        let deleteBtn = `<button class="action-btn btn" onclick="onRemoveBook(${book.id})">Delete</button>`;

        return `
        <tr>
            <td>${book.id}</td><td>${book.name}</td><td>${book.price}$</td>
            <td>${readBtn}</td><td>${updateBtn}</td><td>${deleteBtn}</td>
        </tr>`
    })
    let elBookList = document.querySelector('.book-table');
    elBookList.innerHTML = strHTMLs.join('');
}

function onRemoveBook(bookId) {
    let isSure = confirm('Are you sure?');
    if (isSure) {
        removeBook(bookId);
        renderBooks();
    }
}
function onEditBook(bookId) {
    let book = getBook(bookId);
    let elTxtName = document.querySelector('.book-name');
    let elTxtPrice = document.querySelector('.book-price');
    elTxtName.value = book.name;
    elTxtPrice.value = book.price;

    elTxtName.dataset.id = bookId;
}

function onSaveBook() {
    let elTxtName = document.querySelector('.book-name');
    let elTxtPrice = document.querySelector('.book-price');
    let name = elTxtName.value;
    let price = elTxtPrice.value;
    if (!name || !price) return;

    let bookId = +elTxtName.dataset.id;
    if (bookId) {
        let book = getBook(bookId);
        book.name = name;
        book.price = price;
        book.imgName = getImgName(name);
        updateBook(book);

    } else addBook(name, price);

    elTxtName.value = '';
    elTxtName.dataset.id = '';
    elTxtPrice.value = '';
    renderBooks();
}

function onOpenModal(bookId) {
    let book = getBook(bookId);
    let elModal = document.querySelector('.modal');
    elModal.querySelector('h3').innerText = book.name;
    elModal.querySelector('span').innerText = book.price + '$';
    elModal.querySelector('img').src = 'img/' + book.imgName + '.png';
    elModal.querySelector('.rate').innerText = book.rate;

    let plusBtnHTML = `<button class="btn" onclick="onChangeRate(this.innerText, ${book.id})">+</button>`
    let minusBtnHTML = `<button class="btn" onclick="onChangeRate(this.innerText, ${book.id})">-</button>`
    elModal.querySelector('.plus-rate').innerHTML = plusBtnHTML;
    elModal.querySelector('.minus-rate').innerHTML = minusBtnHTML;

    elModal.hidden = false;
    setTimeout(() => {
        elModal.style.opacity = 1;
    }, 50);
}

function onCloseModal() {
    let elModal = document.querySelector('.modal');
    elModal.style.opacity = 0;
    elModal.hidden = true;
}

function onChangePage(diff) {
    changePage(diff)
    renderBooks();
}

function onChangeRate(operator, bookId) {
    let elRate = document.querySelector('.rate');
    let book = getBook(bookId);
    
    updateRate(operator, book);
    elRate.innerText = book.rate;
}

function onChangeSort(sortBy) {
    setSortBy(sortBy);
    renderBooks();
}