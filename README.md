# Relaunch of kogakure.de with Hugo

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
$ yarn run hugo
$ yarn run build
$ yarn run build-preview
$ yarn run svg
$ yarn run lint
$ yarn run lint:js
$ yarn run lint:css
```

- To create the Hugo site and start the server run `yarn start`
- To build the Hugo site run `yarn run hugo`
- To create a build run `yarn run build`
- To create a build with preview options run `yarn run build-preview`
- To create a SVG sprite from single SVG files run `yarn run svg`
- To check JavaScript and CSS for errors run `yarn run lint`
- To check JavaScript for errors run `yarn run lint:js`
- To check CSS for errors run `yarn run lint:css`

## Time Counter

To find out how long the relaunch took, I’ll use the [pomodoro technique][pomodoro] to work in focused bits of 25 minutes on my project, whenever I find some time:

🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅🍅

## Licence

All content is copyrighted by [Stefan Imhoff][si] unless otherwise stated. Feel free to learn from the source code and reuse code for your projects. The only thing which is not allowed is the usage of my design (the unique combination of layout, fonts, images), private photos and logo.

In easier words: **This is not a free theme**. Learn from it. Remix. Reuse. Build your own stuff.

[kogakure]: https://kogakure.de
[hugo]: http://gohugo.io/
[gulp]: http://gulpjs.com/
[yarn]: https://yarnpkg.com
[si]: https://stefanimhoff.de
[pomodoro]: https://cirillocompany.de/pages/pomodoro-technique
