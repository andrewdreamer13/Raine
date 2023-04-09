// when descktop

  const dots = document.querySelectorAll('.hero__slider-button');
  const dotInner = document.querySelectorAll('.hero__button-dot');
  const slider = document.querySelector('.slider__cards');
  const cards = document.querySelectorAll('.slider__card');
  const images = document.querySelectorAll('.slider-img'); 

if(document.documentElement.clientWidth > 768) {
  
  let count = 0;
  
  dots.forEach((dot, dotIndex) => {
    dot.addEventListener('click', (e) => {
      count = 100 * dotIndex;
  
      dots.forEach(dot => {
        dot.classList.remove('hero__slider-button--active');
        dots[dotIndex].classList.add('hero__slider-button--active');
      })
      dotInner.forEach((inner) => {
        inner.classList.remove('hero__button-dot--active');
        dotInner[dotIndex].classList.add('hero__button-dot--active');
      })
  
      cards.forEach((card) => {
        card.style.transform = `translate(${-count}%)`;
      })
  
      images.forEach((img, imgIndex) => {
        imgIndex = dotIndex;
        images[imgIndex].classList.add('scaled');
        img.classList.remove('scaled');
      })
  
    })
  });
  
}

// when mobile
if (document.documentElement.clientWidth <= 768) {

  let isDragging = false,
    startPos = 0,
    currentTranslate = 0,
    prevTranslate = 0,
    currentIndex = 0

  cards.forEach((card, index) => {

    card.addEventListener('touchstart', touchStart(index))
    card.addEventListener('touchend', touchEnd)
    card.addEventListener('touchmove', touchMove)

  });

  function getPositionX(event) {
    return event.touches[0].clientX;
  }

  function touchStart(index) {
    return function (event) {
      currentIndex = index;
      startPos = getPositionX(event);
      isDragging = true;
    }

  }

  function touchMove(event) {
    if (isDragging) {
      const currentPosition = getPositionX(event);
      currentTranslate = prevTranslate + currentPosition - startPos;
    }
  }

  function touchEnd() {
    isDragging = false
    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -50 && currentIndex < cards.length - 2) {
      currentIndex += 1;
    }

    if (movedBy > 50 && currentIndex > 0) {
      currentIndex -= 1;
    }

    setPositionByIndex();

  }

  function setPositionByIndex() {
    const cardWidth = slider.getBoundingClientRect().width;
    currentTranslate = currentIndex * -cardWidth
    prevTranslate = currentTranslate;
    setSliderPosition();
    changeDotsImage();
    changeImgStyle();
  }

  function setSliderPosition() {
   slider.style.transform = `translateX(${currentTranslate}px)`;
  }

  function changeDotsImage() {
    dots.forEach(dot => {
      dot.classList.remove('hero__slider-button--active');
      dots[currentIndex].classList.add('hero__slider-button--active');
    })
    dotInner.forEach((inner) => {
      inner.classList.remove('hero__button-dot--active');
      dotInner[currentIndex].classList.add('hero__button-dot--active');
    })
  }
  
  function changeImgStyle() {
    images.forEach((img) => {
      images[currentIndex].classList.add('scaled');
      img.classList.remove('scaled');
    })
  }

}
