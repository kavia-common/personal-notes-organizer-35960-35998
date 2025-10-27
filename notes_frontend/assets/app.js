(function () {
  'use strict';
  // Global app namespace
  window.FigmaScreenApp = window.FigmaScreenApp || {};

  // Utility: attach event delegation later if interactions are provided
  window.FigmaScreenApp.on = function (selector, event, handler) {
    document.addEventListener(event, function (e) {
      if (e.target.closest(selector)) handler(e);
    });
  };
})();
