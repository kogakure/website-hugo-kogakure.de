import gulp from 'gulp';
import cp from 'child_process';
import gutil from 'gulp-util';
import postcss from 'gulp-postcss';
import stylelint from 'stylelint';
import reporter from 'postcss-reporter';
import cssImport from 'postcss-import';
import cssnext from 'postcss-cssnext';
import eslint from 'gulp-eslint';
import BrowserSync from 'browser-sync';
import webpack from 'webpack';
import webpackConfig from './webpack.conf';

const browserSync = BrowserSync.create();
const hugoBin = 'hugo';
const defaultArgs = ['--config=config.toml'];

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

gulp.task('hugo', (callback) => buildSite(callback));
gulp.task('hugo-preview', (callback) => buildSite(callback, ['--buildDrafts', '--buildFuture']));

gulp.task('css', () => {
  return gulp.src('./src/css/*.css')
    .pipe(postcss([
      cssImport({
        from: './src/css/app.css'
      }),
      cssnext()
    ]))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
});

gulp.task('lint:css', () => {
  return gulp.src('src/css/**/*.css')
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

  gulp.watch('./src/css/**/*.css', gulp.series('css', 'lint:css'));
  gulp.watch('./src/js/**/*.js', gulp.series('js', 'lint:js'));
  gulp.watch('./app/**/*', gulp.series('hugo'));
}));

gulp.task('default', gulp.parallel('server'));
