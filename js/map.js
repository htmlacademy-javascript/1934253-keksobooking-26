
import { getData } from './api.js';
import { getCardTemplate } from './card.js';
import { MAX_COUNT_MARKER } from './const.js';
import { setBlockForm, setBlockFilters } from './utils.js';
import { initFilter } from './filter.js';
import { openErrorPopup } from './message.js';

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

const mapMarkersInit = (bookings) => {
  defaultBookings = bookings;
  bookings.slice(0, MAX_COUNT_MARKER).forEach((booking) => {
    createMarker(booking);
  });
};

const mainPinMarkerInit = () => {
  mainPinMarker.on('moveend', (evt) => {
    const {lat, lng} = evt.target.getLatLng();
    addressField.value = `${lat.toFixed(5)} ${lng.toFixed(5)}`;
  });
};

const mapLoad = () => {
  map.on('load', () => {
    mainPinMarkerInit();
    setBlockForm(false);
    addressField.value = `${MainPinCoordinates.LAT} ${MainPinCoordinates.LNG}`;

    getData((data) => {
      mapMarkersInit(data.slice());
      setBlockFilters(false);
      initFilter(data.slice());
    }, openErrorPopup);
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

const renderMarkers = (bookings) => {
  markerGroup.clearLayers();
  bookings.forEach((booking) => {
    createMarker(booking);
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

  addressField.value = `${MainPinCoordinates.LAT} ${MainPinCoordinates.LNG}`;
  renderMarkers(bookings);
};

export { resetMap, MainPinCoordinates, mapLoad, renderMarkers };
