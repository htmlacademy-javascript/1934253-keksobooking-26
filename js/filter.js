import { MAX_COUNT_MARKER } from './const.js';
import { renderMarkers } from './map.js';
import { debounce } from './utils.js';

const filtersForm = document.querySelector('.map__filters');
const typeSelect = filtersForm.querySelector('select[name="housing-type"]');
const priceSelect = filtersForm.querySelector('select[name="housing-price"]');
const roomsSelect = filtersForm.querySelector('select[name="housing-rooms"]');
const guestsSelect = filtersForm.querySelector('select[name="housing-guests"]');
const featuresFieldset = filtersForm.querySelector('#housing-features');

const FilterType = {
  TYPE: 'type',
  PRICE: 'price',
  ROOMS: 'room',
  GUESTS: 'guest',
  FEATURES: 'features',
};

const TypeBooking = {
  DEFAULT: 'any',
  BUNGALOW:'bungalow',
  FLAT: 'flat',
  HOTEL: 'hotel',
  HOUSE: 'house',
  PALACE: 'palace'
};

const PriceBooking = {
  DEFAULT: 'any',
  MIDDLE: 'middle',
  LOW: 'low',
  HIGH: 'high'
};

const PriceBookingValue = {
  LOW: 10000,
  MIDDLE: {
    low: 10000,
    high: 50000,
  },
  HIGH: 50000,
};

const RoomBookings = {
  ANY: 'any',
  ONE: '1',
  TWO: '2',
  THREE: '3',
};

const RoomBookingsValue = {
  one: 1,
  two: 2,
  three: 3,
};

const GuestBookings = {
  ANY: 'any',
  ONE: '1',
  TWO: '2',
  NOT: '0',
};

const GuestBookingsValue = {
  any: 0,
  one: 1,
  two: 2,
  not: 0,
};

let defaultBookings = [];

const getFilteredPointsByType = (bookings, type) => {
  if (type === TypeBooking.DEFAULT) {
    return defaultBookings.slice();
  }

  const filteredBookings = bookings.filter(({offer}) => offer.type === type);

  return filteredBookings;
};

const getFilteredPointsByPrice = (bookings, price) => {
  let filteredBookings = bookings.slice();

  switch (price) {
    case PriceBooking.DEFAULT:
      filteredBookings = filteredBookings.slice();
      break;
    case PriceBooking.MIDDLE:
      filteredBookings = filteredBookings.filter(({offer}) => offer.price >= PriceBookingValue.MIDDLE.low && offer.price <= PriceBookingValue.MIDDLE.high);
      break;
    case PriceBooking.LOW:
      filteredBookings = filteredBookings.filter(({offer}) => offer.price <= PriceBookingValue.LOW);
      break;
    case PriceBooking.HIGH:
      filteredBookings = filteredBookings.filter(({offer}) => offer.price >= PriceBookingValue.HIGH);
      break;
  }

  return filteredBookings;
};

const getFilteredPointsByCountRoom = (bookings, countRoom) => {
  let filteredBookings = bookings.slice();

  switch (countRoom) {
    case RoomBookings.ANY:
      filteredBookings = filteredBookings.slice();
      break;
    case RoomBookings.ONE:
      filteredBookings = filteredBookings.filter(({offer}) => offer.rooms === RoomBookingsValue.one);
      break;
    case RoomBookings.TWO:
      filteredBookings = filteredBookings.filter(({offer}) => offer.rooms === RoomBookingsValue.two);
      break;
    case RoomBookings.THREE:
      filteredBookings = filteredBookings.filter(({offer}) => offer.rooms === RoomBookingsValue.three);
      break;
  }

  return filteredBookings;
};

const getFilteredPointsByCountGuest = (bookings, countGuest) => {
  let filteredBookings = bookings.slice();

  switch (countGuest) {
    case GuestBookings.ANY:
      filteredBookings = filteredBookings.slice();
      break;
    case GuestBookings.ONE:
      filteredBookings = filteredBookings.filter(({offer}) => offer.guests === GuestBookingsValue.one);
      break;
    case GuestBookings.TWO:
      filteredBookings = filteredBookings.filter(({offer}) => offer.guests === GuestBookingsValue.two);
      break;
    case GuestBookings.NOT:
      filteredBookings = filteredBookings.filter(({offer}) => offer.guests === GuestBookingsValue.not);
      break;
  }

  return filteredBookings;
};

const getFilteredPointsByFeatures = (bookings, checkedFeatures) => {
  const filteredPoints = bookings.filter(({offer}) => {
    if (!offer.features) {
      return false;
    }

    const pointFeatures = offer.features;

    const difference = checkedFeatures.filter((feature) => !pointFeatures.includes(feature));


    if (difference.length === 0) {
      return true;
    }

    return false;
  });

  return filteredPoints;
};

const getFilteredPoints = (filter) => {
  let filteredBookings = defaultBookings.slice();

  Object.entries(filter).forEach(([type, value])=> {
    if (type === FilterType.TYPE) {
      filteredBookings = getFilteredPointsByType(filteredBookings, value);
    }
    if (type === FilterType.PRICE) {
      filteredBookings = getFilteredPointsByPrice(filteredBookings, value);
    }
    if (type === FilterType.ROOMS) {
      filteredBookings = getFilteredPointsByCountRoom(filteredBookings, value);
    }
    if (type === FilterType.GUESTS) {
      filteredBookings = getFilteredPointsByCountGuest(filteredBookings, value);
    }
    if (type === FilterType.FEATURES) {
      filteredBookings = getFilteredPointsByFeatures(filteredBookings, value);
    }
  });


  return filteredBookings.slice(0, MAX_COUNT_MARKER);
};

const onFilterFormChange = () => {
  const activeCheckboxElements = featuresFieldset.querySelectorAll('input:checked');
  const featuresValues = Array.from(activeCheckboxElements).map((element) => element.value);

  const filter = {
    type: typeSelect.value,
    price: priceSelect.value,
    room: roomsSelect.value,
    guest: guestsSelect.value,
    features: featuresValues,
  };

  renderMarkers(getFilteredPoints(filter));
};

export const resetFilter = () => filtersForm.reset();

export const initFilter = (data) => {
  defaultBookings = data;

  filtersForm.addEventListener('change', debounce(onFilterFormChange));
};
