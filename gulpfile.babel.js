import gulp from 'gulp';
import BrowserSync from 'browser-sync';

const browserSync = BrowserSync.create();

gulp.task('server', () =>{
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
