import {
  index
} from "./_vars.js";

if (index) {
  testimonialsSlider();
}

function testimonialsSlider() {

  const slider = document.querySelector('.testimonials__slider');
  const sliderTrack = document.querySelector('.testimonials__slider-track');
  const nextBtn = document.querySelector('.testimonials__button-right');
  const prevBtn = document.querySelector('.testimonials__button-left');
  const cards = document.querySelectorAll('.testimonials__card');

  if (document.documentElement.clientWidth >= 610) {
    let count = 0;

    nextBtn.addEventListener('click', () => {
      count++;

      if (count >= cards.length - 1 && window.innerWidth >= 610) {
        count--;
      } else if (count >= cards.length && window.innerWidth < 610) {
        count--;
      } else {
        cards.forEach((card) => {
          card.style.transform += `translateX(-100%)`;
        })
      }

    })

    prevBtn.addEventListener('click', () => {
      count--;
      if (count < 0) {
        count = 0;
      } else {
        cards.forEach((card) => {
          card.style.transform += `translateX(100%)`;
        })
      }

    })
  }

  // when mobile

  if (document.documentElement.clientWidth < 610) {

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

      if (movedBy < -50 && currentIndex < cards.length - 1) {
        currentIndex += 1;
        setSliderPositionNext()
      }

      if (movedBy > 50 && currentIndex > 0) {
        currentIndex -= 1;
        setSliderPositionPrev()
      }

      setPositionByIndex();

    }

    function setPositionByIndex() {
      const cardWidth = slider.getBoundingClientRect().width;
      currentTranslate = currentIndex * -cardWidth
      prevTranslate = currentTranslate;
    }

    function setSliderPositionNext() {
      cards.forEach((card) => {
        card.style.transform =  card.style.transform += `translateX(-100%)`;
      })
    }

    function setSliderPositionPrev() {
      cards.forEach((card) => {
        card.style.transform =  card.style.transform += `translateX(100%)`;
      })
    }

  }

}