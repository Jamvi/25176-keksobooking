'use strict';

(function () {
  var MAP_FILTERS = document.querySelector('.map__filters');
  var selects = MAP_FILTERS.querySelectorAll('select');
  var checkboxes = MAP_FILTERS.querySelectorAll('input');

  var mapFilters = {
    housing: {
      type: MAP_FILTERS.querySelector('#housing-type').value,
      price: MAP_FILTERS.querySelector('#housing-price').value,
      rooms: MAP_FILTERS.querySelector('#housing-rooms').value,
      guests: MAP_FILTERS.querySelector('#housing-guests').value
    },
    features: {
      wifi: MAP_FILTERS.querySelector('#filter-wifi').checked,
      dishwasher: MAP_FILTERS.querySelector('#filter-dishwasher').checked,
      parking: MAP_FILTERS.querySelector('#filter-parking').checked,
      washer: MAP_FILTERS.querySelector('#filter-washer').checked,
      elevator: MAP_FILTERS.querySelector('#filter-elevator').checked,
      conditioner: MAP_FILTERS.querySelector('#filter-conditioner').checked
    }
  };

  function updateFilters() {
    for (var i = 0; i < selects.length; i++) {
      var hkey = selects[i].id.split('-')[1];
      mapFilters.housing[hkey] = selects[i].value;
    }
    for (var j = 0; j < checkboxes.length; j++) {
      var fkey = checkboxes[j].value;
      mapFilters.features[fkey] = checkboxes[j].checked;
    }

    window.util.debounce(window.map.renderPins);
  }

  function checkFilters(ad) {
    for (var housing in mapFilters.housing) {

      if (mapFilters.housing.hasOwnProperty(housing)) {
        var currentProp = ad.offer[housing];

        if (housing === 'price') {
          currentProp = checkPrice(currentProp);
        }

        if (mapFilters.housing[housing] !== 'any' && currentProp.toString() !== mapFilters.housing[housing]) {
          return false;
        }
      }
    }

    for (var feature in mapFilters.features) {
      if (mapFilters.features[feature] === true && ad.offer.features.indexOf(feature) === -1) {
        return false;
      }
    }
    return true;
  }

  function checkPrice(price) {

    if (price < 10000) {
      return 'low';
    } else if (price > 50000) {
      return 'high';
    } else {
      return 'middle';
    }
  }

  function activateFilters() {

    for (var i = 0; i < selects.length; i++) {
      selects[i].addEventListener('change', updateFilters);
    }

    for (var j = 0; j < checkboxes.length; j++) {
      checkboxes[j].addEventListener('change', updateFilters);
    }
  }

  window.filter = {
    check: checkFilters,
    activate: activateFilters
  };
})();
