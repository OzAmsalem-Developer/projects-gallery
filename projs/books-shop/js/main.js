'use strict';

function onInit() {
    getTranses();
    renderBooks();
}

function renderBooks() {
    let books = getBooksForDisplay();

    let strHTMLs = books.map(function (book) {
        let readBtn = `<button data-trans="read-btn" class="action-btn btn btn-success" onclick="onOpenModal(${book.id})">Read</button>`;
        let updateBtn = `<button data-trans="update-btn" class="action-btn btn btn-primary" onclick="onEditBook(${book.id})">Update</button>`;
        let deleteBtn = `<button data-trans="delete-btn" class="action-btn btn btn-danger" onclick="onRemoveBook(${book.id})">Delete</button>`;

        return `
        <tr>
            <td>${book.id}</td><td data-trans="${book.imgName}"></td>
            <td>${formatCurrency(getCurrencyVal(book.price))}</td>
            <td>${readBtn}</td><td>${updateBtn}</td><td>${deleteBtn}</td>
        </tr>`
    })
    let elBookList = document.querySelector('.book-table');
    elBookList.innerHTML = strHTMLs.join('');

    doTrans();
    document.querySelector('.page-num').innerText = getPage();
}

function onRemoveBook(bookId) {
    let isSure = confirm('Are you sure?');
    if (isSure) {
        removeBook(bookId);
        renderBooks();
    }
}
function onEditBook(bookId) {
    renderAddSection(true);
    let book = getBook(bookId);

    let elTxtName = document.querySelector('.en-name input');
    let elTxtPrice = document.querySelector('.book-price');
    elTxtName.value = getBookTrans(book.imgName);
    elTxtPrice.value = book.price;

    elTxtName.dataset.id = bookId;
    doTrans();
}

function onSaveBook() {
    let esName = document.querySelector('.es-name input').value;
    let heName = document.querySelector('.he-name input').value;
    let price = document.querySelector('.book-price').value;
    let elTxtNameEn = document.querySelector('.en-name input');
    let name = elTxtNameEn.value;
    let bookId = +elTxtNameEn.dataset.id;

    if (!name || !price) return; //CR: is required better then this line or can reaplace it?

    if (bookId) {
        let book = getBook(bookId);
        setBookTrans(book.imgName, name);
        book.price = price;
        updateBook(book);
    } else {
        addBook(name, price);
        addBookTrans(getCabab(name), name, esName, heName);
    }
    renderAddSection(false);
    renderBooks();
}

function onOpenModal(bookId) {
    let book = getBook(bookId);
    let bookImg = (book.isImg) ? book.imgName : 'no-image';
    let elModal = document.querySelector('.modal');
    elModal.querySelector('.modal-title').dataset.trans = book.imgName;
    elModal.querySelector('.book-price-modal').innerText = formatCurrency(getCurrencyVal(book.price));
    elModal.querySelector('img').src = 'img/' + bookImg + '.png';
    elModal.querySelector('.rate').innerText = book.rate;

    let plusBtnHTML = `<button class="btn btn-dark" onclick="onChangeRate('+', ${book.id})">
    <i class="fas fa-plus"></i></button>`;
    let minusBtnHTML = `<button class="btn btn-dark" onclick="onChangeRate('-', ${book.id})">
    <i class="fas fa-minus"></i></button>`;
    elModal.querySelector('.plus-rate').innerHTML = plusBtnHTML;
    elModal.querySelector('.minus-rate').innerHTML = minusBtnHTML;

    doTrans();
    $('#myModal').modal('show');
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

function onChangeLang(lang) {
    setLang(lang);
    if (lang === 'he') {
        document.body.classList.add('rtl');
    } else {
        document.body.classList.remove('rtl');
    }
    renderBooks();
}

function renderAddSection(isEdit) { //Maybe jQuery would help here
    let elTxtEsName = document.querySelector('.es-name');
    let elTxtHeName = document.querySelector('.he-name');
    let elTxtEnName = document.querySelector('.en-name input');
    let elTxtPrice = document.querySelector('.book-price');
    let sectionTitle = document.querySelector('.add-edit-book');

    if (isEdit) {
        sectionTitle.dataset.trans = 'edit-book';
        document.querySelector('.title-in-english').hidden = false;
        document.querySelector('.add-new').hidden = false;
        elTxtEsName.hidden = true;
        elTxtHeName.hidden = true;
    } else {
        sectionTitle.dataset.trans = 'add-book';
        document.querySelector('.title-in-english').hidden = true;
        document.querySelector('.add-new').hidden = true;
        elTxtEsName.hidden = false;
        elTxtHeName.hidden = false;
        elTxtEnName.value = '';
        elTxtEnName.dataset.id = '';
        elTxtPrice.value = '';
        elTxtEsName.querySelector('input').value = '';
        elTxtHeName.querySelector('input').value = '';
        doTrans();
    }
}