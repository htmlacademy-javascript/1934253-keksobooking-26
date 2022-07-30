import { getCapacityRoom, getCapacityGuest } from './utils.js';

const typeHouse = {
  flat:'Квартира',
  bungalow:'Бунгало',
  house:'Дом',
  palace:'Дворец',
  hotel:'Отель',
};

const getFeaturesTemplate = (features) => `<ul class="popup__features">
    ${features.map((feature) => `<li class="popup__feature popup__feature--${feature}"></li>`).join('')}
  </ul>`;

const getPhotoTemplate = (photos) => `<div class="popup__photos">
  ${photos.map((photo) => `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`).join('')}
  </div>`;
const renderCapacity = (rooms, guests) => `${rooms} комнат${getCapacityRoom(rooms)} для ${guests} гост${getCapacityGuest(guests)}`;

const getCardTemplate = ({offer, author}) => `<article class="popup">
    <img src="${author.avatar}" class="popup__avatar" width="70" height="70" alt="Аватар пользователя">
    <h3 class="popup__title">${offer.title}</h3>
    <p class="popup__text popup__text--address">${offer.address}</p>
    <p class="popup__text popup__text--price">${offer.price}${' ₽/ночь'}</p>
    <h4 class="popup__type">${typeHouse[offer.type]}</h4>
    <p class="popup__text popup__text--capacity">${renderCapacity(offer.rooms,offer.guests)}</p>
    <p class="popup__text popup__text--time">Заезд после ${offer.checkin}, выезд до ${offer.checkout}</p>
    ${offer.features ? getFeaturesTemplate(offer.features) : ''}
    ${offer.description ? `<p class="popup__description">${offer.description}</p>` : ''}
    ${offer.photos ? getPhotoTemplate(offer.photos) : ''}
  </article>`;

export { getCardTemplate };
