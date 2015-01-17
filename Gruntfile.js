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
      tests: ['generated'],
    },

    // Configuration to be run (and then tested).
    api_benchmark: {
      default_options: {
        options: {
          output: 'generated'
        },
        files: {
          'output1.json': 'test/fixtures/input1.json',
          'output1.html': 'test/fixtures/input1.json',
          'output2.html': 'test/fixtures/input2.json'
        }
      }
    },

    // Unit tests.
    nodeunit: {
      testServersInit: ['test/test_servers_init.js'],
      tests: ['test/*_test.js']
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'nodeunit:testServersInit', 'api_benchmark', 'nodeunit:tests']);

  // By default, run all tests.
  grunt.registerTask('default', ['test']);

};
