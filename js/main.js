const MAX_COUNT = 10;

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const TITLES = ['Дорого богато', 'Дешево сердито', 'Ниже среднего'];
const DESCRIPTIONS = ['Дом на опушке', 'Дом на полянке', 'Дом на берегу', 'Комната под лестницей'];

const LocationLat = {
  MIN: 35.65000,
  MAX: 35.70000,
};
const LocationLng = {
  MIN: 139.70000,
  MAX: 139.80000,
};
const Price = {
  MIN: 100,
  MAX: 1000,
};
const MAX_COUNT_ROOMS = 5;
const MAX_GUEST_COUNT = 10;

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

const getBookingCard = (id) => {
  const time = TIMES[getRandomPositiveInteger(0, TIMES.length-1)];
  const location = {
    lat: getRandomPositiveFloat(LocationLat.MIN, LocationLng.MAX,5),
    lng: getRandomPositiveFloat(LocationLng.MIN, LocationLng.MAX,5),
  };

  return {
    author: {
      avatar: `img/avatars/user${id < 10 ? '0' : ''}${id}.png`
    },
    offer: {
      title: TITLES[getRandomPositiveInteger(0, TITLES.length-1)],
      addres: `${location.lat}, ${location.lng}`,
      price: getRandomPositiveInteger(Price.MIN, Price.MAX),
      type: TYPES[getRandomPositiveInteger(0, TYPES.length-1)],
      rooms: getRandomPositiveInteger(1, MAX_COUNT_ROOMS),
      guests: getRandomPositiveInteger(1, MAX_GUEST_COUNT),
      checkin: time,
      checkout: time,
      features: FEATURES.slice(0,getRandomPositiveInteger(0, FEATURES.length-1)),
      description: DESCRIPTIONS[getRandomPositiveInteger(0, DESCRIPTIONS.length-1)],
      photos: PHOTOS[getRandomPositiveInteger(0, PHOTOS.length-1)],
    },
    location,
  };
};

const getBooking = () => new Array(MAX_COUNT).fill('').map((_, index) => getBookingCard(index + 1));
getBooking();

