import * as constants from '../constants.js';
import * as utils from '../utils/utils.js';

export default class Slider {
  static SELECTORS = {
    PREV_BUTTON: '.control_prev',
    NEXT_BUTTON: '.control_next',
    INNER: '.slider__inner',
    SLIDE: '.slider__slide',
    CONTROL: '.control',
  };

  static TABLET_STEPS = 6;
  static DESKTOP_STEPS = 3;

  constructor() {
    this._steps = 0;

    this.init();
  }

  init() {
    this.nextButton = document.querySelector(Slider.SELECTORS.NEXT_BUTTON);
    this.prevButton = document.querySelector(Slider.SELECTORS.PREV_BUTTON);
    this.inner = document.querySelector(Slider.SELECTORS.INNER);
    this.controls = document.querySelectorAll(Slider.SELECTORS.CONTROL);

    if (!this.inner) {
      return;
    }

    this._maxSteps = this.getMaxSteps();

    this.addListeners();
    this.handleResize();
  }

  addListeners() {
    this.nextButton.addEventListener('click', () => this.setDirection('next'));
    this.prevButton.addEventListener('click', () => this.setDirection('prev'));
  }

  handleResize() {
    window.addEventListener('resize', () => {
      this.reset();
    });
  }

  getMaxSteps() {
    return utils.isTablet() ? Slider.TABLET_STEPS : Slider.DESKTOP_STEPS;
  }

  reset() {
    this._maxSteps = this.getMaxSteps();

    this._steps = 0;

    this.inner.style.transform = `translateX(0px)`;

    this.updateControlState();
  }

  setDirection(direction) {
    this.moveSlider(direction === 'next' ? 1 : -1);
  }

  moveSlider(direction) {
    this.updateSteps(direction);
    this.updateControlState();

    const offset = this.calculateOffset();

    this.inner.style.transform = `translateX(-${offset}px)`;
  }

  updateControlState() {
    this.controls.forEach((btn) =>
      btn.classList.remove(constants.INACTIVE_CLASS)
    );

    if (this._steps >= this._maxSteps) {
      this.setInactiveControl(this.nextButton);
    }
    if (this._steps <= 0) {
      this.setInactiveControl(this.prevButton);
    }
  }

  calculateOffset = () =>
    ((this.inner.scrollWidth - this.inner.offsetWidth) / this._maxSteps) *
    this._steps;

  updateSteps(direction) {
    this._steps += direction;
    this._steps = Math.max(0, Math.min(this._steps, this._maxSteps));
  }

  setInactiveControl(button) {
    button.classList.add(constants.INACTIVE_CLASS);
  }
}
