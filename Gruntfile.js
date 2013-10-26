/*
 * grunt-api-benchmark
 * https://github.com/matteofigus/grunt-api-benchmark
 *
 * Copyright (c) 2013 Matteo Figus
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    api_benchmark: {
      default_options: {
        options: {
          output: 'tmp'
        },
        files: {
          'output.json': 'test/fixtures/input.json',
          'output.html': 'test/fixtures/input.json'
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'api_benchmark', 'nodeunit']);

  // By default, run all tests.
  grunt.registerTask('default', ['test']);

};
