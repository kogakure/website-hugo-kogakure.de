import gulp from 'gulp';
import os from 'os';
import {spawn} from 'child_process';
import parallel from 'concurrent-transform';
import gutil from 'gulp-util';
import BrowserSync from 'browser-sync';
import plumber from 'gulp-plumber';
import changed from 'gulp-changed';
import svgSprite from 'gulp-svg-sprite';
import resize from 'gulp-image-resize';
import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';
import size from 'gulp-size';
import postcss from 'gulp-postcss';
import cssImport from 'postcss-import';
import cssnext from 'postcss-cssnext';
import hexRGBA from 'postcss-hexrgba';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import stylelint from 'stylelint';
import eslint from 'gulp-eslint';
import reporter from 'postcss-reporter';
import webpack from 'webpack';
import webpackConfig from './webpack.conf';

const browserSync = BrowserSync.create();
const hugoBin = 'hugo';
const hugoArgsDefault = ['--config=config.toml'];
const hugoArgsDev = ['--baseURL=http://0.0.0.0:8888/', '--buildDrafts', '--buildFuture'];

const thumbFolder = 'app/static/assets/images/recommendations/thumbs/';
const fullsizeImages = 'app/static/assets/images/recommendations/fullsize/**/*.{jpg,jpeg,png}';
const allCssFiles = './src/css/**/*.css';

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

function onError(error) {
  gutil.beep();
  console.log(error);
  this.emit('end');
}

/**
 * Build Hugo website
 */
gulp.task('hugo', (callback) => buildSite(callback));
gulp.task('hugo:dev', (callback) => buildSite(callback, hugoArgsDev, 'development'));

/**
 * Create CSS and Sourcemaps with PostCSS
 */
gulp.task('css', () => {
  return gulp.src('./src/css/*.css')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sourcemaps.init())
    .pipe(postcss([
      cssImport({
        from: './src/css/app.css'
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
              'last 2 versions',
              'safari 5',
              'opera 12.1',
              'ios 6',
              'android 4'
            ],
            cascade: true
          }
        },
      }),
      hexRGBA()
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/assets/css/'))
    .pipe(browserSync.stream());
});

/**
 * Lint CSS files with Stylelint
 */
gulp.task('lint:css', () => {
  return gulp.src(allCssFiles)
    .pipe(postcss([
      stylelint(),
      reporter({
        clearMessages: true
      })
    ]));
});

/**
 * Package JavaScript with Webpack
 */
gulp.task('js', (callback) => {
  const myConfig = Object.assign({}, webpackConfig);

  webpack(myConfig, (error, stats) => {
    if (error) {
      throw new gutil.PluginError('webpack', error);
    }
    gutil.log('[webpack]', stats.toString({
      colors: true,
      progress: true
    }));
    browserSync.reload();
    callback();
  });
});

/**
 * Lint JavaScript files with ESlint
 */
gulp.task('lint:js', () => {
  return gulp.src(['!node_modules/**', 'src/js/*.js'])
    .pipe(eslint())
    .pipe(eslint.format());
});

/**
 * Create SVG sprite map from SVG files
 */
gulp.task('svg', () => {
  return gulp.src('src/svg/*.svg')
  .pipe(plumber())
    .pipe(svgSprite({
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
    .pipe(gulp.dest('app/layouts/partials'));
});

/**
 * Generate thumbnails from images
 */
gulp.task('thumbnails', () => {
  return gulp.src(fullsizeImages)
    .pipe(changed(thumbFolder))
    .pipe(parallel(
      resize({
        width: 100
      }),
      os.cpus().length
    ))
    .pipe(gulp.dest(thumbFolder));
});

/**
 * Optimize and minimize images
 */
gulp.task('optimize:images', () => {
  return gulp.src('app/static/assets/images/**/*.{jpg,jpeg,png,gif,svg}')
    .pipe(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('app/static/assets/images/'))
    .pipe(size());
});

/**
 * Generate WebP images from image files
 */
gulp.task('webp', () => {
  return gulp.src('app/static/assets/images/**/*.{jpg,jpeg,png}')
    .pipe(webp())
    .pipe(gulp.dest('app/static/assets/images/'));
});

/**
 * Copy loadCSS JavaScript to project folder
 */
gulp.task('loadcss', () => {
  return gulp.src('node_modules/fg-loadcss/src/loadCSS.js')
    .pipe(uglify())
    .pipe(gulp.dest('app/layouts/partials/critical/'));
});

/**
 * Run builds to generate CSS, JavaScript and HTML
 */
gulp.task('build', gulp.series(gulp.parallel('css', 'js', 'hugo')));
gulp.task('build:dev', gulp.series(gulp.parallel('css', 'js', 'hugo:dev')));

/**
 * Start development server with BrowserSync and watch files for changes
 */
gulp.task('server', gulp.series('build:dev', () => {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
    open: false,
    port: 8888,
    ui: {
      port: 8887
    }
  });

  gulp.watch(allCssFiles, gulp.series('css', 'lint:css'));
  gulp.watch('./src/js/**/*.js', gulp.series('js', 'lint:js'));
  gulp.watch('./app/**/*', gulp.series('hugo:dev'));
  gulp.watch('./config.toml', gulp.series('hugo:dev'));
  gulp.watch('./src/svg/*.svg', gulp.series('svg'));
  gulp.watch(fullsizeImages, gulp.series('thumbnails'));
}));

gulp.task('default', gulp.parallel('server'));
