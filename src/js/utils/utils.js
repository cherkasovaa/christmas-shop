import * as constants from '../constants.js';

export const stopScroll = () => {
  document.body.style.overflow = constants.HIDDEN;
};

export const startScroll = () => {
  document.body.style.overflow = constants.VISIBLE;
};

export const isTablet = () => window.innerWidth <= constants.TABLET_BREAKPOINT;

export const createRandomIdxArray = (count, length) => {
  const uniqueIndexes = new Set();

  while (uniqueIndexes.size < count) {
    uniqueIndexes.add(Math.floor(Math.random() * length));
  }

  return [...uniqueIndexes];
};

export const createElementWithClasses = (tag, className) => {
  const element = document.createElement(tag);

  if (Array.isArray(className)) {
    element.classList.add(...className);
  } else if (typeof className === 'string') {
    element.className = className;
  }

  return element;
};

export const setDataToModuleElement = (selector, data) => {
  const element = document.querySelector(selector);
  element.textContent = `${data}`;

  return element;
};

export const shuffleArray = (arr) => {
  const array = [...arr];

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

export const convertTypeForImageName = (type) => type.replace(/ /g, '-');
