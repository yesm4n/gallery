'use strict';

const hourglass = document.querySelector('.lds-hourglass');
const container = document.querySelector('.container');
const fullscreen = document.querySelector('.full-screen');
const gallery = document.querySelector('.gallery');
const date = document.querySelector('.date');
const imagesLength = document.querySelector('.images-length');

fullscreen.classList.add('hidden');
container.classList.add('hidden');

let index = 1;

//
// IMAGES SECTION
//

const emptyArr = Array.from({ length: 23 }, (_, i) => i + 1).map(num => num);

// Creating new images based on the array above length
function handleCreateImages() {
  emptyArr.forEach((arr, i) => {
    const div = document.createElement('div');
    const img = document.createElement('img');
    const span = document.createElement('span');

    const wideDiv = [2, 7, 15, 18];
    if (wideDiv.includes(arr)) div.classList.add('card-wide');

    div.classList.add('card');
    img.setAttribute('src', `./images/${arr}.png`);
    span.textContent = i < 9 ? '0' + (i + 1) : i + 1;

    div.appendChild(img);
    div.appendChild(span);
    gallery.appendChild(div);

    img.addEventListener('click', () => {
      container.classList.add('hidden');
      fullscreen.classList.remove('hidden');

      index = i + 1;
      mainImg.setAttribute('src', `./images/${index}.png`);
      sideImg.setAttribute('src', `./images/${index + 1}.png`);
    });
  });
}

handleCreateImages();

//
// LOGO/BRAND SECTION
//

// Date (09'23)
const newDate = new Date();
const month = String(newDate.getMonth() + 1).padStart(2, 0);
const year = String(newDate.getFullYear()).slice(-2);

date.textContent = `(${month}'${year})`;
imagesLength.textContent = `(${emptyArr.length})`;

//
// FULL-SCREEN SECTION
//

const viewGallery = document.querySelector('.view-gallery');
const mainImg = document.querySelector('.main-img');
const sideImg = document.querySelector('.side-img');
const prevButton = document.querySelector('.btn-prev');
const nextButton = document.querySelector('.btn-next');

// Fullscreen
const handleFullscreenOn = () => {
  container.classList.add('hidden');
  fullscreen.classList.remove('hidden');
};

// Remove fullscreen
const handleFullscreenOff = () => {
  container.classList.remove('hidden');
  fullscreen.classList.add('hidden');
};

// Loading
const handleLoading = () => {
  hourglass.classList.add('hidden');
  container.classList.remove('hidden');
};

const maxIndex = emptyArr.length;

// Next button
const handleNextImages = () => {
  if (index === maxIndex - 1) {
    index = 1;
  } else {
    index = index + 1;
  }

  mainImg.setAttribute('src', `./images/${index}.png`);
  sideImg.setAttribute('src', `./images/${index + 1}.png`);
};

// Previous button
const handlePrevImages = () => {
  if (index === 1) {
    index = maxIndex - 1;
  } else {
    index = index - 1;
  }

  mainImg.setAttribute('src', `./images/${index}.png`);
  sideImg.setAttribute('src', `./images/${index + 1}.png`);
};

// Mouse wheel => horizontally
const wheelFunc = e => {
  gallery.scrollLeft += e.deltaY;
};

// Keyboard events
const handleKeypress = e => {
  if (e.key === 'ArrowLeft') handlePrevImages();
  if (e.key === 'ArrowRight') handleNextImages();
  if (e.key === 'Escape') handleFullscreenOff();
};

window.addEventListener('load', handleLoading);
window.addEventListener('wheel', wheelFunc);
document.addEventListener('keydown', handleKeypress);

viewGallery.addEventListener('click', handleFullscreenOn);
mainImg.addEventListener('click', handleFullscreenOff);
prevButton.addEventListener('click', handlePrevImages);
nextButton.addEventListener('click', handleNextImages);

const cards = document.querySelectorAll('.card');

cards.forEach(function (card) {
  card.addEventListener('mouseenter', function () {
    this.classList.add('active');
    const prevCard = this.previousElementSibling;
    const nextCard = this.nextElementSibling;

    if (prevCard) {
      prevCard.classList.add('shrink-left');
    }

    if (nextCard) {
      nextCard.classList.add('shrink-right');
    }
  });

  card.addEventListener('mouseleave', function () {
    this.classList.remove('active');
    const prevCard = this.previousElementSibling;
    const nextCard = this.nextElementSibling;

    if (prevCard) {
      prevCard.classList.remove('shrink-left');
    }

    if (nextCard) {
      nextCard.classList.remove('shrink-right');
    }
  });
});
//   });
