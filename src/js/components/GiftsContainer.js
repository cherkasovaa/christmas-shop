import * as utils from '../utils/utils.js';
import { gifts } from '../data/gifts.js';
import Card from './Card.js';
import Tabs from './Tabs.js';
import Modal from './Modal.js';

export default class GiftsContainer {
  static SELECTORS = {
    HOME_PAGE_CONTAINER: '.best-gifts__gifts-container',
    GIFTS_PAGE_CONTAINER: '.gifts',
  };
  static HOME_PAGE_CARDS_LENGTH = 4;

  constructor() {
    this.homeContainer = null;
    this.giftsContainer = null;

    this.init();
  }

  init() {
    this.homeContainer = document.querySelector(
      GiftsContainer.SELECTORS.HOME_PAGE_CONTAINER
    );
    this.giftsContainer = document.querySelector(
      GiftsContainer.SELECTORS.GIFTS_PAGE_CONTAINER
    );

    this.renderInitialCards();
  }

  renderInitialCards() {
    if (this.homeContainer) {
      this.renderGiftCardsArray(
        this.homeContainer,
        gifts,
        GiftsContainer.HOME_PAGE_CARDS_LENGTH
      );
    }

    if (this.giftsContainer) {
      this.renderGiftCardsArray(this.giftsContainer, gifts);
    }
  }

  renderGiftCardsArray(parent, data, count = data.length) {
    const giftsToRender = utils.shuffleArray(data).slice(0, count);

    parent.replaceChildren();

    const modal = new Modal();

    giftsToRender.forEach((gift) => {
      const card = new Card(gift, modal);
      parent.append(card.render());
    });
  }

  handleChange(e) {
    if (!this.giftsContainer) return;

    const category = e.detail;

    const filteredGifts =
      category === Tabs.SELECTORS.ALL
        ? gifts
        : gifts.filter((gift) => gift.category.toLowerCase() === category);

    this.renderGiftCardsArray(this.giftsContainer, filteredGifts);
  }
}
