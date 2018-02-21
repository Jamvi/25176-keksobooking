'use strict';

(function () {
  var TEMPLATE = document.querySelector('template').content;
  var CARD_TEMPLATE = TEMPLATE.querySelector('article.map__card');
  function renderPin(pin, template, left, top) {
    var pinElement = template.cloneNode(true);

    pinElement.style.left = (pin.location.x - left) + 'px';
    pinElement.style.top = (pin.location.y - top) + 'px';

    pinElement.querySelector('img').setAttribute('src', pin.author.avatar);

    pinElement.addEventListener('click', function () {
      window.card.renderCard(pin, CARD_TEMPLATE);
    });

    return pinElement;
  }

  window.pin = {
    renderPin: renderPin
  };
})();
