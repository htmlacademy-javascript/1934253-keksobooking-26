const adForm = document.querySelector('.ad-form');
const filtersForm = document.querySelector('.map__filters');

const DEBOUNCE_DELAY = 500;

export const getCapacityRoom = (countRoom) => {
  if (+countRoom === 1) {
    return 'a';
  }

  if (+countRoom > 1 && +countRoom < 5) {
    return '';
  }

  return '';
};

export const getCapacityGuest = (countGuest) => {
  if (+countGuest === 1) {
    return 'я';
  }

  return 'ей';
};

export const isEscapeKey = (evt) => evt.key === 'Escape';

export const setBlockPage = (isBlock = true) => {
  adForm.classList[isBlock ? 'add' : 'remove']('ad-form--disabled');
  adForm.querySelector('.ad-form-header').classList[isBlock ? 'add' : 'remove']('ad-form-header--disabled');
  adForm.querySelectorAll('.ad-form__element').forEach((fieldset) => {
    fieldset.disabled = isBlock;
  });
  filtersForm.classList[isBlock ? 'add' : 'remove']('map__filters--disabled');
  filtersForm.querySelectorAll('.map__filter').forEach((select) => {
    select.disabled = isBlock;
  });
  filtersForm.querySelector('.map__features').disabled = isBlock;
};


export const debounce = (callback, timeoutDelay = DEBOUNCE_DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomPositiveFloat = (a, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
};

export {getRandomPositiveFloat, getRandomPositiveInteger};

