
import { getCardTemplate } from './card.js';
import { MAX_COUNT_MARKER } from './const.js';
import { setBlockPage } from './utils.js';

const MainPinCoordinates = {
  LAT: 35.68399,
  LNG: 139.75378,
};

const pinIcon = L.icon({
  iconUrl: '/img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPinIcon = L.icon({
  iconUrl: '/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const map = L.map('map-canvas');
const addressField = document.querySelector('#address');
let defaultBookings = [];

const mainPinMarker = L.marker(
  {
    lat: MainPinCoordinates.LAT,
    lng: MainPinCoordinates.LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon
  },
);

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (booking) => {
  const {lat, lng} = booking.location;
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon: pinIcon,
    },
  );

  marker
    .addTo(markerGroup)
    .bindPopup(getCardTemplate(booking));
};
const mapLoad = () => {
  map.on('load', () => {
    setBlockPage(false);
    addressField.value = `${MainPinCoordinates.LAT} ${MainPinCoordinates.LNG}`;
  });
  map.setView({
    lat: MainPinCoordinates.LAT,
    lng: MainPinCoordinates.LNG,
  }, 13);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainPinMarker.addTo(map);

};

const mapMarkersInit = (bookings) => {
  defaultBookings = bookings;
  bookings.slice(0, MAX_COUNT_MARKER).forEach((booking) => {
    createMarker(booking);
  });

  mainPinMarker.on('moveend', (evt) => {
    const {lat, lng} = evt.target.getLatLng();
    addressField.value = `${lat.toFixed(5)} ${lng.toFixed(5)}`;
  });
};

const resetMap = (bookings = defaultBookings.slice(0, MAX_COUNT_MARKER)) => {
  mainPinMarker.setLatLng({
    lat: MainPinCoordinates.LAT,
    lng: MainPinCoordinates.LNG,
  });

  map.setView({
    lat: MainPinCoordinates.LAT,
    lng: MainPinCoordinates.LNG,
  }, 13);

  markerGroup.clearLayers();

  addressField.value = `${MainPinCoordinates.LAT} ${MainPinCoordinates.LNG}`;

  bookings.forEach((booking) => {
    createMarker(booking);
  });
};

export { mapMarkersInit, resetMap, MainPinCoordinates, mapLoad };
