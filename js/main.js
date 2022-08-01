import { setBlockForm, setBlockFilters } from './utils.js';
import {  mapLoad } from './map.js';
import { initValidateForm } from './validate-form.js';

import {previewPhotoLoader} from './photo.js';

const adForm = document.querySelector('.ad-form');
const filtersForm = document.querySelector('.map__filters');

setBlockFilters(true);
setBlockForm(true);

mapLoad();

initValidateForm();
previewPhotoLoader();
export { adForm, filtersForm };
