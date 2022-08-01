import { sendData } from './api.js';
import { resetFilter } from './filter.js';
import { MainPinCoordinates, resetMap } from './map.js';
import { openSuccessPopup, openErrorPopup } from './message.js';
const BAD_COUNT_GUESTS_MESSAGE = 'Неверное количество гостей';
import { resetImages } from './photo.js';
const LengthTitle = {
  MIN: 30,
  MAX: 100,
};

const MAX_PRICE = 100000;
const PRICE_STEP = 1000;

const minPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const countGuestsByRoom = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const adForm = document.querySelector('.ad-form');
const title = adForm.querySelector('#title');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const price = adForm.querySelector('#price');
const type = adForm.querySelector('#type');
const guestCount = adForm.querySelector('#capacity');
const roomCount = adForm.querySelector('#room_number');
const slider = adForm.querySelector('#slider');
const addressField = document.querySelector('#address');
const reset = document.querySelector('.ad-form__reset');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

noUiSlider.create(slider, {
  range: {
    min: minPrice.flat,
    max: MAX_PRICE,
  },
  start: 0,
  step: PRICE_STEP,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

slider.noUiSlider.on('update', () => {
  price.value = slider.noUiSlider.get();
});

const validateTitle = (value) => value.length >= LengthTitle.MIN && value.length <= LengthTitle.MAX;

const validateMinPrice = (value) => {
  const currentValue = type[type.selectedIndex].value;
  return minPrice[currentValue] <= value;
};

const getMinPriceMessage = () => {
  const currentValue = type[type.selectedIndex].value;
  return `Минимальная цена ${minPrice[currentValue]}`;
};

const validateRoomCount = () => (countGuestsByRoom[roomCount.value].includes(guestCount.value));

const resetForm = () => {
  adForm.reset();
  slider.noUiSlider.updateOptions({
    range: {
      min: minPrice.flat,
      max: MAX_PRICE,
    },
  });

  addressField.value = `${MainPinCoordinates.LAT} ${MainPinCoordinates.LNG}`;

  slider.noUiSlider.set(minPrice.flat);

  resetImages();
};

const onAdFormSubmit = (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    sendData(() => {
      openSuccessPopup();
      resetMap();
      resetFilter();
      resetForm();
    }, openErrorPopup, new FormData(evt.target));
  }
};

const initValidateForm = () => {
  timeIn.addEventListener('change', () => {
    timeOut.selectedIndex = timeIn.selectedIndex;
  });

  timeOut.addEventListener('change', () => {
    timeIn.selectedIndex = timeOut.selectedIndex;
  });

  type.addEventListener('change', () => {
    const currentValue = type[type.selectedIndex].value;
    price.placeholder = minPrice[currentValue];

    slider.noUiSlider.updateOptions({
      range: {
        min: minPrice[currentValue],
        max: MAX_PRICE,
      },
    });
  });

  price.addEventListener('change', (evt) => {
    slider.noUiSlider.set(evt.target.value);
  });

  reset.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForm();
    resetMap();
    resetFilter();
  });

  pristine.addValidator(title, validateTitle, '');
  pristine.addValidator(price, validateMinPrice, getMinPriceMessage);
  pristine.addValidator(roomCount, validateRoomCount, BAD_COUNT_GUESTS_MESSAGE);

  adForm.addEventListener('submit', onAdFormSubmit);
};

export { initValidateForm, price, minPrice, type, adForm, resetForm };
