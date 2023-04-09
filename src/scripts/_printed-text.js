

// Print text function

export function printText(content, contentInner) {

  let text = `${content}`;
  let textInner = document.querySelector(`${contentInner}`);
  let textCatcher = '';

  function inputText(i) {
    setTimeout(() => {
      textCatcher += text[i];
      textInner.textContent = textCatcher;
    }, 60 * i)
  }

  for (let i = 0; i < text.length; i++) {
    inputText(i);
  }

}

function startPrintText(content, contentInner, func) {

  window.addEventListener('scroll', function () {
    let scrolled = scrollY;
    let windowHeight = window.innerHeight / 2;
    let windowCenter = scrolled + windowHeight;

    let animElem = document.querySelector(`${contentInner}`);
    let animElemTop = animElem.offsetTop;
    let animElemHeight = animElem.offsetHeight / 2;
    let animElemCenter = animElemTop + animElemHeight;

    if (windowCenter >= animElemCenter) {
      if (!animElem.hasAttribute('data-print', 'printed')) {
        func(content, contentInner);
      }
      animElem.setAttribute('data-print', 'printed');
    }

  });

}

startPrintText('Designed for you', '.design-process__title', printText);
startPrintText('Our Mission', '.mission__title', printText);
startPrintText('Agile Acceleration', '.performance__title', printText);
startPrintText('Go Further', '.range__title', printText);
startPrintText('Smart. Safe. Connected.', '.technology__title', printText);
startPrintText('Safety First', '.technology__title-2', printText);
startPrintText('Stop Safely', '.advantages__title-1 ', printText);
startPrintText('Night Vision', '.advantages__title-2 ', printText);
startPrintText('Convenience meets true style', '.convenience__title', printText);
startPrintText('Warm Hands', '.comfort__title', printText);
startPrintText('The Raine One', '.pre-order__title', printText);
startPrintText('Safety First', '.safety__title', printText);
startPrintText('Your Own Style', '.style__title', printText);

startPrintText('Power with Range', '.description__title-one', printText);
startPrintText('Safety First', '.description__title-two', printText);
startPrintText('Your Own Style', '.description__title-three', printText);

startPrintText('50kmh / 31mph', '.possibilities__title-item-one', printText);
startPrintText('Brushless Flux Drive', '.possibilities__title-item-two', printText);
startPrintText('Uphill Power', '.possibilities__title-item-three', printText);

startPrintText('40km / 25 mile Range', '.possibilities__title-item-four', printText);
startPrintText('Fast Recharge', '.possibilities__title-item-five', printText);
startPrintText('Travel Further', '.possibilities__title-item-six', printText);

startPrintText('Wide Deck', '.possibilities__title-item-seven', printText);
startPrintText('Heated Grips', '.possibilities__title-item-eight', printText);
startPrintText('Warranty', '.possibilities__title-item-nine', printText);


startPrintText('Premium Display', '.display__title-item-one', printText);
startPrintText('Night and Day Lighting', '.display__title-item-two', printText);
startPrintText('Connected Everywhere', '.display__title-item-three', printText);

startPrintText('Power', '.learn-more__content-title-1', printText);
startPrintText('Range', '.learn-more__content-title-2', printText);
startPrintText('Electronic ABS', '.learn-more__content-title-3', printText);
startPrintText('Traction control', '.learn-more__content-title-4', printText);
startPrintText('Smooth suspension', '.learn-more__content-title-5', printText);
startPrintText('Quality tyres', '.learn-more__content-title-6', printText);
startPrintText('Lighting', '.learn-more__content-title-7', printText);
startPrintText('Lifestyle', '.learn-more__content-title-8', printText);
startPrintText('Design', '.learn-more__content-title-9', printText);


// title's line function

const leftDecors = document.querySelectorAll('.decor-left');
const centerDecors = document.querySelectorAll('.decor-center');
const learnLeftDecors = document.querySelectorAll('.learn-more__left-decor');


function showDecor() {

  window.addEventListener('scroll', function () {
    let scrolled = scrollY;
    let windowHeight = window.innerHeight / 2;
    let windowCenter = scrolled + windowHeight;

    leftDecors.forEach((decor) => {
      let decorTop = decor.previousElementSibling.offsetTop;
      if (windowCenter >= decorTop) {
        decor.classList.add('unscaled');
      }
    })

    centerDecors.forEach((decor) => {
      let decorTop = decor.previousElementSibling.offsetTop;
      if (windowCenter >= decorTop) {
        decor.classList.add('unscaled');
      }
    })

    learnLeftDecors.forEach((decor) => {
      let decorTop = decor.previousElementSibling.offsetTop;
      if (windowCenter >= decorTop) {
        decor.classList.add('unscaled');
      }
    })

  });

}
showDecor();