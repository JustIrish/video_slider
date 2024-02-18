// import Swiper from 'swiper';

import { fetchVideo } from '../Api/fetchVideos';
import { createSliderMarkup } from './createSliderMarkup';

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
}

onRenderSlider();
