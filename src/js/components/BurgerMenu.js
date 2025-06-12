import * as constants from '../constants.js';
import * as utils from '../utils/utils.js';

export default class BurgerMenu {
  static SELECTORS = {
    NAVIGATION_CONTAINER: '.navigation',
    NAVIGATION_LIST: '.navigation__list',
    NAVIGATION_ITEM: '.navigation__item',
    BURGER_BUTTON: '.burger-menu',
  };

  constructor() {
    this.burger = document.querySelector(BurgerMenu.SELECTORS.BURGER_BUTTON);
    this.menu = document.querySelector(
      BurgerMenu.SELECTORS.NAVIGATION_CONTAINER
    );

    this.init();
    this.handleResize();
  }

  init() {
    this.burger.addEventListener('click', (e) => {
      e.stopPropagation();

      this.toggleMenu();
    });

    this.menu.addEventListener('click', (e) => {
      const target = e.target.closest(BurgerMenu.SELECTORS.NAVIGATION_ITEM);

      if (target) this.toggleMenu();
    });

    document.addEventListener('click', (e) => {
      const navigation = document.querySelector(
        BurgerMenu.SELECTORS.NAVIGATION_LIST
      );
      const target = e.target;
      const isBurgerMenu = target == this.burger;
      const isMenu = target == navigation || navigation.contains(target);
      const isOpenMenu = this.burger.classList.contains(constants.ACTIVE_CLASS);

      if (!isBurgerMenu && !isMenu && isOpenMenu) this.toggleMenu();
    });
  }

  handleResize() {
    window.addEventListener('resize', () => {
      const isTablet = utils.isTablet();
      const isOpen = this.burger.classList.contains(constants.ACTIVE_CLASS);

      if (!isTablet && isOpen) {
        this.burger.classList.remove(constants.ACTIVE_CLASS);
        this.menu.classList.remove(constants.ACTIVE_CLASS);

        utils.startScroll();
      }
    });
  }

  toggleMenu() {
    const isTablet = utils.isTablet();

    this.burger.classList.toggle(constants.ACTIVE_CLASS);
    this.menu.classList.toggle(constants.ACTIVE_CLASS);

    isTablet && this.burger.classList.contains(constants.ACTIVE_CLASS)
      ? utils.stopScroll()
      : utils.startScroll();
  }
}
