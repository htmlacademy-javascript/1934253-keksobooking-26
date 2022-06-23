const photoArray = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const typeArray = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const timeArray = ['12:00', '13:00', '14:00'];

const featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

// количество созданных объектов
const repeat = 10;

const lat = getRandomPositiveFloat(35.65,35.7, 5);

const lng = getRandomPositiveFloat(139.7,139.8, 5);

const coordinate = {lat,lng};

// Получение случайного целочисленного рандом числа
function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

getRandomPositiveInteger (0,10);

// Получение случайного рандом числа с плавающей точкой

function getRandomPositiveFloat (a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}

// Получить случайный элемент массива
const getRandomElementArray = function (array) {
  return array[getRandomPositiveInteger (0, array.length-1)];
};

// добавление 0 перед номером фото
function additionalZero () {
  return String(getRandomPositiveInteger(0,10)).padStart(2, '0');
}
// получение массива случайной длинны из существующего массива
function getArrayRanadomlength (array) {
  return array.slice(0,getRandomPositiveFloat(1,array.length));
}

function getBooking () {
  return {
    author: {
      avatar:`img/avatars/user${additionalZero ()}.png`,
    },
    offer: {
      title: 'Заголовок',
      addres: `${lat}, ${lng}`,
      price: getRandomPositiveInteger (0,10),
      type: getRandomElementArray(typeArray),
      rooms: getRandomPositiveInteger (0,10),
      guests: getRandomPositiveInteger (0,10),
      checkin: getRandomElementArray(timeArray),
      checkout: getRandomElementArray(timeArray),
      features: getArrayRanadomlength(featuresArray),
      description: 'Придумать описание',
      photos: getArrayRanadomlength(photoArray),
    },
    location: coordinate,
  };
}

const createObject = function (arrayRepeat) {
  return Array.from({length: arrayRepeat}, getBooking);
};

createObject (repeat);

