import Swiper from 'swiper';

import { fetchVideo } from '../Api/fetchVideos';
import { createSliderMarkup } from './createSliderMarkup';

const swiper = new Swiper('.swiper', {
  slidesPerView: 4,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  scrollbar: {
    el: '.swiper-scrollbar',
  },
});

async function onRenderSlider() {
  const videos = await fetchVideo();

  createSliderMarkup(videos.data);
}

onRenderSlider();
