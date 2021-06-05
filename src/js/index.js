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

DOMReady(() => {
  initStickyHeader();
  initSidebar();
});
