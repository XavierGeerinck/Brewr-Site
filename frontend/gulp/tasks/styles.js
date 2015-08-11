var gulp = require('gulp');
var connect = require('gulp-connect');
var cssnext = require('gulp-cssnext');
var concatCss = require('gulp-concat-css');
var config = require('../config.js').cssnext;

gulp.task('styles', function() {
  gulp.src(config.src)
    .pipe(concatCss('styles/main.css'))
    .pipe(cssnext(config.settings))
    .pipe(gulp.dest(config.dest))
    .pipe(connect.reload());
});
