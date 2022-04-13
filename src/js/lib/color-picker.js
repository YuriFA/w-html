export const ATTRS = {
  WRAPPER: 'data-color-picker-wrapper',
  CONTINER: 'data-color-picker',
  IMAGE_CONTINER: 'data-color-picker-images',
  ACTIVE: 'data-color-picker-active',
  IMAGE_ACTIVE: 'data-color-picker-image-active',
  IMAGE_HIDDEN: 'data-color-picker-image-hidden',
  PREV_BUTTON: 'data-color-picker-prev',
  NEXT_BUTTON: 'data-color-picker-next',
  LIST: 'data-color-picker-list',
};

export class ColorPicker {
  constructor(wrapper) {
    this.wrapper = wrapper;

    this.init();
  }

  init = () => {
    this.activeColor = undefined;

    this.container = this.wrapper.querySelector(`[${ATTRS.CONTINER}]`);
    this.colorListWrapper = this.container.querySelector(`[${ATTRS.LIST}]`);
    this.imageListWrapper = this.wrapper.querySelector(
      `[${ATTRS.IMAGE_CONTINER}]`,
    );
    this.imageList = Array.from(this.imageListWrapper.querySelectorAll('picture'));
    this.colorList = Array.from(this.colorListWrapper.children);

    if (this.colorListWrapper) {
      this.toggleActive(
        this.colorListWrapper.querySelector(`[${ATTRS.ACTIVE}]`),
      );

      this.colorList.forEach((child) => {
        const colorButton = child.querySelector('button');

        colorButton.addEventListener('click', (event) => {
          const nextColor = event.currentTarget.parentElement;
          this.toggleActive(nextColor);
        });
      });
    }
  };

  toggleActive = (nextColor) => {
    if (this.activeColor) {
      this.activeColor.removeAttribute(ATTRS.ACTIVE);
    }
    nextColor.setAttribute(ATTRS.ACTIVE, '');

    this.activeColor = nextColor;

    this.activeIndex = this.colorList.findIndex(
      (el) => el === this.activeColor,
    );

    // this.imageList.map((image, index) => {
    //   if (index === this.activeIndex) {
    //     image.removeAttribute(ATTRS.IMAGE_HIDDEN);
    //     image.setAttribute(ATTRS.IMAGE_ACTIVE, '');
    //   } else {
    //     image.setAttribute(ATTRS.IMAGE_HIDDEN, '');
    //   }
    // });
  };
}
