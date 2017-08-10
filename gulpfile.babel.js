import gulp from 'gulp';
import os from 'os';
import cp from 'child_process';
import parallel from 'concurrent-transform';
import gutil from 'gulp-util';
import BrowserSync from 'browser-sync';
import plumber from 'gulp-plumber';
import changed from 'gulp-changed';
import svgSprite from 'gulp-svg-sprite';
import resize from 'gulp-image-resize';
import imagemin from 'gulp-imagemin';
import size from 'gulp-size';
import postcss from 'gulp-postcss';
import cssImport from 'postcss-import';
import cssnext from 'postcss-cssnext';
import hexRGBA from 'postcss-hexrgba';
import sourcemaps from 'gulp-sourcemaps';
import stylelint from 'stylelint';
import eslint from 'gulp-eslint';
import reporter from 'postcss-reporter';
import webpack from 'webpack';
import webpackConfig from './webpack.conf';

const browserSync = BrowserSync.create();
const hugoBin = 'hugo';
const defaultArgs = ['--config=config.toml'];

const thumbFolder = 'app/static/assets/images/recommendations/thumbs/';
const fullsizeImages = 'app/static/assets/images/recommendations/fullsize/**/*.{jpg,jpeg,png}';
const allCssFiles = './src/css/**/*.css';

function buildSite(callback, options) {
  const args = options ? defaultArgs.concat(options) : defaultArgs;

  return cp.spawn(hugoBin, args, { stdio: 'inherit' }).on('close', (code) => {
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

gulp.task('hugo', (callback) => buildSite(callback));
gulp.task('hugo-preview', (callback) => buildSite(callback, ['--buildDrafts', '--buildFuture']));


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


gulp.task('lint:css', () => {
  return gulp.src(allCssFiles)
    .pipe(postcss([
      stylelint(),
      reporter({
        clearMessages: true
      })
    ]));
});


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


gulp.task('lint:js', () => {
  return gulp.src(['!node_modules/**', 'src/js/*.js'])
    .pipe(eslint())
    .pipe(eslint.format());
});

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

gulp.task('build', gulp.series(gulp.parallel('css', 'js', 'hugo')));
gulp.task('build-preview', gulp.series(gulp.parallel('css', 'js', 'hugo-preview')));


gulp.task('server', gulp.series('build', () => {
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
  gulp.watch('./app/**/*', gulp.series('hugo'));
  gulp.watch('./config.toml', gulp.series('hugo'));
  gulp.watch('./src/svg/*.svg', gulp.series('svg'));
  gulp.watch(fullsizeImages, gulp.series('thumbnails'));
}));

gulp.task('default', gulp.parallel('server'));
