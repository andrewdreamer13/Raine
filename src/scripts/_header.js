'use strict';
// Select language
const selectButton = document.querySelector('.language__header');
const selectList = document.querySelector('.language__list');
const selectItems = document.querySelectorAll('.language__item');

selectButton.addEventListener('click', () => {
  selectList.classList.toggle('visible');
})


selectItems.forEach((item) => {
  item.addEventListener('click', (e) => {
    e.stopPropagation();
    selectList.classList.remove('visible');
  })
})

// document.addEventListener('click', (e) => {
//   if (e.target !== selectButton) {
//     selectList.classList.remove('visible');
//   }
// })

document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab' || e.key === 'Escape') {
    selectList.classList.remove('visible');
  }
})



// header burger menu
burger();

function burger() {

  const burgerBtn = document.querySelector('.burger');
  const menu = document.querySelector('.nav');
  const navItems = document.querySelectorAll('.nav__item');
  

  //open menu

  burgerBtn.addEventListener('click', () => {
    menu.classList.toggle('nav-transform');
    document.querySelector('.burger__span-one').classList.toggle('span-one-transform');
    document.querySelector('.burger__span-two').classList.toggle('span-two-transform');
    document.querySelector('.burger__span-three').classList.toggle('span-three-transform');
    document.body.classList.toggle('no-scroll');
    navItems.forEach((item) => {
      item.classList.toggle('nav__item-untransform');
    })
  })

  /* close menu */

  navItems.forEach((item) => {
    item.addEventListener('click', function () {
      menu.classList.remove('nav-transform');
      document.querySelector('.burger__span-one').classList.remove('span-one-transform');
      document.querySelector('.burger__span-two').classList.remove('span-two-transform');
      document.querySelector('.burger__span-three').classList.remove('span-three-transform');
      document.querySelector('body').classList.remove('no-scroll');
    });
  });

} // End of burger