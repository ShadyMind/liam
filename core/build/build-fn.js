var path = require('path');
var _ = require('lodash');
var fs = require('fs');

module.exports = {
    parseCliKeys: function(keys) {
        var cliData = null;
        var cliKeys = _.filter(keys||process.argv, function(unit) {
            return _.startsWith(unit, '-');

        });

        if (cliKeys.length > 0) {
            cliData = {};
            cliKeys = _.map(cliKeys, function (unit) {
                return _.trim(unit, '-');

            });

            _(cliKeys).forEach(function (unit) {
                if (unit.match('=')) {
                    unit = unit.split('=');
                    cliData[unit[0]] = unit[1];
                } else {
                    cliData[unit] = unit;
                }
            }).value();
        }

        return cliData;

    },

    getLatestProject: function() {
        var date = null;
        var name = null;
        var rootFolders = fs.readdirSync('letters');

        _(rootFolders).forEach(function(folder) {
            var folderMeta = fs.lstatSync(path.join('letters', folder));
            folderMeta['name'] = folder;

            if (date < folderMeta.mtime) {
                date = folderMeta.mtime;
                name = folderMeta.name;

            }

        }).value();

        var fileDate = null;
        var fileName = null;
        var latestFiles = fs.readdirSync(path.join('letters', name));

        _(latestFiles).forEach(function(file) {
            var fileMeta = fs.lstatSync(path.join('letters/', name, file));
            fileMeta['name'] = file;

            if (fileDate < fileMeta.mtime) {
                fileDate = fileMeta.mtime;
                fileName = fileMeta.name;

            }

        }).value();

        return fileName;

    },

    loadGulpTask: function loadGulpTask(name) {
        return require(path.join(process.cwd(), 'core/build/tasks/' + name + '.js'));

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