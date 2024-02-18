const modalSwiper = document.querySelector('.swiper-in-modal-wrapper');

export const createModalSliderMarkup = (videoId, isAutoplay) => {
  const markup = `<div class="swiper-slide">
        
      <iframe
        src="https://player.vimeo.com/video/${videoId}?${isAutoplay}"
        width="600"
        height="500"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture"

      ></iframe>
      
    </div>`;

  modalSwiper.insertAdjacentHTML('beforeend', markup);
};
