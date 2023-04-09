import {
  index,
  cartPage,
  learnMorePage
} from "./_vars.js";

import {
  printText 
} from "./_printed-text.js";

const navItems = document.querySelectorAll('.nav__item');
const logo = document.querySelector('.header__logo');
const headerRight = document.querySelector('.header-right');
const burger = document.querySelector('.burger');
const subtitle = document.querySelector('.hero__subtitle');
const titleLetters = document.querySelectorAll('.hero__title-span');
const heroText = document.querySelector('.hero__text');
const decorLoaded = document.querySelectorAll('.decor-center--loaded');




window.addEventListener('load', () => {
  if (cartPage) {
    const titleLoaded = document.querySelector('.title-center--loaded');

    if (titleLoaded) {
      printText('Add to cart', '.title-center--loaded');
    }
  }

  if (learnMorePage) {
    const titleLoaded = document.querySelector('.title-center--loaded');

    if (titleLoaded) {
      printText('Power with Range', '.title-center--loaded')
    }
  }

  if (index) {
    heroText.classList.add('untranslate');
    subtitle.classList.add('untranslate');
  }

  logo.classList.add('untranslate');
  headerRight.classList.add('untranslate');
  burger.classList.add('untranslate');

  navItems.forEach((item) => {
    item.classList.add('untranslate');
  })

  decorLoaded.forEach((item) => {
    item.classList.add('unscaled');
  })

  titleLetters.forEach((letter) => {
    letter.classList.add('untranslate');
  })

  

  

})