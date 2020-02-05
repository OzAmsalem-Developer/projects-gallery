'use strict';

const TRANS_KEY = 'transes';
var gTrans;
var gCurrLang = 'en';

function getTranses() {
    gTrans = loadFromStorage(TRANS_KEY);
    if (!gTrans) {
        gTrans = {};
        createTranses();
        saveToStorage(TRANS_KEY, gTrans);
    }
}

function createTrans(enTrans, esTrans, heTrans) {
    return {
        en: enTrans,
        es: esTrans,
        he: heTrans
    };
}

function doTrans() {
    // For each el get the data-trans and use getTrans to replace the innerText 
    var els = document.querySelectorAll('[data-trans]');
    els.forEach(el => {
        var txt = getTrans(el.dataset.trans);
        // If this is an input, translate the placeholder
        if (el.placeholder) el.placeholder = txt;
        else el.innerText = txt;
    })
}


function getTrans(transKey) {
    var langMap = gTrans[transKey]
    if (!langMap) return 'UNKNOWN';
    var txt = langMap[gCurrLang]
    // If translation not found - use english
    if (!txt) txt = langMap['en'];
    return txt;
}

function setLang(lang) {
    gCurrLang = lang;
    gCurrPage = 1; //CR: it's ok? no, create func
}

function setBookTrans(transKey, newTrans) {
    gTrans[transKey][gCurrLang] = newTrans;
    saveToStorage(TRANS_KEY, gTrans);
}

function getBookTrans(transKey) {
    return gTrans[transKey][gCurrLang];
}

function addBookTrans(transKey, enTrans, esTrans, heTrans) {
    gTrans[transKey] = createTrans(enTrans, esTrans, heTrans);
    saveToStorage(TRANS_KEY, gTrans);
}

// The old way to do it
function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function getCurrencyVal(usdNum) {
    if (gCurrLang === 'en') return usdNum;
    if (gCurrLang === 'he') return parseInt(usdNum * 3.44);
    if (gCurrLang === 'es') return parseInt(usdNum * 0.9);
}

function formatCurrency(num) {
    let lang;
    let currency;
    if (gCurrLang === 'he') {
        lang = 'he-IL';
        currency = 'ILS';
    } else if (gCurrLang === 'en') {
        lang = 'en-US';
        currency = 'USD';
    } else {
        lang = 'es-ES';
        currency = 'EUR';
    }

    return new Intl.NumberFormat(lang, { style: 'currency', currency: currency }).format(num);
}

function formatDate(time) {
    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    };
    return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}


function kmToMiles(km) {
    return km / 1.609;
}