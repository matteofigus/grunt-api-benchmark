/*
 * grunt-api-benchmark
 * https://github.com/matteofigus/grunt-api-benchmark
 *
 * Copyright (c) 2013-2014 Matteo Figus
 * Licensed under the MIT license.
 */

'use strict';

var apiBenchmark = require('api-benchmark');
var giveMe = require('give-me');
var path = require('path');
var _ = require('underscore');

var GruntApiBenchmarks = function(grunt){

  return _.extend(this, {
    getOutputType: function(fileName){
      var extensionName = path.extname(fileName).toLowerCase();
      return (extensionName == '.html' || extensionName == '.htm') ? 'html' : 'json';
    },
    getJSON: function(file){
      var inputPath = file.src.filter(function(filepath) {
        var exists = grunt.file.exists(filepath);

        if(!exists)
          grunt.log.warn('Source file "' + filepath + '" not found.');

        return exists;
      });

      return grunt.file.readJSON(inputPath);      
    },
    performBenchmark: function(inputFile, callback){
      grunt.log.writeln('Performing benchmarks for file: ' + inputFile.src);
      var input = this.getJSON(inputFile);
      apiBenchmark.measure(input.service, input.endpoints, input.options, callback);
    },
    saveOutput: function(output, outputFileName, callback){
      if(this.getOutputType(outputFileName) === 'html'){
        apiBenchmark.getHtml(output, function(err, html){
          grunt.file.write(outputFileName, html);
          grunt.log.writeln('File "' + outputFileName.cyan + '" created.');
          callback();   
        });                               
      } else {
        grunt.file.write(outputFileName, JSON.stringify(output));
        grunt.log.writeln('File "' + outputFileName.cyan + '" created.');   
        callback();  
      }
    }
  });
};

module.exports = function(grunt) {

  var gruntApiBenchmarks = new GruntApiBenchmarks(grunt);

  var benchmarkFile = function(inputFile, destFiles, callback){
    gruntApiBenchmarks.performBenchmark(inputFile, function(err, output){

      if(output){
        var c = 0;
        _.forEach(destFiles, function(destFile){
          gruntApiBenchmarks.saveOutput(output, destFile, function(){
            c++;
            if(err){
              gruntApiBenchmarks.saveOutput(err, path.join(destFiles[0], '../errors.json'));
              grunt.fail.warn('Various errors. See errors.json for more details.');
              return callback();
            }

            if(c === destFiles.length)
              callback();
          });
        });
      }

    });
  };

  grunt.registerMultiTask('api_benchmark', 'A grunt plugin that runs a series of benchmark tests and creates an html report', function() {

    var done = this.async(),
        options = this.options({}),
        params = [],
        inputOutputs = {};

    _.forEach(this.files, function(file){
      if(!_.has(inputOutputs, file.src))
        inputOutputs[file.src] = [path.join(options.output, file.dest)];
      else
        inputOutputs[file.src].push(path.join(options.output, file.dest));
    });
    
    _.forEach(this.files, function(file){
      if(inputOutputs[file.src]){
        params.push([file, inputOutputs[file.src]]);
        inputOutputs[file.src] = null;
      }
    });

    giveMe.sequence(_.bind(benchmarkFile, this), params, done);
  });
};
