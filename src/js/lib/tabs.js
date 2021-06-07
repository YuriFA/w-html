/* eslint-disable no-use-before-define */
function initTab(container) {
  if (!container) {
    return null;
  }

  const tablist = container.querySelector('[role="tablist"]');

  if (!tablist) {
    return null;
  }

  let tabs;
  let panels;
  const delay = determineDelay();

  generateArrays();

  function generateArrays() {
    tabs = container.querySelectorAll('[role="tab"]');
    panels = container.querySelectorAll('[role="tabpanel"]');
  }

  const KEYS = {
    end: 35,
    home: 36,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    delete: 46,
  };

  const DIRECTION = {
    37: -1,
    38: -1,
    39: 1,
    40: 1,
  };

  for (let i = 0; i < tabs.length; i += 1) {
    const tabButtonElement = tabs[i];

    tabButtonElement.addEventListener('click', () => {
      activateTab(tabButtonElement, false);
    });
    tabButtonElement.addEventListener('touchend', () => {
      activateTab(tabButtonElement, false);
    });
    tabButtonElement.addEventListener('keydown', keydownEventListener);
    tabButtonElement.addEventListener('keyup', keyupEventListener);

    tabButtonElement.index = i;
  }

  function keydownEventListener(event) {
    const key = event.keyCode;

    switch (key) {
      case KEYS.end:
        event.preventDefault();
        activateTab(tabs[tabs.length - 1]);
        break;
      case KEYS.home:
        event.preventDefault();
        activateTab(tabs[0]);
        break;

      case KEYS.up:
      case KEYS.down:
        determineOrientation(event);
        break;
      default:
        break;
    }
  }

  function keyupEventListener(event) {
    const key = event.keyCode;

    switch (key) {
      case KEYS.left:
      case KEYS.right:
        determineOrientation(event);
        break;
      case KEYS.delete:
        determineDeletable(event);
        break;
      default:
        break;
    }
  }

  function determineOrientation(event) {
    const key = event.keyCode;
    const vertical = tablist.getAttribute('aria-orientation') === 'vertical';

    let proceed = false;

    if (vertical && (key === KEYS.up || key === KEYS.down)) {
      event.preventDefault();
      proceed = true;
    } else if (key === KEYS.left || key === KEYS.right) {
      proceed = true;
    }

    if (proceed) {
      switchTabOnArrowPress(event);
    }
  }

  function switchTabOnArrowPress(event) {
    const pressed = event.keyCode;

    for (let x = 0; x < tabs.length; x += 1) {
      tabs[x].addEventListener('focus', focusEventHandler);
    }

    if (DIRECTION[pressed]) {
      const { target } = event;

      if (target.index !== undefined) {
        if (tabs[target.index + DIRECTION[pressed]]) {
          tabs[target.index + DIRECTION[pressed]].focus();
        } else if (pressed === KEYS.left || pressed === KEYS.up) {
          focusLastTab();
        } else if (pressed === KEYS.right || pressed === KEYS.down) {
          focusFirstTab();
        }
      }
    }
  }

  function activateTab(tab, setFocus = true) {
    deactivateTabs();

    tab.removeAttribute('tabindex');
    tab.setAttribute('aria-selected', 'true');

    const controls = tab.getAttribute('aria-controls');
    const controlsElement = document.getElementById(controls);

    if (controlsElement) {
      const animation = controlsElement.getAttribute('data-animation');
      if (animation) {
        controlsElement.classList.add('animated', animation);
      }

      controlsElement.removeAttribute('hidden');
    }

    if (setFocus) {
      tab.focus();
    }
  }

  function deactivateTabs() {
    for (let t = 0; t < tabs.length; t += 1) {
      tabs[t].setAttribute('tabindex', '-1');
      tabs[t].setAttribute('aria-selected', 'false');
      tabs[t].removeEventListener('focus', focusEventHandler);
    }

    for (let p = 0; p < panels.length; p += 1) {
      panels[p].setAttribute('hidden', 'hidden');
    }
  }

  function focusFirstTab() {
    tabs[0].focus();
  }

  function focusLastTab() {
    tabs[tabs.length - 1].focus();
  }

  function determineDeletable(event) {
    if (event.target.getAttribute('data-deletable') !== null) {
      deleteTab(event);

      generateArrays();

      if (event.target.index - 1 < 0) {
        activateTab(tabs[0]);
      } else {
        activateTab(tabs[event.target.index - 1]);
      }
    }
  }

  function deleteTab(event) {
    const panel = document.getElementById(
      event.target.getAttribute('aria-controls'),
    );

    event.target.parentElement.removeChild(event.target);
    panel.parentElement.removeChild(panel);
  }

  function determineDelay() {
    const hasDelay = tablist.hasAttribute('data-delay');
    let resDelay = 0;

    if (hasDelay) {
      const delayValue = tablist.getAttribute('data-delay');

      if (delayValue) {
        resDelay = delayValue;
      } else {
        resDelay = 300;
      }
    }

    return resDelay;
  }

  function focusEventHandler(event) {
    setTimeout(checkTabFocus, delay, event.target);
  }

  function checkTabFocus(target) {
    const focused = document.activeElement;

    if (target === focused) {
      activateTab(target, false);
    }
  }

  return null;
}

function initTabs() {
  const tabContainers = document.querySelectorAll('.ctabs');

  Array.from(tabContainers).forEach(container => initTab(container));
}

export default initTabs;
