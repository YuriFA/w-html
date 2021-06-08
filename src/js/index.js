import Accordion from 'accordion-js';
// core version + navigation, pagination modules:
import Swiper, { Navigation, Pagination } from 'swiper/core';

import { ColorPicker, ATTRS as COLOR_PICKER_ATTRS } from './lib/color-picker';
import { DOMReady } from './utils/DOMReady';

// configure Swiper to use modules
Swiper.use([Navigation, Pagination]);

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

  const faqQuestions = Array.from(document.querySelectorAll('.faq-questions'));

  if (faqQuestions.length > 0) {
    faqQuestions.forEach((element, index) => {
      new Accordion(element, {
        duration: 400,
        elementClass: 'faq-questions__item',
        triggerClass: 'faq-questions__title',
        panelClass: 'faq-questions__panel',
        openOnInit: index === 0 ? [0] : [],
        showMultiple: true,
      });
    });
  }
};

const initColorPicker = () => {
  const colorPickers = Array.from(
    document.querySelectorAll(`[${COLOR_PICKER_ATTRS.CONTINER}]`),
  );
  if (colorPickers) {
    colorPickers.forEach((element) => {
      new ColorPicker(element);
    });
  }
};

const initProductColorPicker = () => {
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
      console.log({ nextEl, prevEl });

      new Swiper(colorsListElement, {
        wrapperClass: 'colors-list',
        slideClass: 'colors-list__item',
        slidesPerView: 4,
        // spaceBetween: 5,
        allowTouchMove: false,

        breakpoints: {
          // when window width is >= 320px
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

DOMReady(() => {
  initStickyHeader();
  initSidebar();

  const mobileMatchMedia = window.matchMedia('(max-width: 768px)');
  mobileMatchMedia.addListener(initAccordion);
  window.addEventListener('load', function () {
    initAccordion(mobileMatchMedia);
  });

  initColorPicker();

  initReadMore();

  initProductSlider();

  initProductColorPicker();
});
