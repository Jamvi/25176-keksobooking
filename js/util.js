'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function getUniqueElement(array) {
    var uniqueElement = array.splice(getRandomInt(0, array.length - 1), 1);
    return uniqueElement[0];
  }

  function shuffleArray(array) {
    var newArray = array.slice();
    var j;
    var x;
    var i;

    for (i = newArray.length - 1; i > 0; i--) {

      j = Math.floor(Math.random() * (i + 1));
      x = newArray[i];
      newArray[i] = newArray[j];
      newArray[j] = x;

    }

    return newArray;
  }

  function getRandomArrayLength(array) {
    var newArray = array.slice();
    return shuffleArray(newArray).slice(0, getRandomInt(1, newArray.length - 1));
  }

  function removeChildren(element, selector) {

    var children = [];
    if (selector) {
      children = element.querySelectorAll(selector);
    } else {
      children = element.children;
    }
    for (var i = children.length - 1; i >= 0; i--) {
      element.removeChild(children[i]);
    }

  }

  var lastTimeout;
  var debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  };

  window.util = {
    getRandomInt: getRandomInt,
    getRandomElement: getRandomElement,
    getUniqueElement: getUniqueElement,
    shuffleArray: shuffleArray,
    getRandomArrayLength: getRandomArrayLength,
    removeChildren: removeChildren,
    debounce: debounce
  };
})();
