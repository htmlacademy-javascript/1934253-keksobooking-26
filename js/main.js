import { setBlockPage } from './utils.js';
import { mapMarkersInit, mapLoad } from './map.js';
import { getData } from './api.js';
import { openErrorPopup } from './message.js';
import { initValidateForm } from './validate-form.js';
import { initFilter } from './filter.js';
import './avatar.js';

const adForm = document.querySelector('.ad-form');
const filtersForm = document.querySelector('.map__filters');

setBlockPage(true);
mapLoad();

getData((data) => {
  mapMarkersInit(data.slice());
  initFilter(data.slice());
}, openErrorPopup);
initValidateForm();
export { adForm, filtersForm };
