import '../scss/main.scss';
import BurgerMenu from './components/BurgerMenu.js';
import ButtonToTop from './components/ButtonToTop.js';
import GiftsContainer from './components/GiftsContainer.js';
import Slider from './components/Slider.js';
import Tabs from './components/Tabs.js';
import Timer from './components/Timer.js';

document.addEventListener('DOMContentLoaded', () => {
  new BurgerMenu();

  new Slider();

  new Timer();

  new ButtonToTop();

  const tabs = new Tabs();

  const container = new GiftsContainer();
  if (tabs.tabs)
    tabs.tabs.addEventListener('change', (e) => container.handleChange(e));
});
