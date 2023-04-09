import { index } from "./_vars.js";

if(index) {
  advantagesTabs();
}

function advantagesTabs() {
// tabs control
const buttons = document.querySelectorAll('.advantages__button');
const indicator = document.querySelector('.advantages__indicator');
const targets = document.querySelectorAll('.advantages__tab');
const tabContents = document.querySelectorAll('.advantages__content');
const tabImgs = document.querySelectorAll('.advantages__img');

let move = 0;


buttons.forEach((button,buttonIndex)=>{
  button.addEventListener('click',()=>{
    move = 100 * buttonIndex;
    indicator.style.transform = `translateX(${move}%)`;
    buttons.forEach((button) =>{
      button.classList.remove('advantages__button-active')
    });
    button.classList.add('advantages__button-active');
    

    targets.forEach((target,targetIndex)=>{
      target.classList.remove('advantages__tab-active');
      targetIndex = buttonIndex;
      targets[targetIndex].classList.add('advantages__tab-active');
    });

    tabContents.forEach((content,contentIndex)=>{
      content.classList.remove('untransform');
      contentIndex = buttonIndex;
      tabContents[contentIndex].classList.add('untransform');
    });

    tabImgs.forEach((img,imgIndex)=>{
      img.classList.remove('untransform');
      imgIndex = buttonIndex;
      tabImgs[imgIndex].classList.add('untransform');
    });


  });
});

// control touch slider

const slider = document.querySelector('.advantages__control');
const track = document.querySelector('.advantages__control-track');


let initialPosition = null;
let moving = false;
let transform = 0;

function funcStart(e) {
   slider.style.cursor = 'grabbing';
  initialPosition = e.pageX;
  moving = true;
  const transformation = window.getComputedStyle(track).getPropertyValue('transform');
  if (transformation !== 'none') {
    transform = parseInt(transformation.split(',')[4].trim());
  }
}

function funcMove(e) {
  if (moving) {
    const currentPosition = e.pageX;
    const diff = currentPosition - initialPosition;
    track.style.transform = `translateX(${transform + diff}px)`;
    checkBoundary();
  }
}

function funcEnd(e) {
   slider.style.cursor = 'grab';
   moving = false;
}

// stop left and right function
function checkBoundary() {
  let outer = slider.getBoundingClientRect();
  let inner = track.getBoundingClientRect();

  if (inner.left > 0) {
    track.style.transform = 'translate(-' + 0 + 'px)';
  } else if (inner.right < outer.right) {
    track.style.transform = `translateX(-${inner.width - outer.width}px`;
  }
}

if (window.PointerEvent) {
  slider.addEventListener('pointerdown', funcStart);
  slider.addEventListener('pointermove', funcMove);
  slider.addEventListener('pointerup', funcEnd);

} else {
  slider.addEventListener('touchstart', funcStart);
  slider.addEventListener('touchmove', funcMove);
  slider.addEventListener('touchend', funcEnd);
  slider.addEventListener('mousedown', funcStart);
  slider.addEventListener('mousemove', funcMove);
  slider.addEventListener('mouseup', funcEnd);
}


}





