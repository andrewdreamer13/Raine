const mask = document.querySelector('.mask');
window.addEventListener('load',function(){
  mask.classList.add('hide');
  setTimeout(function(){
    mask.remove();
  },600)
});
console.log(mask)