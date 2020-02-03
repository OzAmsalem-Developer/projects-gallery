'use strict';

function getImgUrl(name, isFull=false) {
    let imgUrl = 'img/portfolio/' + name.toLowerCase().split(' ').join('-');
    imgUrl += (isFull)? '-full.jpg' : '.jpg';
    
    return imgUrl;
}

function getMonthName(timestamp) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

const d = new Date(timestamp);
return monthNames[d.getMonth()];
}

