'use strict';

(function () {
  var OFFER_TYPES = {flat: 'Квартира', house: 'Дом', bungalo: 'Бунгало'};
  var MAP_ELEMENT = document.querySelector('.map');
  var MAP_FILTERS_ELEMENT = MAP_ELEMENT.querySelector('.map__filters-container');

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
    checkCardContent(card.offer.features, cardFeatures, 'features');

    var cardDescription = cardElement.querySelector('.popup__description');
    checkCardContent(card.offer.description, cardDescription, 'text');

    var cardPictures = cardElement.querySelector('.popup__pictures');
    checkCardContent(card.offer.photos, cardPictures, 'photos');

    MAP_ELEMENT.insertBefore(cardElement, MAP_FILTERS_ELEMENT);

    var popupCloseBtn = document.querySelector('.popup__close');
    popupCloseBtn.addEventListener('click', function () {
      clearCard();
    });

    document.addEventListener('keydown', onCardEscPress);
  }

  function renderFeatures(list, element) {
    window.util.removeChildren(element, null);

    for (var i = 0; i < list.length; i++) {
      element.innerHTML += '<li class="feature feature--' + list[i] + '"></li>';
    }
  }

  function renderPictures(list, element) {
    window.util.removeChildren(element);

    for (var i = 0; i < list.length; i++) {
      element.innerHTML += '<li><img src="' + list[i] + '" width="60"></li>';
    }
  }

  function checkCardContent(content, element, type) {
    if (type === 'text') {
      if (content) {
        element.textContent = content;
      } else {
        element.remove();
      }
    } else if (type === 'features') {
      if (content.length > 0) {
        renderFeatures(content, element);
      } else {
        element.remove();
      }
    } else {
      if (content.length > 0) {
        renderPictures(content, element);
      } else {
        element.remove();
      }
    }
  }

  function clearCard() {
    var currentCard = document.querySelector('article.map__card');
    if (currentCard) {
      currentCard.remove();
    }
  }

  function closeCard() {
    clearCard();
    document.removeEventListener('keydown', onCardEscPress);
  }

  function onCardEscPress(evt) {
    window.util.isEscEvent(evt, closeCard);
  }

  window.card = {
    renderCard: renderCard,
    clearCard: clearCard
  };
})();
