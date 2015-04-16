var gulp = require('gulp');
var fn   = require('../build-fn.js')();
var path = require('path');
var jade = require('gulp-jade');
var gutil   = require('../../../node_modules/gulp/node_modules/gulp-util');

var params = fn.parseCliKeys();
var project = (params != null)
	? params.project || params.p || params[Object.keys(params)[0]]
	: fn.getLatestProject();

var workDir = path.join('letters/source/', project);

module.exports = function() {
	gutil.log('Start new session for \'' + gutil.colors.cyan(project) + '\' project');
	gulp.watch(
		[
			path.join(workDir, 'body.jade'),
			path.join(workDir, 'config.jade'),
			path.join(workDir, '/images/**')
		],
		[
			'imagemin',
			'jade'
		]
	);

};