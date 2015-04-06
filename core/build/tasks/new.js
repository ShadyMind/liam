var fs = require('fs');
var fn = require('../build-fn.js')();
var path = require('path');
var _ = require('lodash');
var inquirer = require('inquirer');

var createLetter = function(project) {
  fn.writeLetterFile(project, [
    {
      file: 'index.jade',
      content: '//- INITIAL LETTER BODY MARKUP'
    },
    {
      file: 'config.json',
      content: _.template( JSON.stringify( require('../config.js'),null,'\t' ) )(fn.sliceProjectName(project))
    }
  ]);

};

module.exports = function() {
  var args = process.argv.slice(3);
  var project = args[0];
  if (args.length < 1) {
    inquirer.prompt(
      [{
        type: "input",
        name: "project",
        message: "Enter name of new project",
        validate: function(value) { return value.length > 0; }

      }],
      function(result) {

        createLetter(result.project);
      }

    );
  } else {
    createLetter(project);

  }
};
