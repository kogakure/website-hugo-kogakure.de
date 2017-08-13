'use strict';

import { task, src, dest, watch, series, parallel } from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

import os from 'os';
import path from 'path';
import pkg from './package.json';
import { spawn } from 'child_process';
import concurrent from 'concurrent-transform';
import del from 'del';

import BrowserSync from 'browser-sync';
import stylelint from 'stylelint';

import webpack from 'webpack';
import webpackConfig from './webpack.conf';

import cssImport from 'postcss-import';
import cssnext from 'postcss-cssnext';
import hexRGBA from 'postcss-hexrgba';
import reporter from 'postcss-reporter';

import { output as pagespeed } from 'psi';
import swPrecache from 'sw-precache';

const $ = gulpLoadPlugins();
const browserSync = BrowserSync.create();
const hugoBin = 'hugo';
const hugoArgsDefault = ['--config=config.toml'];
const hugoArgsPreview = ['--baseURL=/', '--buildDrafts', '--buildFuture'];
const hugoArgsDev = ['--baseURL=/', '--buildDrafts', '--buildFuture'];

const distDir = 'dist';

/**
 * Run hugo and build the site
 */
function buildSite(callback, options, enviroment = 'production') {
  const args = options ? hugoArgsDefault.concat(options) : hugoArgsDefault;

  process.env.NODE_ENV = enviroment;

  return spawn(hugoBin, args, { stdio: 'inherit' }).on('close', (code) => {
    if (code === 0) {
      browserSync.reload();
      callback();
    } else {
      browserSync.notify('Hugo build failed');
      callback('Hugo build failed');
    }
  });
}

/**
 * Service Worker Configuration and writing
 */
function writeServiceWorkerFile(handleFetch, callback) {
  var config = {
    cacheId: pkg.name,
    importScripts: [
      'assets/js/sw/sw-toolbox.js',
      'assets/js/sw/runtime-caching.js'
    ],
    handleFetch: handleFetch,
    logger: $.util.log,
    runtimeCaching: [{
      urlPattern: /assets\/images\/articles/,
      handler: 'networkFirst',
      options: {
        cache: {
          maxEntries: 200,
          name: 'article-images-cache'
        }
      }
    }],
    staticFileGlobs: [
      `${distDir}/`,
      `${distDir}/favicon.ico`,
      `${distDir}/*.html`,
      `${distDir}/**/*.html`,
      `${distDir}/assets/css/*.css`,
      `${distDir}/assets/js/*.js`,
      `${distDir}/assets/images/svg/*.svg`,
      `${distDir}/assets/images/stylesheets/**/*.{jpg,jpeg,png}`,
      `${distDir}/assets/images/homepage/*.{jpg,jpeg,png}`,
      `${distDir}/assets/images/chronology/*.{jpg,jpeg,png}`,
      `${distDir}/assets/images/error/*.{jpg,jpeg,png}`,
      `${distDir}/assets/images/recommendations/thumbs/**/*.{jpg,jpeg,png}`,
    ],
    stripPrefix: `${distDir}/`,
    verbose: true
  };

  swPrecache.write(path.join(distDir, 'service-worker.js'), config, callback);
}

/**
 * Error handling
 */
function onError(error) {
  $.util.beep();
  console.log(error);
  this.emit('end');
}

/**
 * Build Hugo website
 */
task('hugo', (callback) => buildSite(callback));
task('hugo-preview', (callback) => buildSite(callback, hugoArgsPreview));
task('hugo-dev', (callback) => buildSite(callback, hugoArgsDev, 'development'));

/**
 * Create CSS and Sourcemaps with PostCSS
 */
task('css', () => {
  return src('src/css/*.css')
    .pipe($.plumber({
      errorHandler: onError
    }))
    .pipe($.sourcemaps.init())
    .pipe($.postcss([
      cssImport({
        from: 'src/css/app.css'
      }),
      cssnext({
        features: {
          customProperties: {
            preserve: false,
            warnings: false
          },
          autoprefixer: {
            grid: true,
            browsers: [
              'Explorer >= 10',
              'ExplorerMobile >= 10',
              'Firefox >= 30',
              'Chrome >= 34',
              'Safari >= 7',
              'Opera >= 23',
              'iOS >= 7',
              'Android >= 4.4',
              'BlackBerry >= 10'
            ],
            cascade: true
          }
        },
      }),
      hexRGBA()
    ]))
    .pipe($.sourcemaps.write('.'))
    .pipe(dest(`${distDir}/assets/css/`))
    .pipe(browserSync.stream());
});

/**
 * Lint CSS files with Stylelint
 */
task('lint-css', () => {
  return src('src/css/**/*.css')
    .pipe($.postcss([
      stylelint(),
      reporter({
        clearMessages: true
      })
    ]));
});

/**
 * Package JavaScript with Webpack
 */
task('js', (callback) => {
  const myConfig = Object.assign({}, webpackConfig);

  if (process.env.NODE_ENV === 'production') {
    myConfig.plugins = myConfig.plugins.concat(
      new webpack.optimize.UglifyJsPlugin({
        output: {
          comments: false
        }
      })
    );
  }

  webpack(myConfig, (error, stats) => {
    if (error) {
      throw new $.util.PluginError('webpack', error);
    }
    $.util.log('[webpack]', stats.toString({
      colors: true,
      progress: true
    }));
    browserSync.reload();
    callback();
  });
});

/**
 * Copy import scripts for Service Worker
 */
task('copy-sw-scripts', () => {
  return src([
    'node_modules/sw-toolbox/sw-toolbox.js',
    'src/js/sw/runtime-caching.js'
  ])
    .pipe(dest(`${distDir}/assets/js/sw`))
});

/**
 * Lint JavaScript files with ESlint
 */
task('lint-js', () => {
  return src(['!node_modules/**', 'src/js/*.js'])
    .pipe($.eslint())
    .pipe($.eslint.format());
});

/**
 * Create SVG sprite map from SVG files
 */
task('svg', () => {
  return src('src/svg/*.svg')
  .pipe($.plumber())
    .pipe($.svgSprite({
      mode: {
        symbol: {
          dest: 'svg',
          sprite: 'icons.svg'
        },
        svg: {
          xmlDeclaration: false,
          doctypeDeclaration: false
        }
      }
    }))
    .pipe(dest('app/layouts/partials'));
});

/**
 * Generate thumbnails from images
 */
task('thumbnails', () => {
  return src('app/static/assets/images/recommendations/fullsize/**/*.{jpg,jpeg,png}')
    .pipe($.changed('app/static/assets/images/recommendations/thumbs/'))
    .pipe(concurrent(
      $.imageResize({
        width: 100
      }),
      os.cpus().length
    ))
    .pipe(dest('app/static/assets/images/recommendations/thumbs/'));
});

/**
 * Optimize and minimize images
 */
task('optimize-images', () => {
  return src('app/static/assets/images/**/*.{jpg,jpeg,png,gif,svg}')
    .pipe($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    }))
    .pipe(dest('app/static/assets/images/'))
    .pipe($.size());
});

/**
 * Generate WebP images from image files
 */
task('webp', () => {
  return src('app/static/assets/images/**/*.{jpg,jpeg,png}')
    .pipe($.webp())
    .pipe(dest('app/static/assets/images/'));
});

/**
 * Copy loadCSS JavaScript to project folder
 */
task('loadcss', () => {
  return src('node_modules/fg-loadcss/src/loadCSS.js')
    .pipe(dest('app/layouts/partials/critical/'));
});

/**
 * Copy critical CSS files to project folder
 */
task('criticalcss', () => {
  return src(`${distDir}/assets/css/critical_*.css`)
    .pipe(dest('app/layouts/partials/critical/'));
});

/**
 * Clean up dist folder for production build
 */
task('delete', (callback) => {
  del([distDir]);
  callback();
});

/**
 * Minimize HTML and inline CSS and JavaScript
 */
task('optimize-html', () => {
  return src(`${distDir}/**/*.html`)
    .pipe($.htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      conservativeCollapse: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeOptionalTags: true,
      minifyJS: true,
      minifyCSS: true,
      processScripts: ['application/ld+json']
    }))
    .pipe(dest(distDir));
});

/**
 * Minimize CSS files
 */
task('optimize-css', () => {
  return src(`${distDir}/assets/css/*.css`)
    .pipe($.csso())
    .pipe(dest(`${distDir}/assets/css/`));
});

/**
 * Create revisions and manifest file
 */
task('revision', () => {
  return src([
    `${distDir}/assets/css/*.css`,
    `${distDir}/assets/js/*.js`,
    `${distDir}/assets/images/**/*`,
    `!${distDir}/assets/images/og/*`,
    `!${distDir}/assets/images/icons/*`,
    `!${distDir}/assets/images/ms/*`
  ], {
    base: distDir
  })
    .pipe(dest(distDir))
    .pipe($.rev())
    .pipe($.revDeleteOriginal())
    .pipe(dest(distDir))
    .pipe($.rev.manifest({
      path: 'revision.json'
    }))
    .pipe(dest(distDir));
});

/**
 * Replace revisioned files
 */
task('revision-collect', () => {
  return src([
    `${distDir}/revision.json`,
    `${distDir}/**/*.{html,xml,css,js}`
  ])
    .pipe($.revCollector())
    .pipe(dest(`${distDir}`));
});

/**
 * Generate Service Worker (Development/Production)
 */
task('generate-service-worker-dev', (callback) => {
  writeServiceWorkerFile(false, callback);
});

task('generate-service-worker', (callback) => {
  writeServiceWorkerFile(true, callback);
});

/**
 * Run PageSpeed insights
 */
task('pagespeed', callback =>
  pagespeed('kogakure.de', {
    strategy: 'mobile'
  }, callback)
);

/**
 * Run production builds to generate CSS, JavaScript and HTML.
 * Optimize and minimize files, revision assets and generate
 * Service Worker.
 */
task('build', series(
  series('delete', 'js', 'css', 'criticalcss', 'hugo'),
  parallel('optimize-html', 'optimize-css'),
  series('revision', 'revision-collect'),
  series('copy-sw-scripts', 'generate-service-worker')
));

/**
 * Run preview builds to generate CSS, JavaScript and HTML.
 * Optimize and minimize files, revision assets and generate
 * Service Worker.
 */
task('build-preview', series(
  series('delete', 'js', 'css', 'criticalcss', 'hugo-preview'),
  parallel('optimize-html', 'optimize-css'),
  series('revision', 'revision-collect'),
  series('copy-sw-scripts', 'generate-service-worker')
));

/**
 * Run build to generate CSS, JavaScript and HTML and Service Worker
 */
task('build-dev', series(
  parallel('css', 'js', 'hugo-dev'),
  series('copy-sw-scripts', 'generate-service-worker-dev')
));

/**
 * Start development server with BrowserSync and watch files for changes
 */
task('server', series('build-dev', () => {
  browserSync.init({
    server: {
      baseDir: distDir
    },
    open: false,
    port: 8888,
    ui: {
      port: 8887
    }
  });

  watch('src/css/**/*.css', series('css', 'lint-css'));
  watch('./src/js/**/*.js', series('js', 'lint-js'));
  watch('./app/**/*', series('hugo-dev'));
  watch('./config.toml', series('hugo-dev'));
  watch('./src/svg/*.svg', series('svg'));
  watch('app/static/assets/images/recommendations/fullsize/**/*.{jpg,jpeg,png}', series('thumbnails'));
}));

task('default', parallel('server'));
