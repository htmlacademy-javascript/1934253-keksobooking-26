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

const renderCapacity = (rooms,guests) => {
  if (rooms===1&&guests===1){return `${rooms} комната для ${guests} гостя`;}
  else if (rooms===1){return `${rooms} комната для ${guests} гостей`;}
  else if (rooms<5&&guests===1){return `${rooms} комнаты для ${guests} гостя`;}
  else if (rooms<5){return `${rooms} комнаты для ${guests} гостей`;}
  else if (rooms>=5&&guests===1){return `${rooms} комнат для ${guests} гостя`;}
  else if (rooms>=5){return `${rooms} комнат для ${guests} гостей`;}
};

const getCardTemplate = ({offer, author}) => `<article class="popup">
    ${(offer.avatar) ? `<img src="${author.avatar}" class="popup__avatar" width="70" height="70" alt="Аватар пользователя">` : ''}
    ${(offer.title) ? `<h3 class="popup__title">${offer.title}</h3>` : ''}
    ${(offer.address) ? `<p class="popup__text popup__text--address">${offer.address}</p>` : ''}
    ${(offer.price) ? `<p class="popup__text popup__text--price">${offer.price}${' ₽/ночь'}</p>` : ''}
    ${(offer.type) ? `<h4 class="popup__type">${typeHouse[offer.type]}</h4>` : ''}
    ${(offer.rooms&&offer.guests) ? `<p class="popup__text popup__text--capacity">${renderCapacity(offer.rooms,offer.guests)}</p>` : ''}
    ${(offer.checkin&&offer.checkout) ? `<p class="popup__text popup__text--time">Заезд после ${offer.checkin}, выезд до ${offer.checkout}</p>`: ''}
    ${offer.features.length > 0 ? getFeaturesTemplate(offer.features) : ''}
    <p class="popup__description">${offer.description}</p>
    <div class="popup__photos">
      <img src="${offer.photos}" class="popup__photo" width="45" height="40" alt="Фотография жилья">
    </div>
  </article>`;

export { getCardTemplate };
