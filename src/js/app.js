import fitvids from 'fitvids';
import fastclick from 'fastclick';

import navigation from './lib/navigation';
import figure from './lib/figure';
import tracking from './lib/tracking';

const trackingLinks = document.querySelectorAll('a');

// https://github.com/google/web-starter-kit/
const isLocalhost = Boolean(window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' ||
  window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
);

if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || isLocalhost)) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(function(registration) {
      registration.onupdatefound = function() {
        if (navigator.serviceWorker.controller) {
          const installingWorker = registration.installing;

          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                break;

              case 'redundant':
                throw new Error('The installing ' +
                  'service worker became redundant.');

              default:
                // Ignore
            }
          };
        }
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e); // eslint-disable-line no-console
    });
}

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
