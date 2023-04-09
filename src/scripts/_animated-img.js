const invertImages = document.querySelectorAll('img');
function startImgEffect() {

  window.addEventListener('scroll', function () {
    let scrolled = scrollY;
    let windowHeight = window.innerHeight / 2;
    let windowCenter = scrolled + windowHeight;

    invertImages.forEach( (img) => {
      let imgTop = img.offsetTop;
      // let imgHeight = img.offsetHeight / 2;
      // let imgCenter = imgTop + imgHeight;

      if (windowCenter >= imgTop) {
       img.classList.add('uninverted');
      }
    })
});

}
startImgEffect();