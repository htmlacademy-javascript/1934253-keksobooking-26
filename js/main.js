import { getBookings } from './mock.js';
import { getCardTemplate } from './card.js';
import { getRandomPositiveInteger } from './utils.js';

const bookings = getBookings();

const map = document.querySelector('#map-canvas');

map.insertAdjacentHTML('afterbegin', getCardTemplate(bookings[getRandomPositiveInteger(0, bookings.length)]));
