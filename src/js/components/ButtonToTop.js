import * as constants from '../constants.js';
import * as utils from '../utils/utils.js';

export default class ButtonToTop {
  static SELECTORS = {
    BUTTON: '.to-top',
    GIFT_PAGE: '#gift-page',
  };

  static SCROLL_BOTTOM_OFFSET = 300;

  constructor() {
    this.button = null;
    this.root = null;
    this.giftPage = document.querySelector(ButtonToTop.SELECTORS.GIFT_PAGE);

    if (!this.giftPage) return;

    this.init(this.giftPage);
  }

  init(parent) {
    this.render(parent);

    this.button = document.querySelector(ButtonToTop.SELECTORS.BUTTON);
    this.root = document.documentElement;

    this.handleResize = this.handleResize.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);

    this.handleResize();

    window.addEventListener('resize', this.handleResize);
  }

  render(parent) {
    const button = document.createElement('button');
    button.className = 'to-top';

    button.innerHTML = `<svg class="icon">
        <use xlink:href="./assets/icons/arrow-up.svg#arrowUp"></use>
      </svg>`;

    parent.append(button);
  }

  handleResize() {
    utils.isTablet() ? this.addListeners() : this.removeListeners();
  }

  addListeners() {
    document.addEventListener('scroll', this.handleScroll);
    this.button.addEventListener('click', this.scrollToTop);
  }

  removeListeners() {
    document.removeEventListener('scroll', this.handleScroll);
    this.button.removeEventListener('click', this.scrollToTop);

    this.hide();
  }

  handleScroll() {
    this.root.scrollTop >= ButtonToTop.SCROLL_BOTTOM_OFFSET
      ? this.show()
      : this.hide();
  }

  show() {
    this.button.classList.add(constants.VISIBLE);
  }

  hide() {
    this.button.classList.remove(constants.VISIBLE);
  }

  scrollToTop() {
    this.root.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
