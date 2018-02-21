'use strict';

(function () {
  var noticeForm = document.querySelector('.notice__form');
  var noticeFormType = noticeForm.querySelector('#type');
  var noticeFormPrice = noticeForm.querySelector('#price');
  var noticeTimeIn = noticeForm.querySelector('#timein');
  var noticeTimeOut = noticeForm.querySelector('#timeout');
  var noticeRoomNumber = noticeForm.querySelector('#room_number');
  var noticeRoomCapacity = noticeForm.querySelector('#capacity');

  function onHousingTypeChange() {

    var housingTypes = {
      bungalo: 0,
      flat: 1000,
      house: 5000,
      palace: 10000
    };

    var type = noticeFormType;
    var optionSelected = type.options[type.selectedIndex].value;

    noticeFormPrice.setAttribute('min', housingTypes[optionSelected]);
  }

  noticeFormType.addEventListener('change', onHousingTypeChange);

  function onSyncTimeInChange() {
    noticeTimeOut.value = noticeTimeIn.value;
  }

  noticeTimeIn.addEventListener('change', onSyncTimeInChange);

  function onSyncTimeOutChange() {
    noticeTimeIn.value = noticeTimeOut.value;
  }

  noticeTimeOut.addEventListener('change', onSyncTimeOutChange);

  function onRoomsChange() {
    var roomCapability = {
      '1': ['1'],
      '2': ['1', '2'],
      '3': ['1', '2', '3'],
      '100': ['0']
    };

    var suitableCapacity = roomCapability[noticeRoomNumber.value];

    for (var i = 0; i < noticeRoomCapacity.options.length; i++) {
      if (suitableCapacity.indexOf(noticeRoomCapacity.options[i].value) === -1) {
        noticeRoomCapacity.options[i].disabled = true;
      } else {
        noticeRoomCapacity.options[i].disabled = false;
      }
    }

    if (suitableCapacity.indexOf(noticeRoomCapacity.value) === -1) {
      noticeRoomCapacity.setCustomValidity('Выбранное количество мест не подходит для данного количества комнат');
    } else {
      noticeRoomCapacity.setCustomValidity('');
    }
  }

  noticeRoomNumber.addEventListener('change', onRoomsChange);
  noticeRoomCapacity.addEventListener('change', onRoomsChange);

  var switchOnForm = function () {
    var noticeFormFieldsets = noticeForm.querySelectorAll('fieldset');
    noticeForm.classList.remove('notice__form--disabled');

    for (var i = 0; i < noticeFormFieldsets.length; i++) {
      noticeFormFieldsets[i].removeAttribute('disabled');
    }

    onHousingTypeChange();
    onRoomsChange();
    onSyncTimeInChange();
  };

  var formReset = noticeForm.querySelector('.form__reset');

  formReset.addEventListener('click', function (evt) {
    evt.preventDefault();

    noticeForm.reset();

    noticeForm.classList.add('notice__form--disabled');

    window.map.disableMap();
  });

  window.form = {
    switchOnForm: switchOnForm
  };
})();
