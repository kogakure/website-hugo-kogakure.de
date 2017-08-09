'use strict';

const container = document.querySelector('div.container');
const url = window.location.href;
const overlay = document.querySelector('div.overlay');
const triggerBttn = document.querySelector('.nav-btn');
const navigationLinks = '.nav-link';
const INVISIBLE = 'invisible';

module.exports = {
  /**
   * Hightlight current navigation item
   */
  currentNavigationItem: function() {
    const selectedNavigationItem = Array.prototype.filter.call(document.querySelectorAll(navigationLinks), function(target) {
      return target.href === url;
    });

    return selectedNavigationItem[0];
  }
};
