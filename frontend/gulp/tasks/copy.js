var gulp = require('gulp');
var webp = require('gulp-webp');

gulp.task('copy', ['copy-fonts', 'copy-images', 'copy-vendor-styles']);

gulp.task('copy-fonts', function () {
  return gulp.src([ 'src/fonts/**/*' ])
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('copy-vendor-styles', function () {
  return gulp.src([ 'src/styles/**/*' ])
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('copy-images', function () {
  return gulp.src('src/js/components/**/*.{png,jpg,jpeg}')
    //.pipe(webp())
    .pipe(gulp.dest('dist/images'));
});
