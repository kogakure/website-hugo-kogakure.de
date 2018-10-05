const url = window.location.href;
const navigationLinks = '.nav-link';

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
