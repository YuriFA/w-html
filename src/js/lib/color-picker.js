export const ATTRS = {
  CONTINER: 'data-color-picker',
  ACTIVE: 'data-color-picker-active',
  PREV_BUTTON: 'data-color-picker-prev',
  NEXT_BUTTON: 'data-color-picker-next',
  LIST: 'data-color-picker-list',
};

export class ColorPicker {
  constructor(container) {
    this.container = container;

    this.init();
  }

  init = () => {
    this.activeColor = undefined;

    this.buttonPrev = this.container.querySelector(`[${ATTRS.PREV_BUTTON}]`);
    this.buttonNext = this.container.querySelector(`[${ATTRS.NEXT_BUTTON}]`);
    this.colorList = this.container.querySelector(`[${ATTRS.LIST}]`);

    if (this.colorList) {
      this.activeColor = this.colorList.querySelector(`[${ATTRS.ACTIVE}]`);

      Array.from(this.colorList.children).forEach((child) => {
        const colorButton = child.querySelector('button');

        colorButton.addEventListener('click', (event) => {
          const nextColor = event.currentTarget.parentElement;
          this.toggleActive(nextColor);
        });
      });
    }

    this.buttonNext.addEventListener('click', () => {
      let nextColor = this.activeColor.nextElementSibling;

      if (!nextColor) {
        nextColor = this.colorList.children[0];
      }

      this.toggleActive(nextColor);
    });

    this.buttonPrev.addEventListener('click', () => {
      let nextColor = this.activeColor.previousElementSibling;

      if (!nextColor) {
        nextColor = this.colorList.children[this.colorList.children.length - 1];
      }

      this.toggleActive(nextColor);
    });
  };

  toggleActive = (nextColor) => {
    this.activeColor.removeAttribute(ATTRS.ACTIVE);
    nextColor.setAttribute(ATTRS.ACTIVE, '');

    this.activeColor = nextColor;
  };
}
