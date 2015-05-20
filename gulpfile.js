debug = true;
var gulp        = require('gulp');
var fn          = require('./core/build/build-fn.js');
var gutil       = require('./node_modules/gulp/node_modules/gulp-util');
require.dir     = require('require-dir');
require.task    = fn.loadGulpTask;

gulp.task('default', function() {
	//gulp.src('invite').pipe(console.log(this));
	gutil.log('=================================');
	gutil.log('*** Welcome to Liam framework ***');
	gutil.log('=================================');
});


gulp.task('new', require.task('new'));
gulp.task('imagemin', require.task('imagemin'));
gulp.task('jade', require.task('jade'));
gulp.task('compile', ['jade', 'imagemin']);
gulp.task('session', ['compile'], require.task('session'));

