

const icons = document.querySelectorAll('.icon');
const descrIcons = document.querySelectorAll('.description__svg');


function showIcon() {

  window.addEventListener('scroll', function () {
    let scrolled = scrollY;
    let windowHeight = window.innerHeight / 2;
    let windowCenter = scrolled + windowHeight;

      icons.forEach((icon) => {
        let iconTop = icon.closest('li').offsetTop;
        if (windowCenter >= iconTop) {
          icon.style.fill = ' #F14339';
        }
      });

      descrIcons.forEach((icon) => {
        let iconTop = icon.closest('li').offsetTop;
        if (windowCenter >= iconTop) {
          icon.classList.add('animate-svg');
        }
      })

  });

}
showIcon();

