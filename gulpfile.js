debug = true;
var gulp        = require('gulp');
var fn          = require('./core/build/build-fn.js')();
var gutil       = require('./node_modules/gulp/node_modules/gulp-util');
require.dir     = require('require-dir');
require.task    = fn.loadGulpTask;

gulp.task('default', function() {
	gutil.log('Welcome to Liam framework');
});

gulp.task('new', require.task('new'));
gulp.task('imagemin', require.task('imagemin'));
gulp.task('compile', require.task('compile'));
gulp.task('session', require.task('session'));
