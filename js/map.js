'use strict';

(function () {

  var MAP = document.querySelector('.map');
  var MAP_PINS = MAP.querySelector('.map__pins');
  var TEMPLATE = document.querySelector('template').content;
  var PIN_TEMPLATE = TEMPLATE.querySelector('.map__pin');
  var PIN_CENTER = 25;
  var PIN_BOTTOM = 70;
  var mainPin = document.querySelector('.map__pin--main');
  var mainPinHeight = parseInt(getComputedStyle(mainPin).getPropertyValue('height'), 10);
  var mainPinPointerHeight = parseInt(getComputedStyle(mainPin, ':after').getPropertyValue('border-top-width'), 10);
  var noticeAddress = document.querySelector('#address');

  var offers = [];

  function renderPins(pinsList, pinsElement, pinTemplate) {
    var fragment = document.createDocumentFragment();

    for (var j = 0; j < pinsList.length; j++) {
      fragment.appendChild(window.pin.renderPin(pinsList[j], pinTemplate, PIN_CENTER, PIN_BOTTOM));
    }

    pinsElement.appendChild(fragment);
  }

  function getPinPosition(firstRun) {
    var pinX = mainPin.offsetLeft;
    var pinY = mainPin.offsetTop + mainPinHeight / 2;

    if (!firstRun) {
      pinY = mainPin.offsetTop + mainPinHeight / 2 + mainPinPointerHeight;
    }
    noticeAddress.value = pinX + ', ' + pinY;
  }

  function dragMainPin(evt) {

    var disabledMap = (MAP.className.indexOf('map--faded') !== -1);

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var borders = {
      minX: 0,
      maxX: MAP_PINS.offsetWidth,
      minY: 150 - mainPinHeight / 2 - mainPinPointerHeight,
      maxY: 500 - mainPinHeight / 2 - mainPinPointerHeight
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var dialogX = Math.min(Math.max((mainPin.offsetLeft - shift.x), borders.minX), borders.maxX);
      var dialogY = Math.min(Math.max((mainPin.offsetTop - shift.y), borders.minY), borders.maxY);

      noticeAddress.value = dialogX + ', ' + (dialogY + mainPinHeight / 2 + mainPinPointerHeight);

      mainPin.style.left = dialogX + 'px';
      mainPin.style.top = dialogY + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    getPinPosition(false);

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    if (disabledMap) {
      enableMap();
    }
  }

  function enableMap() {
    MAP.classList.remove('map--faded');
    window.filter.activate();

    window.form.switchOnForm();

    window.backend.load(function (data) {
      offers = data;
      var filteredAds = data.filter(window.filter.check);
      renderPins(filteredAds, MAP_PINS, PIN_TEMPLATE);
    }, function (errorMessage) {
      window.toast.message(errorMessage);
    });

  }

  getPinPosition(true);

  mainPin.addEventListener('mousedown', dragMainPin);

  function disableMap() {
    window.util.removeChildren(MAP, '.map__card');
    window.util.removeChildren(MAP_PINS, '.map__pin:not(.map__pin--main)');
    MAP.classList.add('map--faded');
    getPinPosition(true);
  }

  window.map = {
    getPinPosition: getPinPosition,
    disableMap: disableMap,
    renderPins: renderPins,
    offers: offers
  };

})();
