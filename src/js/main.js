// import Swiper from 'swiper';

import { fetchVideo } from '../Api/fetchVideos';
import { createSliderMarkup } from './createSliderMarkup';
import { onCloseModal } from './closeModal';

const backdrop = document.querySelector('.js-backdrop');
const btnCloseModal = document.querySelector('.js-close-modal');

const videoSlider = new Swiper('.video-slider', {
  slidesPerView: 4,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  scrollbar: {
    el: '.swiper-scrollbar',
  },

  mousewheel: {
    sensitivity: 1,
    eventsTarget: '.video-slider',
  },
});

async function onRenderSlider() {
  const videos = await fetchVideo();

  createSliderMarkup(videos.data);

  const galleryImage = document.querySelectorAll('.gallery-image');

  galleryImage.forEach((image, index) => {
    image.addEventListener('click', () => {
      backdrop.classList.add('is-open');
    });
  });
}

btnCloseModal.addEventListener('click', onCloseModal);
backdrop.addEventListener('click', e => {
  if (e.currentTarget === e.target) {
    onCloseModal();
  }
});

onRenderSlider();
