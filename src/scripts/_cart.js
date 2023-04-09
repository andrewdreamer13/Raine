import {
  cartPage
} from "./_vars.js";



if (cartPage) {
  seeMore();
  changeCardCounter();
  addGoodsToCart();
  addTotalAmountToHeader();
  submit();
}

function changeCardCounter() {

  window.addEventListener('click', function (event) {
    let counter;

    if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {
      const cardCounter = event.target.closest('.card__counter');
      counter = cardCounter.querySelector('[data-counter]');
    }

    if (event.target.dataset.action === 'plus') {

      counter.textContent++;
      toStorage();
      getTotalPrice();
    }

    if (event.target.dataset.action === 'minus') {

      if (counter.textContent > 1) {
        counter.textContent--;

      } else if (event.target.closest('.card__receiver') && parseInt(counter.textContent) === 1) {

        event.target.closest('.card').remove();
        toggleCartStatus();
      }
      toStorage();
      getTotalPrice();
    }

  })
}


function addGoodsToCart() {

  window.addEventListener('click', function (event) {

    const cardReceiver = document.querySelector('.card__receiver');

    if (event.target.hasAttribute('data-btn')) {

      const card = event.target.closest('.card');

      const cardInfo = {
        id: card.dataset.id,
        imgSrc: card.querySelector('.card__img').getAttribute('src'),
        imgAlt: card.querySelector('.card__img').getAttribute('alt'),
        title: card.querySelector('.card__title').textContent,
        modelTitle: card.querySelector('[data-model]').textContent,
        modelType: card.querySelector('[data-model-type]').textContent,
        speedTitle: card.querySelector('[data-speed]').textContent,
        speedType: card.querySelector('[data-speed-type]').textContent,
        distTitle: card.querySelector('[data-dist]').textContent,
        distType: card.querySelector('[data-dist-type]').textContent,
        colorTitle: card.querySelector('[data-color]').textContent,
        colorType: card.querySelector('[data-color-type]').textContent,
        priceTitle: card.querySelector('[data-price]').textContent,
        priceType: card.querySelector('[data-price-type]').textContent,
        cardCounter: card.querySelector('[data-counter]').textContent
      }

      const cardInCart = cardReceiver.querySelector(`[data-id="${cardInfo.id}"]`);

      if (cardInCart) {


        const cardCounterEl = cardInCart.querySelector('[data-counter]');
        cardCounterEl.textContent = parseInt(cardCounterEl.textContent) + parseInt(cardInfo.cardCounter);

      } else {
        const cartHTML = `
         <div class="card" data-id="${cardInfo.id}">
  
            <div class="card__content">
  
              <picture>
                <source srcset="img/card-1.webp" type="image/webp" alt="scooter agile">
                <img class="card__img" src="${cardInfo.imgSrc}" loading="lazy" width="200" height="200" alt="${cardInfo.imgAlt}">
              </picture>
  
              <h3 class="card__title">${cardInfo.title}</h3>
  
              <div class="card__characteristics">
  
                <p class="card__characteristics-item" data-model>
                <span>${cardInfo.modelTitle}</span>
                <span class="card__characteristics-mean" data-model-type>${cardInfo.modelType}</span>
                </p>
  
                <p class="card__characteristics-item"> 
                <span data-speed>${cardInfo.speedTitle}</span>
                <span class="card__characteristics-mean" data-speed-type>${cardInfo.speedType}</span>
                </p>
  
                <p class="card__characteristics-item">
                <span data-dist>${cardInfo.distTitle}</span>
                <span class="card__characteristics-mean" data-dist-type>${cardInfo.distType}</span>
                </p>
  
                <p class="card__characteristics-item">
                <span data-color>${cardInfo.colorTitle}</span>
                <span class="card__characteristics-mean" data-color-type>${cardInfo.colorType}</span>
                </p>
                <p class="card__characteristics-item">
                <span data-price>${cardInfo.priceTitle}</span>
                <span class="card__characteristics-mean" data-price-type>${cardInfo.priceType}</span>
                </p>
                
              </div>
  
            </div>
  
              <div class="card__counter">
                <button class="card__control" data-action="minus">-</button>
                <div class="card__current" data-counter>${cardInfo.cardCounter}</div>
                <button class="card__control" data-action="plus">+</button>
              </div>
    
          </div>
  
         `;

        cardReceiver.insertAdjacentHTML('afterbegin', cartHTML);

      }

      card.querySelector('[data-counter]').textContent = '1';

      toStorage();
      toggleCartStatus();
      getTotalPrice();

    }


  });

}


function toggleCartStatus() {

  const cardReceiver = document.querySelector('.card__receiver');
  const cardEmpty = document.querySelector('.card__alert');
  const cardForm = document.querySelector('.card__form-wrapper');


  if (cardReceiver.children.length > 0) {

    cardEmpty.classList.add('none');
    cardForm.classList.remove('none');


  } else {

    cardEmpty.classList.remove('none');
    cardForm.classList.add('none');

  }
}


function getTotalPrice() {

  const cardReceiver = document.querySelector('.card__receiver');
  const cartCards = cardReceiver.querySelectorAll('.card');
  const totalPriceReceiver = document.querySelector('.card__total-num');
  let totalPrice = 0;

  cartCards.forEach((card) => {

    const amount = card.querySelector('[data-counter]');
    const price = card.querySelector('[data-price-type]');
    const currentPrice = parseInt(amount.textContent) * parseInt(price.textContent);
    totalPrice += currentPrice;
  })

  totalPriceReceiver.textContent = totalPrice;
}

function submit() {

  const cartSubmitButton = document.querySelector('.card__send-button');
  const cardReceiver = document.querySelector('.card__receiver');
  const totalPriceReceiver = document.querySelector('.card__total-num');
  const modalWindow = document.querySelector('.modal');
  const modalButton = document.querySelector('.cart-message__button');
  const headerCartCounter = document.querySelector('.cart__counter');

  cartSubmitButton.addEventListener('click', function (event) {
    event.preventDefault();

    modalWindow.classList.remove('none');
    document.body.classList.add('no-scroll');
  })

  modalButton.addEventListener('click', function (event) {
    event.preventDefault();

    modalWindow.classList.add('none');
    document.body.classList.remove('no-scroll');

    cardReceiver.querySelectorAll('.card').forEach((card) => {
      card.remove();
    });
    totalPriceReceiver.textContent = '0';
    headerCartCounter.textContent = '0';

    toggleCartStatus();

  })
}


function addTotalAmountToHeader() {
  window.addEventListener('click', function (event) {

    const headerCartCounter = document.querySelector('.cart__counter');
    const cardReceiver = document.querySelector('.card__receiver');
    const cartCards = cardReceiver.querySelectorAll('.card');
    let allCurrentAmounts = 0;

    cartCards.forEach((card) => {
      const currentAmount = parseInt(card.querySelector('.card__current').textContent);
      allCurrentAmounts += currentAmount;
    })

    if (event.target.hasAttribute('data-btn') || event.target.hasAttribute('data-action')) {
      headerCartCounter.textContent = allCurrentAmounts;
    }
  })



}


function seeMore() {
  const seeMorebtn = document.querySelector('.add-goods-button');
  const hiddenCards = document.querySelectorAll('.card:nth-child(n + 3)');

  if (document.documentElement.clientWidth < 650) {

    hiddenCards.forEach((card) => {
      card.classList.add('none');
    })

    seeMorebtn.addEventListener('click', () => {

      if (seeMorebtn.textContent === 'see more...') {
        seeMorebtn.textContent = 'hide cards';
      } else {
        seeMorebtn.textContent = 'see more...';
      }

      hiddenCards.forEach((card) => {
        card.classList.toggle('none');

      });



    })
  }

}


function toStorage() {

  const cardReceiver = document.querySelector('.card__receiver');
  const cardReceiverHtml = cardReceiver.innerHTML;
  localStorage.setItem('html', cardReceiverHtml);

  const newCardReceiverHtml = localStorage.getItem('html');
  cardReceiver.innerHTML = newCardReceiverHtml;
  console.log(newCardReceiverHtml)
  console.log(cardReceiver.innerHTML)
}
// const cardReceiver = document.querySelector('.card__receiver');
// const a = 'andrew';
// localStorage.setItem('name', a);
// const a2 = localStorage.getItem('name');
// console.log(a2)

// cardReceiver.innerHTML = a2;
// document.querySelector('.card__send-button').onclick = function() {
// localStorage.removeItem('name');
// cardReceiver.innerHTML = '';
// }