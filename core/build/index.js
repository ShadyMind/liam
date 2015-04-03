require('./build.js');
var gulp = require('gulp');

module.exports = function() {
  gulp.task('default', loadGulpTask('default'));
  gulp.task('new', loadGulpTask('new'));
};