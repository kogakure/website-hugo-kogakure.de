import gulp from 'gulp';
import cp from 'child_process';
import gutil from 'gulp-util';
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

gulp.task('server', () => {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
    port: 8888,
    ui: {
      port: 8887
    }
  });

  gulp.watch('./src/js/**/*.js', gulp.series('js'));
  gulp.watch('./app/**/*', gulp.series('hugo'));
});

gulp.task('default', gulp.parallel('hugo', 'server', 'js'));
