import Accordion from 'accordion-js';
// core version + navigation, pagination modules:
import Swiper, { Navigation, Pagination } from 'swiper/core';

import { ColorPicker, ATTRS as COLOR_PICKER_ATTRS } from './lib/color-picker';
import { DOMReady } from './utils/DOMReady';

// configure Swiper to use modules
Swiper.use([Navigation, Pagination]);

const initStickyHeader = () => {
  const header = document.querySelector('.header');
  const sidenav = document.querySelector('.sidenav');
  const sticky = header.offsetTop + 50;

  function handleScroll() {
    if (window.pageYOffset > sticky) {
      header.classList.add('sticky');
      sidenav.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
      sidenav.classList.remove('sticky');
    }
  }

  // When the user scrolls the page, execute myFunction
  window.addEventListener('scroll', handleScroll);
  handleScroll();
};

const initStickyCategories = () => {
  const categories = document.querySelector('.product-categories-wrapper');
  if (!categories) {
    return;
  }

  const sticky = categories.offsetTop - categories.offsetHeight;
  function handleScroll() {
    categories.classList.toggle('sticky', window.pageYOffset > sticky);
  }

  // When the user scrolls the page, execute myFunction
  window.addEventListener('scroll', handleScroll);
  handleScroll();
};

const initSidebar = () => {
  const CLASSES = {
    TRIGGER: 'sidenav-trigger',
    TRIGGER_OPEN: 'sidenav-trigger--open',
  };

  const SIDEBAR_ID = 'sidenav';

  document.getElementById(
    SIDEBAR_ID,
  ).style.transition = `all 0.3s cubic-bezier(0, 0, 0.2, 1)`;

  const sidebarTrigger = Array.from(
    document.querySelectorAll(`.${CLASSES.TRIGGER}`),
  );

  let isOpen = false;

  function openNav() {
    isOpen = true;
    document.body.style.overflow = 'hidden';
    document.getElementById(SIDEBAR_ID).style.transform = `translateX(0)`;
  }

  function closeNav() {
    isOpen = false;
    document.body.style.overflow = null;
    document.getElementById(SIDEBAR_ID).style.transform = `translateX(100%)`;
  }

  if (sidebarTrigger) {
    sidebarTrigger.forEach((element) => {
      element.addEventListener('click', () => {
        if (isOpen) {
          sidebarTrigger.forEach((element) => {
            element.classList.remove(CLASSES.TRIGGER_OPEN);
          });
          closeNav();
        } else {
          sidebarTrigger.forEach((element) => {
            element.classList.add(CLASSES.TRIGGER_OPEN);
          });
          openNav();
        }
      });
    });
  }
};

const initAccordion = (event) => {
  if (!event.matches) {
    return;
  }

  let accordions = [];

  const faqQuestions = Array.from(document.querySelectorAll('.faq-questions'));

  if (faqQuestions.length > 0) {
    faqQuestions.forEach((element) => {
      let accordion = new Accordion(element, {
        duration: 400,
        elementClass: 'faq-questions__item',
        triggerClass: 'faq-questions__title',
        panelClass: 'faq-questions__panel',
        showMultiple: true,
      });

      accordions.push(accordion)
    });
  }

  const desktopMatchMedia = window.matchMedia('(min-width: 1025px)');
  desktopMatchMedia.addListener((e) => {
    if (!e.matches) {
      return;
    }

    accordions.forEach((accordion) => {
      accordion.detachEvents();
    })
  });
};

const initColorPicker = () => {
  const colorPickers = Array.from(
    document.querySelectorAll(`[${COLOR_PICKER_ATTRS.WRAPPER}]`),
  );

  if (colorPickers) {
    colorPickers.forEach((element) => {
      new ColorPicker(element);
    });
  }
};

const initProductColorPicker = (startIndex = 0) => {
  const colorsLists = Array.from(
    document.querySelectorAll('.colors-list-wrapper'),
  );

  if (colorsLists.length > 0) {
    colorsLists.forEach((colorsListElement) => {
      const parentElement = colorsListElement.parentElement;

      const nextEl = parentElement.querySelector(
        '.colors-button.colors-button--right',
      );
      const prevEl = parentElement.querySelector(
        '.colors-button.colors-button--left',
      );
      const list = Array.from(colorsListElement.children[0].children);
      // const activeIndex = list.findIndex((element) => {
      //   return element.hasAttribute(COLOR_PICKER_ATTRS.ACTIVE);
      // });

      if (list.length < 5) {
        nextEl.style.display = 'none';
        prevEl.style.display = 'none';
        return;
      }

      window.swiper = new Swiper(colorsListElement, {
        initialSlide: startIndex,
        wrapperClass: 'colors-list',
        slideClass: 'colors-list__item',
        slidesPerView: 4,
        // spaceBetween: 5,
        allowTouchMove: false,

        breakpoints: {
          // when window width is >= 769
          769: {
            slidesPerView: 4,
          },
        },
        // Navigation arrows
        navigation: {
          nextEl: nextEl,
          prevEl: prevEl,
        },
      });
    });
  }
};

const initProductImageSwiper = (startIndex = 0) => {
  const productImageContainer = 
    document.querySelector('.product__image-container')

  if (productImageContainer) {
    window.productImageSwiper = new Swiper(productImageContainer, {
      initialSlide: startIndex,
      wrapperClass: 'product__image-wrapper',
      slideClass: 'product__image-picture',
      slidesPerView: 1,
      centeredSlides: true,
      spaceBetween: 30,
      allowTouchMove: true,

      breakpoints: {
        // when window width is >= 769
        769: {
          allowTouchMove: false,
        },
      },
    });

    // window.productImageSwiper.on('slideChange', swiperInstance => {
    //   console.log({INDEX: swiperInstance.activeIndex});
    // })
  }
};

const initReadMore = () => {
  const privacyMoreButton = document.querySelector('.privacy-read-more');
  const privacyMoreContent = document.querySelector('.privacy-notice__more');

  if (privacyMoreButton) {
    privacyMoreButton.addEventListener('click', () => {
      privacyMoreButton.style.display = 'none';
      privacyMoreContent.classList.toggle('privacy-notice__more--active');
    });
  }
};

const initProductSlider = () => {
  new Swiper('.swiper-container', {
    loop: true,

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
};

const initVideo = () => {
  const iframeVideo = document.querySelector('iframe.video');
  const iframeVideoButtonPlay = document.querySelector('.video-play-button');

  if (iframeVideo && iframeVideoButtonPlay) {
    iframeVideoButtonPlay.addEventListener('click', () => {
      iframeVideoButtonPlay.style.display = 'none';
      // mute=1&amp;
      iframeVideo.src += '&amp;autoplay=1&amp;enablejsapi=1';
    });
  }
};

const initIngridientsList = () => {
  const button = document.querySelector('.product-button-full-ingridients');
  const ingridientListContainer = document.querySelector('.full-ingridients');

  if (!button && !ingridientListContainer) {
    return;
  }

  button.addEventListener('click', () => {
    if (ingridientListContainer.style.maxHeight) {
      ingridientListContainer.style.maxHeight = null;
      ingridientListContainer.classList.remove('full-ingridients--show');
    } else {
      ingridientListContainer.style.maxHeight =
        ingridientListContainer.scrollHeight + 'px';
      ingridientListContainer.classList.add('full-ingridients--show');
    }

    button.style.opacity = 0;
  });
};

const initAll = () => {
  initStickyHeader();
  initStickyCategories();
  initSidebar();

  const mobileMatchMedia = window.matchMedia('(max-width: 1024px)');
  mobileMatchMedia.addListener(initAccordion);
  window.addEventListener('load', function () {
    initAccordion(mobileMatchMedia);
  });

  initColorPicker();
  initReadMore();
  initProductSlider();

  initProductColorPicker();
  initProductImageSwiper();

  initVideo();
  initIngridientsList();
};

DOMReady(() => {
  initAll();

  window.initAll = initAll;
  window.initProductSlider = initProductSlider;
  window.initProductColorPicker = initProductColorPicker;
});
