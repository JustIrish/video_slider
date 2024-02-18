const backdrop = document.querySelector('.js-backdrop');

export const onCloseModal = () => {
  console.log('click on btn-close');
  backdrop.classList.remove('is-open');
};
