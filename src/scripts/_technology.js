
const pinButtons = document.querySelectorAll('.demonstration__button');
const pins = document.querySelectorAll('.demonstration__pin');

pinButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    pinButtons.forEach(button => {
      button.classList.remove('demonstration__button-active');
    })
    pinButtons[index].classList.add('demonstration__button-active');

    pins.forEach((pin, pinIndex) => {
      pinIndex = index;
      pins.forEach(pin => {
        pin.classList.remove('demonstration__pin-active');
      })
      pins[pinIndex].classList.add('demonstration__pin-active');
    })
  })
})