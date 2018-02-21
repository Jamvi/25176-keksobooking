'use strict';

(function () {

  var MAIN_MAP_PIN = document.querySelector('.map__pin--main');
  var MAIN_PIN_SIZE = 65;
  var MAIN_PIN_POINTER_HEIGHT = 22;
  var PIN_CENTER = 25;
  var PIN_BOTTOM = 70;
  var MAP_ELEMENT = document.querySelector('.map');
  var MAP_PINS_ELEMENT = MAP_ELEMENT.querySelector('.map__pins');
  var TEMPLATE = document.querySelector('template').content;
  var PIN_TEMPLATE = TEMPLATE.querySelector('.map__pin');
  var NOTICE_ADDRESS = document.querySelector('#address');

  function renderPins(pinsList, pinsElement, pinTemplate) {
    var fragment = document.createDocumentFragment();

    for (var j = 0; j < pinsList.length; j++) {
      fragment.appendChild(window.pin.renderPin(pinsList[j], pinTemplate, PIN_CENTER, PIN_BOTTOM));
    }

    pinsElement.appendChild(fragment);
  }

  function getPinPosition(firstRun) {
    var pinX = MAIN_MAP_PIN.offsetLeft + MAIN_PIN_SIZE / 2;
    var pinY = MAIN_MAP_PIN.offsetTop + MAIN_PIN_SIZE / 2;

    if (!firstRun) {
      pinY = MAIN_MAP_PIN.offsetTop + MAIN_PIN_SIZE + MAIN_PIN_POINTER_HEIGHT;
    }

    NOTICE_ADDRESS.value = pinX + ', ' + pinY;
  }

  function dragMainPin() {

    MAP_ELEMENT.classList.remove('map--faded');

    window.form.switchOnForm();

    getPinPosition(false);

    renderPins(window.data.advertisements, MAP_PINS_ELEMENT, PIN_TEMPLATE);
  }

  getPinPosition(true);

  MAIN_MAP_PIN.addEventListener('mouseup', dragMainPin);

  function disableMap() {
    window.util.removeChildren(MAP_ELEMENT, '.map__card');
    window.util.removeChildren(MAP_PINS_ELEMENT, '.map__pin:not(.map__pin--main)');
    MAP_ELEMENT.classList.add('map--faded');
    getPinPosition(true);
  }

  window.map = {
    getPinPosition: getPinPosition,
    disableMap: disableMap
  };
})();
