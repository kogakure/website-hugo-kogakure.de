'use strict';

const images = document.querySelectorAll('.main img');
const figure = document.createElement('figure');
let content, temp;

module.exports = {
  /**
   * Create a <figure> tag around images with title attribute
   */
  figurizeImage: function() {
    Array.prototype.forEach.call(images, function(image) {
      const caption = image.getAttribute('title');

      if (caption) {
        temp = figure.cloneNode(false);
        temp.classList.add('image-figure');
        image.parentNode.insertBefore(temp, image);
        content = document.createElement('figcaption');
        content.classList.add('image-figure-caption');
        content.innerHTML = caption;
        temp.appendChild(image);
        temp.appendChild(content);
      }
    });
  }
};
