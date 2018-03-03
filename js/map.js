'use strict';

(function () {
  var MAP = document.querySelector('.map');
  var MAP_PINS = MAP.querySelector('.map__pins');
  var TEMPLATE = document.querySelector('template').content;
  var PIN_TEMPLATE = TEMPLATE.querySelector('.map__pin');
  var PIN_AMOUNT = 5;
  var PIN_CENTER = 25;
  var PIN_BOTTOM = 70;
  var MAP_FILTERS = document.querySelector('.map__filters');

  var mainPin = document.querySelector('.map__pin--main');
  var mainPinPositionTop = getComputedStyle(mainPin).getPropertyValue('top');
  var mainPinPositionLeft = getComputedStyle(mainPin).getPropertyValue('left');
  var mainPinPointerHeight = 80;
  var noticeAddress = document.querySelector('#address');
  var offers = [];

  function renderPins() {
    window.util.removeChildren(MAP_PINS, '.map__pin:not(.map__pin--main)');
    window.card.clearCard();

    var filteredAds = offers.filter(window.filter.check).sort(function (first, second) {
      var distanceFirst = Math.sqrt(Math.pow(first.location.x - getPinPosition().x, 2) + Math.pow(first.location.y - getPinPosition().y, 2));
      var distanceSecond = Math.sqrt(Math.pow(second.location.x - getPinPosition().x, 2) + Math.pow(second.location.y - getPinPosition().y, 2));
      return distanceFirst - distanceSecond;
    });

    var fragment = document.createDocumentFragment();

    var maxAmount = PIN_AMOUNT;
    if (PIN_AMOUNT > filteredAds.length) {
      maxAmount = filteredAds.length;
    }

    for (var j = 0; j < maxAmount; j++) {
      fragment.appendChild(window.pin.renderPin(filteredAds[j], PIN_TEMPLATE, PIN_CENTER, PIN_BOTTOM));
    }

    MAP_PINS.appendChild(fragment);
  }

  function getPinPosition(firstRun) {
    var pinX = mainPin.offsetLeft;
    var pinY = mainPin.offsetTop;

    if (!firstRun) {
      pinY = mainPin.offsetTop + mainPinPointerHeight / 2;
    }
    noticeAddress.value = pinX + ', ' + pinY;
    return {x: pinX, y: pinY};
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
      minY: 150 - mainPinPointerHeight / 2,
      maxY: 500 - mainPinPointerHeight / 2
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

      noticeAddress.value = dialogX + ', ' + (dialogY + mainPinPointerHeight / 2);

      mainPin.style.left = dialogX + 'px';
      mainPin.style.top = dialogY + 'px';

      window.util.debounce(renderPins);

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

    enableMapFilter();

    window.backend.load(function (data) {
      offers = data;
      renderPins();
    }, function (errorMessage) {
      window.toast.message(errorMessage);
    });

  }

  function disableMap() {
    window.card.clearCard();
    window.util.removeChildren(MAP_PINS, '.map__pin:not(.map__pin--main)');
    MAP.classList.add('map--faded');

    mainPin.style.top = mainPinPositionTop;
    mainPin.style.left = mainPinPositionLeft;

    getPinPosition(true);

    disableMapFilters();
  }

  function enableMapFilter() {
    var mapFilterFields = MAP_FILTERS.querySelectorAll('.map__filter, .feature');
    for (var i = 0; i < mapFilterFields.length; i++) {
      mapFilterFields[i].disabled = false;
    }
  }

  function disableMapFilters() {
    var mapFilterFields = MAP_FILTERS.querySelectorAll('.map__filter, .feature');
    for (var i = 0; i < mapFilterFields.length; i++) {
      mapFilterFields[i].disabled = true;
    }
  }

  getPinPosition(true);
  disableMapFilters();

  mainPin.addEventListener('mousedown', dragMainPin);

  window.map = {
    getPinPosition: getPinPosition,
    disableMap: disableMap,
    renderPins: renderPins
  };

})();
