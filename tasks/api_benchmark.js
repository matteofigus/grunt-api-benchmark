/*
 * grunt-api-benchmark
 * https://github.com/matteofigus/grunt-api-benchmark
 *
 * Copyright (c) 2013 Matteo Figus
 * Licensed under the MIT license.
 */

'use strict';

var apiBenchmark = require('./lib/index');


var Utils = function(grunt){
  
  var _ = grunt.util._;

  return _.extend(this, {
    getOutputType: function(fileName){
      var extensionIndex = fileName.lastIndexOf("."),
          fileHasExtension = extensionIndex >= 0,
          fileExtension = fileHasExtension ? fileName.substr(extensionIndex + 1).toLowerCase() : 'json';

      return (fileExtension == 'html' || fileExtension == 'htm') ? 'html' : 'json';
    },
    getJSON: function(file){

      var inputPath = file.src.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else
          return true;
      });

      return grunt.file.readJSON(inputPath);      
    },
    performBenchmark: function(inputFile, callback){
      apiBenchmark.misure(this.getJSON(inputFile), callback);
    },
    saveOutput: function(output, outputFileName){

      if(this.getOutputType(outputFileName) == 'html')
        grunt.file.write(outputFileName, 'html output');
      else
        grunt.file.write(outputFileName, JSON.stringify(output));
      
      grunt.log.writeln('File "' + outputFileName.cyan + '" created.');     
    }
  });
};

var gruntTask = function(grunt) {

  var utils = new Utils(grunt);

  grunt.registerMultiTask('api_benchmark', 'A grunt plugin that runs a series of benchmark tests and creates an html report', function() {

    var options = this.options({});

    this.files.forEach(function(file) {

      (function(inputfile, destFile){
        utils.performBenchmark(file, function(output){
          utils.saveOutput(output, destFile);
        });
      }(file, options.output + '/' + file.dest));

    });
  });
};

module.exports = gruntTask;
