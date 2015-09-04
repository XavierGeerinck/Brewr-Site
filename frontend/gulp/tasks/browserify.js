var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var connect = require('gulp-connect');
var sourcemaps = require('gulp-sourcemaps');
var config = require('../config').browserify;
var reactify = require('reactify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');

watchify.args.debug = config.debug;
watchify.args.options = { browserifyOptions: { debug: true }};

var transforms = [];
config.settings.transform.forEach(function(t) {
  transforms.push(t);
});

var bundler = watchify(browserify({
    entries: [ './src/js/index.js' ],
    debug: true,
    transform: [ babelify, reactify ]
}, watchify.args));

gulp.task('browserify', bundle);
bundler.on('update', bundle);
bundler.on('log', gutil.log);

function bundle() {
  return bundler.bundle()
  // log errors if they happen
  .on('error', gutil.log.bind(gutil, 'Browserify Error'))
  .pipe(source(config.outputName))
  .pipe(buffer()) // keeps in memory
  //.pipe(sourcemaps.init({ loadMaps: true }))
    // Add transforms here (such as uglify)
        .pipe(uglify())
  //.pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(config.dest))
  .pipe(connect.reload());
}
