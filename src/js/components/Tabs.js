import * as constants from '../constants.js';

export default class Tabs {
  static SELECTORS = {
    TABS_CONTAINER: '.tabs',
    TAB_BUTTON: '.tab',
    ALL: 'all',
    WORK: 'for work',
    HEALTH: 'for health',
    HARMONY: 'for harmony',
  };

  constructor() {
    this.tabs = null;
    this.activeTab = Tabs.SELECTORS.ALL;

    this.init();
  }

  init() {
    this.tabs = document.querySelector(Tabs.SELECTORS.TABS_CONTAINER);

    if (!this.tabs) return;

    this.tabs.addEventListener('click', (e) => this.handleClick(e));

    const defaultTab = document.querySelector(
      `[data-type="${Tabs.SELECTORS.ALL}"]`
    );
    defaultTab?.classList.add(constants.ACTIVE_CLASS);
  }

  handleClick(event) {
    const tab = event.target.closest(Tabs.SELECTORS.TAB_BUTTON);

    if (tab && !tab.classList.contains(constants.ACTIVE_CLASS)) {
      this.updateActiveTab(tab);

      this.dispatchChange();
    }
  }

  updateActiveTab(tab) {
    document
      .querySelectorAll(Tabs.SELECTORS.TAB_BUTTON)
      .forEach((tab) => tab.classList.remove(constants.ACTIVE_CLASS));

    tab.classList.add(constants.ACTIVE_CLASS);

    this.activeTab = tab.dataset.type;
  }

  dispatchChange() {
    const changeEvent = new CustomEvent('change', { detail: this.activeTab });

    this.tabs.dispatchEvent(changeEvent);
  }
}
