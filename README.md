[![Netlify Status](https://api.netlify.com/api/v1/badges/ee50c303-884e-4f40-88a9-754fb6cabce4/deploy-status)](https://app.netlify.com/sites/kogakure-de/deploys)
[![Live](https://img.shields.io/badge/live-kogakure.de-green.svg)](https://www.kogakure.de/)
![Maintenance](https://img.shields.io/maintenance/yes/2021.svg)
![GitHub tag](https://img.shields.io/github/tag/kogakure/website-hugo-kogakure.de.svg)

# kogakure.de

This is the source of my [martial arts website][kogakure] build with [Hugo][hugo] and [Gulp.js][gulp].

## Installation

You will need [Hugo][hugo] to run this website (e. g. with Homebrew):

```bash
$ brew install hugo
```

You will need to install _GraphicsMagick_ for thumbnail generation:

```bash
$ brew install graphicsmagick
```

Install `nvm` and the correct `node` version:

```bash
$ git clone https://github.com/creationix/nvm.git ~/.nvm
$ cd ~/.nvm
$ git checkout `git describe --abbrev=0 --tags`
$ nvm install 6.3.1
```

I recommend using [Yarn][yarn], otherwise replace all occurrences of `yarn` with `npm`.

After cloning the repository run:

```bash
$ yarn install
```

## Tasks

These tasks are provided:

```bash
$ yarn start             # Run development server and create development build
$ yarn run build         # Create production build
$ yarn run build-preview # Create preview build
$ yarn run build-branch  # Create branch build
$ yarn run build-dev     # Create development build
$ yarn run svg           # Create SVG sprite from single SVG files
$ yarn run crunch        # Minimize all images
$ yarn run webp          # Generate WebP images
$ yarn run loadcss       # Copy loadCSS JavaScript to project
$ yarn run pagespeed     # Perform PageSpeed Insights against live website
$ yarn run lint          # Check JavaScript and CSS for errors
$ yarn run lint-js       # Check JavaScript for errors
$ yarn run lint-css      # Check CSS for errors
```

## Time Counter

I migrated this website from Jekyll to Hugo. This included not only migration, but I implemented a complete page layout with CSS Grid Layout and added a Service Worker.

To find out how long the migration took, I used the [pomodoro technique][pomodoro] to work in focused bits of 25 minutes on my project, whenever I found some time.

The website was migrated after ~49 hours of work. 🎉

🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅

## Licence

All content is copyrighted by [Stefan Imhoff][si] unless otherwise stated. Feel free to learn from the source code and reuse code for your projects. The only thing which is not allowed is the usage of my design (the unique combination of layout, fonts, images), private photos and logo.

In easier words: **This is not a free theme**. Learn from it. Remix. Reuse. Build your own stuff.

[kogakure]: https://www.kogakure.de
[hugo]: http://gohugo.io/
[gulp]: https://gulpjs.com/
[yarn]: https://yarnpkg.com
[si]: https://www.stefanimhoff.de
[pomodoro]: https://cirillocompany.de/pages/pomodoro-technique
