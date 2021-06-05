import { DOMReady } from './utils/DOMReady';

const initStickyHeader = () => {
  const header = document.querySelector('.header');
  const sticky = header.offsetTop + 50;

  function handleScroll() {
    if (window.pageYOffset > sticky) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  }

  // When the user scrolls the page, execute myFunction
  window.addEventListener('scroll', handleScroll);
  handleScroll();
};

DOMReady(() => {
  initStickyHeader();
});
