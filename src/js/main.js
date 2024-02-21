import { fetchVideo } from './services/Api/fetchVideos';
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from './services/localStorage';
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
