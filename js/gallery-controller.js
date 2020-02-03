'use strict';

$(document).ready(init);

function init() {
    _renderProjs();
}

function _renderProjs() {
    let projs = getProjs();
    let projsStrHTMLs = projs.map(function (proj, idx) {
        return `
        <div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal${idx + 1}">
          <div class="portfolio-hover">
            <div class="portfolio-hover-content">
              <i class="fa fa-plus fa-3x"></i>
            </div>
          </div>
          <img class="img-fluid" src="${proj.imgUrl}" alt="${proj.name} image">
        </a>
        <div class="portfolio-caption">
          <h4>${proj.name}</h4>
          <p class="text-muted">${proj.labels.join(', ')}</p>
        </div>
      </div>`
    });

    let modalsStrHTMLs = projs.map(function (proj, idx) {
        return `
        <div class="portfolio-modal modal fade" id="portfolioModal${idx + 1}" 
        tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="close-modal" data-dismiss="modal">
              <div class="lr">
                <div class="rl"></div>
              </div>
            </div>
            <div class="container">
              <div class="row">
                <div class="col-lg-8 mx-auto">
                  <div class="modal-body">
          
                    <h2>${proj.name}</h2>
                    <p class="item-intro text-muted">${proj.title}</p>
                    <img class="img-fluid d-block mx-auto" src="${proj.fullImgUrl}" alt="${proj.name} image">
                    <p>${proj.desc}</p>
                    <ul class="list-inline">
                      <li>Date: ${new Date(proj.publishedAt).getFullYear()
                        + ' ' + getMonthName(proj.publishedAt)}</li>
                      <li>Client: Coding Academy</li>
                      <li>Category: ${proj.labels.join(', ')}</li>
                    </ul>
                    <button class="btn btn-primary" data-dismiss="modal" type="button">
                      <i class="fa fa-times"></i>
                      Close Project</button>
                      <a class="btn btn-primary"  href="${proj.url}"  target="_blank">
                      Check it out</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`
    });

    $('.projs-container').html(projsStrHTMLs.join(''));
    $('.modals-container').html(modalsStrHTMLs.join(''));
}

function onContact() {
    let subject = $('.subject').val();
    let message = $('.body-message').val();

    let link = `https://mail.google.com/mail/?view=cm&fs=1&
    to=ozamsalem8@gmail.com
    &su=${subject}
    &body=${message}`;

    window.open(link, '_blank');

    $('.email').val('');
    $('.subject').val('');
    $('.body-message').val('');
}

