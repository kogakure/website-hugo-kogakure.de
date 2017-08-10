import fitvids from 'fitvids';
import fastclick from 'fastclick';

import navigation from './lib/navigation';
import figure from './lib/figure';
import tracking from './lib/tracking';

const trackingLinks = document.querySelectorAll('a');

if ('querySelector' in document && 'addEventListener' in window) {
  document.addEventListener('DOMContentLoaded', () => {
    // FastClick
    fastclick.attach(document.body);

    // Fitvids
    fitvids('.container');

    // Highlighting of navigation item
    if (navigation.currentNavigationItem()) {
      navigation.currentNavigationItem().classList.add('is-active');
    }

    // Figurize
    figure.figurizeImage();

    // Tracking
    for (let i = 0, len = trackingLinks.length; i < len; i++) {
      const trackingLink = trackingLinks[i];

      trackingLink.addEventListener('click', tracking.trackLinksWithGoogleAnalytics);
    }
  });
}
