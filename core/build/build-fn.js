var path = require('path');
var _ = require('lodash');
var fs = require('fs');

module.exports = function () {
    return {
        loadGulpTask: function loadGulpTask(name) {
            var path = require('path');
            return require(path.join(process.cwd(), 'core/build/tasks/' + name + '.js'))();

        },

        writeLetterFile: function(project, files) {
            function writeFile(file, content) {
                fs.writeFile('./letters/source/' + project + '/'  + file, content, function(err) {
                    if (err) return new Error('can`t create ' + file + ' file');
                });
            }

            fs.lstat('./letter/source/' + project, function(err, stats) {
                if (err) {
                    fs.mkdir('./letters/source/' + project, function(err) {
                        fs.mkdir('./letters/source/' + project + '/assets', function(err) {
                            if (err) console.log(err);
                        });
                        _(files).forEach(function(unit) {
                            writeFile(unit.file, unit.content);

                        }).value();
                    });
                } else {
                    writeFile(project);
                }
            });
        },

        getProject: function (project) {
            if (project) {
                return project;
            } else {
                fs.readdir('./letters/source/', function (err, files) {
                    if (err) gutil.log(err);
                    var lastModified = '', project = '';
                    _(files).forEach(function (unit) {
                        fs.stat('./letters/source/' + unit, function (err, stats) {
                            if (lastModified < stats.mtime) {
                                lastModified = stats.mtime;
                                project = unit;
                            }
                        });
                    }).value();

                    return project;
                });
            }
        },

        sliceProjectName: function(project) {
            var sliced = {};

            project = (project.match('-'))
                ? project.split('-')
                :[project];

            sliced['mod'] = project[1]||false;
            sliced['amb'] = project[0].split(/[\d]{1,5}/)[0];
            sliced['id'] = project[0].split(/[a-z]{1,5}/)[1];
            return sliced;
        }

    };

};