var gulp = require('gulp');
var fn = require('./build-fn.js')();

module.exports = function() {
  gulp.task('default', function() { console.log('Welcome to Liam framework'); });
  gulp.task('new', fn.loadGulpTask('new'));
  gulp.task('session', fn.loadGulpTask('session'));

};