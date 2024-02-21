import { fetchVideo } from './services/Api/fetchVideos';
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from './services/localStorage';
import { createSliderMarkup } from './createSliderMarkup';
import { createModalSliderMarkup } from './createModalMarkup';
import { onCloseModal } from './closeModal';

const modalSwiper = document.querySelector('.swiper-in-modal-wrapper');
const backdrop = document.querySelector('.js-backdrop');
const btnCloseModal = document.querySelector('.js-close-modal');

import Player from '@vimeo/player';

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

const modalSlider = new Swiper('.swiper-in-modal', {
  slidesPerView: 1,

  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },

  on: {
    slideChangeTransitionEnd: function () {
      const iframe = document.querySelector(
        '.swiper-in-modal-wrapper .swiper-slide-active'
      );
      if (iframe) {
        const player = new Player(iframe);
        player.play();
      }
    },
  },
});

async function onRenderSlider() {
  const savedData = loadFromLocalStorage('videos');

  if (!savedData) {
    const videos = await fetchVideo();
    saveToLocalStorage('videos', videos.data);
    createSliderMarkup(videos.data);
  } else {
    createSliderMarkup(savedData);
  }

  const galleryImage = document.querySelectorAll('.gallery-image');

  galleryImage.forEach((image, index) => {
    image.addEventListener('click', () => {
      modalSwiper.innerHTML = '';

      galleryImage.forEach((image, i) => {
        const dataValue = image.dataset.uri.split('/');

        const videoId = dataValue[2];

        const isAutoplay = index === i ? 'autoplay=1' : '';

        createModalSliderMarkup(videoId, isAutoplay);
      });

      modalSlider.slideTo(index);

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
