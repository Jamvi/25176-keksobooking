'use strict';

(function () {
  var MAP_FILTERS = document.querySelector('.map__filters');
  var mapFilterType = MAP_FILTERS.querySelector('#housing-type');
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
  }

  function checkFilters(ad) {
    for (var key in mapFilters.housing) {

      if (mapFilters.housing[key] !== 'any' && ad.offer[key] !== mapFilters.housing[key]) {
        return false;
      }
    }
    return true;
  }

  function activateFilters() {

    for (var i = 0; i < selects.length; i++){
      selects[i].addEventListener('change', updateFilters);
    }

    for (var j = 0; j < checkboxes.length; j++){
      checkboxes[j].addEventListener('change', updateFilters);
    }
  }
  
  mapFilterType.addEventListener('change', updateFilters);

  window.filter = {
    check: checkFilters,
    activate: activateFilters
  }
})();
