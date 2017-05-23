import gulp from 'gulp';
import cp from 'child_process';
import BrowserSync from 'browser-sync';

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
});

gulp.task('default', gulp.parallel('hugo', 'server'));
