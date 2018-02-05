'use strict';

var OFFERS_NUMBER = 8;
var AUTHOR_AVATARS = createAvatars(OFFERS_NUMBER);
var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_MIN_PRICE = 1000;
var OFFER_MAX_PRICE = 1000000;
var OFFER_TYPES = ['flat', 'house', 'bungalo'];
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
  var j;
  var x;
  var i;

  for (i = array.length - 1; i > 0; i--) {

    j = Math.floor(Math.random() * (i + 1));
    x = array[i];
    array[i] = array[j];
    array[j] = x;

  }
}

function createAvatars(count) {
  var links = [];

  for (var i = 1; i <= count; i++) {
    var link = 'img/avatars/user0' + i + '.png';
    links.push(link);
  }

  return links;
}

function createAdvertisement(options) {

  var locationX = getRandomInt(options.locationMinX, options.locationMaxX);
  var locationY = getRandomInt(options.locationMinY, options.locationMaxY);

  var advertisement = {
    'author': {
      'avatar': getUniqueElement(options.authorAvatars)
    },
    'offer': {
      'title': getUniqueElement(options.offerTitles),
      'address': locationX + ', ' + locationY,
      'price': getRandomInt(options.offerMinPrice, options.offerMaxPrice),
      'type': getRandomElement(options.offerTypes),
      'rooms': getRandomInt(options.offerMinRooms, options.offerMaxRooms),
      'guests': getRandomInt(options.offerMinGuests, options.offerMaxGuests),
      'checkin': getRandomElement(options.offerCheckInTime),
      'checkout': getRandomElement(options.offerCheckOutTime),
      'features': options.offerFeatures.slice(0, getRandomInt(0, options.offerFeatures.length)),
      'description': '',
      'photos': shuffleArray(options.offerPhotos)
    },
    'location': {
      'x': locationX,
      'y': locationY
    }
  };

  return advertisement;
}

var mapSection = document.querySelector('.map');
mapSection.classList.remove('map--faded');

var advertisements = createAdvertisement(OFFERS_NUMBER, {
  authorAvatars: AUTHOR_AVATARS,
  offerTitles: OFFER_TITLES,
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
