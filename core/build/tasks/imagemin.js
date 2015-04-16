var gulp = require('gulp');
var fn   = require('../build-fn.js')();
var path = require('path');
var imagemin = require('gulp-imagemin');
var gutil   = require('../../../node_modules/gulp/node_modules/gulp-util');
var pngquant = require('imagemin-pngquant');
var params = fn.parseCliKeys();
var project = (params != null)
	? params.project || params.p || params[Object.keys(params)[0]]
	: fn.getLatestProject();

var workDir = path.join('letters/source/', project);

module.exports = function() {
	gulp.src(path.join(workDir, '/images/**/*.(svg|jpg|jpeg|png|gif)'))
		.pipe(
			imagemin({
				progressive: true,
				svgoPlugins: [{removeViewBox: false}],
				use: [pngquant()]

			})

		)
		.pipe(gulp.dest(path.join('letters/build/', project)));

};