'use strict';

(function () {
  var message = function (text) {
    var node = document.createElement('div');
    node.classList.add('toast');

    node.textContent = text;
    document.body.appendChild(node);

    var deleteMessage = function () {
      node.remove();
    };

    node.addEventListener('click', function () {
      deleteMessage();
    });

    setTimeout(deleteMessage, 5000);
  };

  window.toast = {
    message: message
  };
})();
