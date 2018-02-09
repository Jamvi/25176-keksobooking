'use strict';

var OFFERS_NUMBER = 8;
var AUTHOR_AVATARS = createAvatars(OFFERS_NUMBER);
var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_MIN_PRICE = 1000;
var OFFER_MAX_PRICE = 1000000;
var OFFER_TYPES = {flat: 'Квартира', house: 'Дом', bungalo: 'Бунгало'};
var OFFER_MIN_ROOMS = 1;
var OFFER_MAX_ROOMS = 5;
var OFFER_MIN_GUESTS = 1;
var OFFER_MAX_GUESTS = OFFER_MAX_ROOMS * 2;
var OFFER_CHECKIN_TIME = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var LOCATION_MIN_X = 300;
var LOCATION_MAX_X = 900;
var LOCATION_MIN_Y = 150;
var LOCATION_MAX_Y = 500;
var PIN_CENTER = 25;
var PIN_BOTTOM = 70;
var MAP_ELEMENT = document.querySelector('.map');
var MAP_PINS_ELEMENT = MAP_ELEMENT.querySelector('.map__pins');
var MAP_FILTERS_ELEMENT = MAP_ELEMENT.querySelector('.map__filters-container');
var TEMPLATE = document.querySelector('template').content;
var PIN_TEMPLATE = TEMPLATE.querySelector('.map__pin');
var CARD_TEMPLATE = TEMPLATE.querySelector('article.map__card');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getUniqueElement(array) {
  var uniqueElement = array.splice(getRandomInt(0, array.length - 1), 1);
  return uniqueElement[0];
}

function shuffleArray(array) {
  var newArray = array.slice();
  var j;
  var x;
  var i;

  for (i = newArray.length - 1; i > 0; i--) {

    j = Math.floor(Math.random() * (i + 1));
    x = newArray[i];
    newArray[i] = newArray[j];
    newArray[j] = x;

  }

  return newArray;
}

function getRandomArrayLength(array) {
  var newArray = array.slice();
  return shuffleArray(newArray).slice(0, getRandomInt(1, newArray.length - 1));
}

function createAvatars(count) {
  var links = [];

  for (var i = 1; i <= count; i++) {
    var link = 'img/avatars/user0' + i + '.png';
    links.push(link);
  }

  return links;
}

function createAdvertisements(options) {
  var advertisementsCatalog = [];

  for (var i = 0; i < OFFERS_NUMBER; i++) {
    var locationX = getRandomInt(options.locationMinX, options.locationMaxX);
    var locationY = getRandomInt(options.locationMinY, options.locationMaxY);

    var advertisement = {
      author: {
        avatar: getUniqueElement(options.authorAvatars)
      },
      offer: {
        title: getUniqueElement(options.offerTitles),
        address: locationX + ', ' + locationY,
        price: getRandomInt(options.offerMinPrice, options.offerMaxPrice),
        type: Object.keys(options.offerTypes)[getRandomInt(0, Object.keys(options.offerTypes).length - 1)],
        rooms: getRandomInt(options.offerMinRooms, options.offerMaxRooms),
        guests: getRandomInt(options.offerMinGuests, options.offerMaxGuests),
        checkin: getRandomElement(options.offerCheckInTime),
        checkout: getRandomElement(options.offerCheckOutTime),
        features: getRandomArrayLength(options.offerFeatures),
        description: '',
        photos: shuffleArray(options.offerPhotos)
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
    advertisementsCatalog[i] = advertisement;

  }
  return advertisementsCatalog;
}

function renderPin(pin, template, left, top) {
  var pinElement = template.cloneNode(true);

  pinElement.style.left = (pin.location.x - left) + 'px';
  pinElement.style.top = (pin.location.y - top) + 'px';

  pinElement.querySelector('img').setAttribute('src', pin.author.avatar);

  return pinElement;
}

function renderPins(pinsList, pinsElement, pinTemplate) {
  var fragment = document.createDocumentFragment();

  for (var j = 0; j < pinsList.length; j++) {
    fragment.appendChild(renderPin(pinsList[j], pinTemplate, PIN_CENTER, PIN_BOTTOM));
  }

  pinsElement.appendChild(fragment);
}

function removeChildren(element) {

  while (element.lastChild) {
    element.removeChild(element.lastChild);
  }
}

function renderFeatures(list, element) {
  removeChildren(element);

  for (var i = 0; i < list.length; i++) {
    element.innerHTML += '<li class="feature feature--' + list[i] + '"></li>';
  }
}

function renderPictures(list, element) {
  removeChildren(element);

  for (var i = 0; i < list.length; i++) {
    element.innerHTML += '<li><img src="' + list[i] + '" width="100"></li>';
  }
}

function renderCard(card, cardTemplate) {
  var fragment = document.createDocumentFragment();
  var cardElement = cardTemplate.cloneNode(true);

  var cardAvatar = cardElement.querySelector('.popup__avatar');
  cardAvatar.setAttribute('src', card.author.avatar);

  var cardTitle = cardElement.querySelector('h3');
  cardTitle.textContent = card.offer.title;

  var cardAddress = cardElement.querySelector('small');
  cardAddress.textContent = card.offer.address;

  var cardPrice = cardElement.querySelector('.popup__price');
  cardPrice.textContent = card.offer.price + '\u20BD/ночь';

  var cardType = cardElement.querySelector('h4');
  cardType.textContent = OFFER_TYPES[card.offer.type];

  var cardRoomsGuestsNumber = cardType.nextElementSibling;
  cardRoomsGuestsNumber.textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';

  var cardCheckinCheckout = cardRoomsGuestsNumber.nextElementSibling;
  cardCheckinCheckout.textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

  var cardFeatures = cardElement.querySelector('.popup__features');
  renderFeatures(card.offer.features, cardFeatures);

  var cardDescription = cardFeatures.nextElementSibling;
  cardDescription.textContent = card.offer.description;

  var cardPictures = cardElement.querySelector('.popup__pictures');
  renderPictures(card.offer.photos, cardPictures);

  fragment.appendChild(cardElement);
  MAP_ELEMENT.insertBefore(fragment, MAP_FILTERS_ELEMENT);
}

var mapSection = document.querySelector('.map');
mapSection.classList.remove('map--faded');

var authorAvatars = AUTHOR_AVATARS.slice();
var offerTitles = OFFER_TITLES.slice();

var advertisements = createAdvertisements({
  authorAvatars: authorAvatars,
  offerTitles: offerTitles,
  offerMinPrice: OFFER_MIN_PRICE,
  offerMaxPrice: OFFER_MAX_PRICE,
  offerTypes: OFFER_TYPES,
  offerMinRooms: OFFER_MIN_ROOMS,
  offerMaxRooms: OFFER_MAX_ROOMS,
  offerMinGuests: OFFER_MIN_GUESTS,
  offerMaxGuests: OFFER_MAX_GUESTS,
  offerCheckInTime: OFFER_CHECKIN_TIME,
  offerCheckOutTime: OFFER_CHECKOUT_TIME,
  offerFeatures: OFFER_FEATURES,
  offerPhotos: OFFER_PHOTOS,
  locationMinX: LOCATION_MIN_X,
  locationMaxX: LOCATION_MAX_X,
  locationMinY: LOCATION_MIN_Y,
  locationMaxY: LOCATION_MAX_Y
});

renderPins(advertisements, MAP_PINS_ELEMENT, PIN_TEMPLATE);

renderCard(advertisements[0], CARD_TEMPLATE);
