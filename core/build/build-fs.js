module.exports = function()
{


  global.loadGulpTask = function loadGulpTask(name) {
    var path = require('path');
    return require(path.join(__dirname, 'core/build/tasks' + name + 'js'));
  };


};