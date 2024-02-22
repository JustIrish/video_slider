const swiperWrapper = document.querySelector('.swiper-wrapper');

export const createSliderMarkup = data => {
  const videoMarkup = data
    .map(video => {
      return `<div class="swiper-slide" >
      <img src="${video.pictures.base_link}" data-uri="${video.uri}" class="gallery-image" alt="${video.name}" />
      </div>`;
    })
    .join('');

  swiperWrapper.insertAdjacentHTML('beforeend', videoMarkup);
};
