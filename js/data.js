'use strict';

(function () {
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
      var locationX = window.util.getRandomInt(options.locationMinX, options.locationMaxX);
      var locationY = window.util.getRandomInt(options.locationMinY, options.locationMaxY);

      var advertisement = {
        author: {
          avatar: window.util.getUniqueElement(options.authorAvatars)
        },
        offer: {
          title: window.util.getUniqueElement(options.offerTitles),
          address: locationX + ', ' + locationY,
          price: window.util.getRandomInt(options.offerMinPrice, options.offerMaxPrice),
          type: Object.keys(options.offerTypes)[window.util.getRandomInt(0, Object.keys(options.offerTypes).length - 1)],
          rooms: window.util.getRandomInt(options.offerMinRooms, options.offerMaxRooms),
          guests: window.util.getRandomInt(options.offerMinGuests, options.offerMaxGuests),
          checkin: window.util.getRandomElement(options.offerCheckInTime),
          checkout: window.util.getRandomElement(options.offerCheckOutTime),
          features: window.util.getRandomArrayLength(options.offerFeatures),
          description: '',
          photos: window.util.shuffleArray(options.offerPhotos)
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

  window.data = {
    advertisements: advertisements
  };
})();
