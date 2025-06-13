import * as constants from '../constants.js';
import * as utils from '../utils/utils.js';

export default class Modal {
  static SELECTORS = {
    OVERLAY: '.modal-overlay',
    MODAL: '.modal',
    CLOSE_BUTTON: '.modal__close-button',
    CATEGORY: '.modal__purpose',
    TITLE: '.modal__title',
    DESCRIPTION: '.modal__description',
    IMAGE: '.modal__image',
    POWER_CONTAINER: '.superpowers__container',
    POWER_ROW: 'superpowers__row',
  };

  constructor() {
    this.body = null;
    this.closeButton = null;
    this.modal = null;

    this.init();
  }

  init() {
    this.render();

    this.body = document.querySelector(Modal.SELECTORS.OVERLAY);
    this.closeButton = document.querySelector(Modal.SELECTORS.CLOSE_BUTTON);
    this.modal = document.querySelector(Modal.SELECTORS.MODAL);

    this.closeButton.addEventListener('click', (e) => this.close(e));
    this.body.addEventListener('click', (e) => this.close(e));
  }

  render() {
    document.body.insertAdjacentHTML('afterbegin', this.create());
  }

  close(e) {
    if (
      !this.modal.contains(e.target) ||
      e.target.closest(Modal.SELECTORS.CLOSE_BUTTON)
    ) {
      this.body.classList.remove(constants.ACTIVE_CLASS);
      utils.startScroll();
    }
  }

  open(data) {
    this.setData(data);

    this.body.classList.add(constants.ACTIVE_CLASS);

    utils.stopScroll();
  }

  setData(data) {
    this.setDataText(data);
    this.setDataImage(data);
    this.setDataPowers(data.superpowers);
  }

  setDataText(data) {
    const { category, name, description } = data;

    const type = utils.setDataToModuleElement(
      Modal.SELECTORS.CATEGORY,
      category
    );
    type.setAttribute('data-type', category.toLowerCase());

    utils.setDataToModuleElement(Modal.SELECTORS.TITLE, name);

    utils.setDataToModuleElement(Modal.SELECTORS.DESCRIPTION, description);
  }

  setDataImage(data) {
    const image = document.querySelector(Modal.SELECTORS.IMAGE);
    image.setAttribute('alt', `Gift "${data.name}"`);
    image.setAttribute(
      'src',
      `./assets/images/gift-${utils.convertTypeForImageName(data.category.toLowerCase())}.png`
    );
  }

  setDataPowers(data) {
    const container = document.querySelector(Modal.SELECTORS.POWER_CONTAINER);
    container.innerHTML = '';

    const fragment = new DocumentFragment();

    for (let key in data) {
      const row = utils.createElementWithClasses(
        'div',
        Modal.SELECTORS.POWER_ROW
      );
      const name = utils.createElementWithClasses('p', 'superpowers__power');
      name.textContent = key.slice(0, 1).toUpperCase() + key.slice(1);

      const power = utils.createElementWithClasses('p', 'superpowers__damage');
      power.textContent = data[key];

      const snowflakesContainer = utils.createElementWithClasses(
        'div',
        'superpowers__damage-range-container'
      );

      const defaultRank = 5;
      const rank = Math.round(data[key].slice(1) / 100);

      for (let i = 0; i <= defaultRank; i++) {
        const image = utils.createElementWithClasses(
          'img',
          'superpowers__snowflake-range'
        );
        image.setAttribute('src', './assets/icons/snowflake.png');
        image.setAttribute('alt', 'snowflake');

        if (i > rank) image.classList.add(constants.INACTIVE_CLASS);

        snowflakesContainer.append(image);
      }

      row.append(name, power, snowflakesContainer);

      fragment.append(row);
    }

    container.append(fragment);
  }

  create() {
    const node = `
    <div class="modal-overlay">
      <div class="modal">

        <button class="modal__close-button">
          <span></span>
          <span></span>
        </button>

        <figure class="modal__image-container">
          <img src="./assets/images/gift-for-work.png" alt="Gift" class="modal__image">
        </figure>

        <div class="modal__text-content">
          <div class="modal__info">
            <p class="modal__purpose"></p>
            <h3 class="modal__title"></h3>
            <p class="modal__description"></p>

          </div>

          <div class="modal__superpowers superpowers">
            <h4 class="superpowers__title">Adds superpowers to:</h4>

            <div class="superpowers__container"></div>
          </div>
        </div>

      </div>
    </div>`;

    return node;
  }
}
