import * as constants from '../constants.js';
import * as utils from '../utils/utils.js';

export default class Card {
  static SELECTORS = {
    BASE_CLASS: constants.GIFT_CARD,
    INFO: `${constants.GIFT_CARD}__info`,
    PURPOSE: `${constants.GIFT_CARD}__purpose`,
    TITLE: `${constants.GIFT_CARD}__title`,
    IMAGE_CONTAINER: `${constants.GIFT_CARD}__image-container`,
    IMAGE: `${constants.GIFT_CARD}__image`,
  };

  constructor(data, modal) {
    this.data = data;
    this.title = this.data.name;
    this.type = this.data.category;
    this.modal = modal;
  }

  render() {
    return this.create();
  }

  create() {
    const purpose = this.type.toLowerCase();

    const card = utils.createElementWithClasses(
      'div',
      Card.SELECTORS.BASE_CLASS
    );

    const info = this.createInfo(this.type, this.title, purpose);
    const image = this.createImageContainer(this.title, purpose);

    card.append(image, info);

    card.addEventListener('click', () => this.openModal());

    return card;
  }

  openModal() {
    this.modal.open(this.data);
  }

  createInfo(type, title, purpose) {
    const info = utils.createElementWithClasses('div', Card.SELECTORS.INFO);

    const p = utils.createElementWithClasses('p', Card.SELECTORS.PURPOSE);
    p.textContent = `${type}`;
    p.setAttribute('data-type', purpose);

    const header = utils.createElementWithClasses('h3', Card.SELECTORS.TITLE);
    header.textContent = title;

    info.append(p, header);

    return info;
  }

  createImageContainer(title, purpose) {
    const imageContainer = utils.createElementWithClasses(
      'div',
      Card.SELECTORS.IMAGE_CONTAINER
    );

    const image = utils.createElementWithClasses('img', Card.SELECTORS.IMAGE);
    image.setAttribute('alt', title);
    image.setAttribute(
      'src',
      `./assets/images/gift-${utils.convertTypeForImageName(purpose)}.png`
    );

    imageContainer.append(image);

    return imageContainer;
  }
}
