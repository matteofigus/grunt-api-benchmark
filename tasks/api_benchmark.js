/*
 * grunt-api-benchmark
 * https://github.com/matteofigus/grunt-api-benchmark
 *
 * Copyright (c) 2013 Matteo Figus
 * Licensed under the MIT license.
 */

'use strict';


var apiBenchmark = require('api-benchmark');
var giveMe = require('give-me');

var GruntApiBenchmarks = function(grunt){
  
  var _ = grunt.util._;
  var path = require('path');

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
      grunt.log.writeln('Performing benchmarks for file: ' + inputFile.src);
      var input = this.getJSON(inputFile);
      apiBenchmark.measure(input.service, input.endpoints, input.options, function(err, results){

        if(err && input.options.stopOnError !== false)
          return callback(err, null);
        else
          callback(null, results);
      });
    },
    saveOutput: function(output, outputFileName){

      if(this.getOutputType(outputFileName) == 'html'){
        var template = grunt.file.read(path.join(__dirname, 'template.html'));
        var templateWithData = template.replace("{{ data }}", JSON.stringify({
          benchmark: output, 
          info: {
            date: new Date(),
            apiName: _.keys(output)[0]
          }
        }));
                               
        grunt.file.write(outputFileName, templateWithData.replace(/\n/g, ''));
      } else
        grunt.file.write(outputFileName, JSON.stringify(output));
      
      grunt.log.writeln('File "' + outputFileName.cyan + '" created.');     
    }
  });
};

module.exports = function(grunt) {

  var gruntApiBenchmarks = new GruntApiBenchmarks(grunt);
  var _ = grunt.util._;

  var benchmarkFile = function(inputFile, destFile, callback){
    gruntApiBenchmarks.performBenchmark(inputFile, function(err, output){
      if(err){
        grunt.log.error(err);
        return callback();
      }

      gruntApiBenchmarks.saveOutput(output, destFile);
      callback();
    });
  };

  grunt.registerMultiTask('api_benchmark', 'A grunt plugin that runs a series of benchmark tests and creates an html report', function() {

    var done = this.async(),
        options = this.options({}),
        params = _.map(this.files, function(file){ return [file, options.output + '/' + file.dest]; });

    giveMe.sequence(_.bind(benchmarkFile, this), params, done);

  });
};
