var gulp = require('gulp');
var fn   = require('../build-fn.js')();
var fs   = require('fs');
var path = require('path');
var jade = require('gulp-jade');
var gutil   = require('../../../node_modules/gulp/node_modules/gulp-util');

var params = fn.parseCliKeys();
var project = (params != null)
	? params.project || params.p || params[Object.keys(params)[0]]
	: fn.getLatestProject();

var dir = {
	work: path.join(process.cwd(), '/letters/source/', project),
	dest: path.join(process.cwd(), '/letters/build/', project)

};

module.exports = function() {
	gulp.src(path.join(dir.work, '/*.jade'))
		.pipe(jade())
		.pipe(gulp.dest(dir.dest));
};
