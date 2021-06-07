import Accordion from 'accordion-js';

import { ColorPicker, ATTRS as COLOR_PICKER_ATTRS } from './lib/color-picker';
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

const initSidebar = () => {
  const CLASSES = {
    TRIGGER: 'sidenav-trigger',
    TRIGGER_OPEN: 'sidenav-trigger--open',
  };

  const SIDEBAR_ID = 'sidenav';

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
});
