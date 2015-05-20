var gulp  = require('gulp');
	fn    = require('../build-fn.js'),
	fs    = require('fs'),
	path  = require('path'),
	jade  = require('jade'),
	gJade  = require('gulp-jade'),
	gutil = require('../../../node_modules/gulp/node_modules/gulp-util'),
	_     = require('lodash'),
	img   = require('../../plugins/imageHandler');

var params = fn.parseCliKeys();
var project = (params != null)
	? params.project || params.p || params[Object.keys(params)[0]]
	: fn.getLatestProject();

var dir = {
	work: path.join(process.cwd(), '/letters/source/', project),
	dest: path.join(process.cwd(), '/letters/build/', project)

};

module.exports = function() {
	var locals = _.merge(
		require(path.join(dir.work,'config.json')),
		require(path.join(process.cwd(), 'core/plugins/jadeBuilder/functions.js'))

	);
	locals.html = jade.compileFile(
		path.join(dir.work, '/body.jade'),
		{
			pretty: true
		}

	)(locals);

	gulp.src(path.join(process.cwd(), 'core/body.jade'))
		.pipe(
			gJade({
				pretty: true,
				locals: locals}))
		.pipe(
			gulp.dest(
				dir.dest));
};
