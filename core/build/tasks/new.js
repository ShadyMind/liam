var fs      = require('fs');
var fn      = require('../build-fn.js')();
var path    = require('path');
var _       = require('lodash');
var gulp    = require('gulp');
var prompt  = require('gulp-prompt');
var gutil   = require('../../../node_modules/gulp/node_modules/gulp-util');

module.exports = function(gulp) {
    var params = fn.parseCliKeys();
    var project = (params != null)
        ? params.project || params.p || params[Object.keys(params)[0]]
        : 'untitled';

    var dir = path.join(process.cwd(), './letters/source/' + project);
    var logDir = './letters/source/' + project;

    fs.lstat(dir, function(err) {
        if (err) {
            if (err.code === 'ENOENT') {
                gutil.log('Create new letter: \'' +  gutil.colors.cyan(logDir) + '\'.');
                fs.mkdirSync(err.path);

            }

        } else {
            gutil.log(gutil.colors.yellow('path \'') + logDir + gutil.colors.yellow('\' alredy exist.'));
            return false;

        }
        fs.lstat(path.join(dir, './config.json'), function(err) {
            if (err) {
                var content = JSON.stringify(require('../config.js'), null, 4);
                content = _.template(content)({
                    amb: project.split(/[0-9]{1,}/)[0],
                    id: project.split(/[A-z]{1,}/)[1] || 0

                });
                fs.writeFile(path.join(dir, './config.json'), content, function(err) {
                    if (err) console.trace(err);

                });

            }

        });
        fs.lstat(path.join(dir, './body.jade'), function(err) {
            if (err) {
                fs.writeFile(path.join(dir, './body.jade'), '', function(err) {
                    if (err) console.trace(err);

                });

            }

        });
        fs.lstat(path.join(dir, './images/'), function(err) {
            if (err) {
                fs.mkdir(path.join(dir, './images/'));

            }

        });

    });

    return false;
};