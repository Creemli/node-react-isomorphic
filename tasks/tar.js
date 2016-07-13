const gulp = require('gulp');
const zip = require('gulp-zip');
gulp.task('tar', () => {
  return gulp.src(zipPath.src, {
      base: 'build',
      dot: true
    })
    .pipe(zip('snowx-web.zip'))
    .pipe(gulp.dest(zipPath.dest));
})
