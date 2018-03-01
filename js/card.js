'use strict';

(function () {
  var OFFER_TYPES = {flat: 'Квартира', house: 'Дом', bungalo: 'Бунгало'};
  var MAP_ELEMENT = document.querySelector('.map');
  var MAP_FILTERS_ELEMENT = MAP_ELEMENT.querySelector('.map__filters-container');
  function renderFeatures(list, element) {
    window.util.removeChildren(element, null);

    for (var i = 0; i < list.length; i++) {
      element.innerHTML += '<li class="feature feature--' + list[i] + '"></li>';
    }
  }

  function renderPictures(list, element) {
    window.util.removeChildren(element);

    for (var i = 0; i < list.length; i++) {
      element.innerHTML += '<li><img src="' + list[i] + '" width="100"></li>';
    }
  }

  function renderCard(card, cardTemplate) {

    clearCard();

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

    MAP_ELEMENT.insertBefore(cardElement, MAP_FILTERS_ELEMENT);

  }

  function clearCard() {
    var currentCard = document.querySelector('article.map__card');
    if (currentCard) {
      currentCard.remove();
    }
  }

  window.card = {
    renderCard: renderCard,
    clearCard: clearCard
  };
})();
