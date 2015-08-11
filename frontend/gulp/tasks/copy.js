var gulp = require('gulp');

gulp.task('copy', ['copy-fonts', 'copy-vendor-styles']);

gulp.task('copy-fonts', function () {
  return gulp.src([ 'src/fonts/**/*' ])
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('copy-vendor-styles', function () {
  return gulp.src([ 'src/styles/**/*' ])
    .pipe(gulp.dest('dist/styles'));
});
