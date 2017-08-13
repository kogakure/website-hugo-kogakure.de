[![Live](https://img.shields.io/badge/live-kogakure.de-green.svg)](https://kogakure.de/)
![Maintenance](https://img.shields.io/maintenance/yes/2017.svg)
![GitHub tag](https://img.shields.io/github/tag/kogakure/website-hugo-kogakure.de.svg)

# kogakure.de

This is the source of my [martial arts website][kogakure] build with [Hugo][hugo] and [Gulp.js][gulp].

## Installation

You will need [Hugo][hugo] to run this website (e. g. with Homebrew):

```bash
$ brew install hugo
```

You will need to install *GraphicsMagick* for thumbnail generation:

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
$ yarn start
$ yarn run build
$ yarn run build-preview
$ yarn run build-branch
$ yarn run build-dev
$ yarn run svg
$ yarn run crunch
$ yarn run webp
$ yarn run loadcss
$ yarn run pagespeed
$ yarn run lint
$ yarn run lint-js
$ yarn run lint-css
```

- To run a development server and create the development build run `yarn start`
- To create a production build run `yarn run build`
- To create a preview build with run `yarn run build-preview`
- To create a branch build with run `yarn run build-branch`
- To create a development build with run `yarn run build-dev`
- To create a SVG sprite from single SVG files run `yarn run svg`
- To minimize all images run `yarn run crunch`
- To generate WebP images run `yarn run webp`
- To copy the loadCSS JavaScript to the project run `yarn run loadcss`
- To performe PageSpeed Insights with live website run `yarn run pagespeed`
- To check JavaScript and CSS for errors run `yarn run lint`
- To check JavaScript for errors run `yarn run lint-js`
- To check CSS for errors run `yarn run lint-css`

## Time Counter

I migrated this website from Jekyll to Hugo. This included not only migration, but I implemented a complete page layout with CSS Grid Layout and added a Service Worker.

To find out how long the migration took, I used the [pomodoro technique][pomodoro] to work in focused bits of 25 minutes on my project, whenever I found some time.

The website was migrated after ~49 hours of work. 🎉

🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅

## Licence

All content is copyrighted by [Stefan Imhoff][si] unless otherwise stated. Feel free to learn from the source code and reuse code for your projects. The only thing which is not allowed is the usage of my design (the unique combination of layout, fonts, images), private photos and logo.

In easier words: **This is not a free theme**. Learn from it. Remix. Reuse. Build your own stuff.

[kogakure]: https://kogakure.de
[hugo]: http://gohugo.io/
[gulp]: http://gulpjs.com/
[yarn]: https://yarnpkg.com
[si]: https://stefanimhoff.de
[pomodoro]: https://cirillocompany.de/pages/pomodoro-technique
