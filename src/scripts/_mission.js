 import {
   index
 } from "./_vars.js";

 if (index) {
   view3d();
 }

 function view3d() {
   const images = [
     'scooter-3d-1.png',
     'scooter-3d-2.png',
     'scooter-3d-3.png',
     'scooter-3d-4.png',
     'scooter-3d-5.png',
     'scooter-3d-6.png',
     'scooter-3d-7.png',
     'scooter-3d-8.png',
     'scooter-3d-9.png',
     'scooter-3d-10.png',
     'scooter-3d-11.png',
     'scooter-3d-12.png',
     'scooter-3d-13.png',
     'scooter-3d-14.png',
     'scooter-3d-15.png',
     'scooter-3d-16.png',
     'scooter-3d-17.png',
     'scooter-3d-18.png',
     'scooter-3d-19.png',
     'scooter-3d-20.png',
     'scooter-3d-21.png',
     'scooter-3d-22.png',
     'scooter-3d-23.png',
     'scooter-3d-24.png',
     'scooter-3d-25.png',
     'scooter-3d-26.png',
     'scooter-3d-27.png',
     'scooter-3d-28.png',
     'scooter-3d-29.png',
     'scooter-3d-30.png',
     'scooter-3d-31.png',
     'scooter-3d-32.png',
     'scooter-3d-33.png',
     'scooter-3d-34.png',
     'scooter-3d-35.png',
     'scooter-3d-36.png',
     'scooter-3d-37.png',
     'scooter-3d-38.png',
     'scooter-3d-39.png',
     'scooter-3d-40.png',
     'scooter-3d-41.png',
     'scooter-3d-42.png',
     'scooter-3d-43.png',
     'scooter-3d-44.png',
     'scooter-3d-45.png',
     'scooter-3d-46.png',
     'scooter-3d-47.png',
     'scooter-3d-48.png',
     'scooter-3d-49.png',
     'scooter-3d-50.png',
     'scooter-3d-51.png',
     'scooter-3d-52.png',
     'scooter-3d-53.png',
     'scooter-3d-54.png',
     'scooter-3d-55.png',
     'scooter-3d-56.png',
     'scooter-3d-57.png',
     'scooter-3d-58.png',
     'scooter-3d-59.png',
     'scooter-3d-60.png',
     'scooter-3d-61.png',
     'scooter-3d-62.png',
     'scooter-3d-63.png',
     'scooter-3d-64.png',
     'scooter-3d-65.png',
   ];

   const rightBtn = document.querySelector('.mission__buttom-right');
   const leftBtn = document.querySelector('.mission__buttom-left');
   const imgOuter = document.querySelector('.mission__img');
   const range = document.querySelector('.mission__range');

   let counter = 0;
   let rightCounter;
   let leftCounter;

   //  imgOuter.src = `img/` + images[0];
   range.min = 0;
   range.max = images.length - 1;

   function setImgOuterValue() {
     imgOuter.src = `img/` + images[range.value];
   }

 

   if (document.documentElement.clientWidth > 768) {

     range.addEventListener('mousedown', () => {
       range.style.cursor = 'grabbing';
     })

     range.addEventListener('mouseup', () => {
       range.style.cursor = 'grab';
     })

     range.addEventListener('input', () => {
      setImgOuterValue();
    });

     rightBtn.addEventListener('mousedown', () => {
       rightCounter = setInterval(() => {
         if (counter == images.length - 1) {
           return counter = images.length - 1;
         }
         if (setImgOuterValue) {
           counter = range.value;
         }
         counter++;
         range.value = counter;
         imgOuter.src = `img/` + images[range.value];
       }, 70);

     });


     rightBtn.addEventListener('mouseup', () => {
       clearInterval(rightCounter);
     })

     leftBtn.addEventListener('mousedown', () => {
       leftCounter = setInterval(() => {
         if (counter == 0) {
           return counter = 0;
         }
         if (setImgOuterValue) {
           counter = range.value;
         }
         counter--;
         range.value = counter;
         imgOuter.src = `img/` + images[range.value];
       }, 70);
     })

     leftBtn.addEventListener('mouseup', () => {
       clearInterval(leftCounter);
     })

   }

   if (document.documentElement.clientWidth <= 768) {

    range.addEventListener('input', () => {
      setImgOuterValue();
    });

     rightBtn.addEventListener('touchstart', (e) => {
       e.preventDefault();
       rightCounter = setInterval(() => {
         if (counter == images.length - 1) {
           return counter = images.length - 1;
         }
         if (setImgOuterValue) {
           counter = range.value;
         }
         counter++;
         range.value = counter;
         imgOuter.src = `img/` + images[range.value];
       }, 70);

     });

     rightBtn.addEventListener('touchend', (e) => {
       e.preventDefault();
       clearInterval(rightCounter);
     })

     leftBtn.addEventListener('touchstart', (e) => {
       e.preventDefault();
       leftCounter = setInterval(() => {
         if (counter == 0) {
           return counter = 0;
         }
         if (setImgOuterValue) {
           counter = range.value;
         }
         counter--;
         range.value = counter;
         imgOuter.src = `img/` + images[range.value];
       }, 70);
     })

     leftBtn.addEventListener('touchend', (e) => {
       e.preventDefault();
       clearInterval(leftCounter);
     })
   }


 }