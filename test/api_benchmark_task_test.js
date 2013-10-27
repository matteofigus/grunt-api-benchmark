'use strict';

var grunt = require('grunt');
var path = require('path');

var inputDir = path.join(__dirname, 'fixtures');
var outputDir = path.join(__dirname, '../tmp');

exports.after_running_task = { 
  should_input_files_be_in_place: function(test) {
    test.expect(2);
    test.ok(grunt.file.exists(path.join(inputDir, 'input1.json')));
    test.ok(grunt.file.exists(path.join(inputDir, 'input2.json')));
    test.done();
  },
  should_the_output_files_be_produced: function(test) {
    test.expect(2);
    test.ok(grunt.file.exists(path.join(outputDir, 'output.json')));
    test.ok(grunt.file.exists(path.join(outputDir, 'output.html')));
    test.done();
  },
  should_json_output_file_contain_benchmark_stats: function(test){
    test.expect(10);

    var results = grunt.file.readJSON(path.join(outputDir, 'output.json'));

    test.notEqual(results, null);
    test.notEqual(results['My api'], null);
    test.notEqual(results['My api'].simpleRoute, null);
    test.notEqual(results['My api'].simpleRoute.stats, null);
    test.notEqual(results['My api'].secondaryRoute, null);
    test.notEqual(results['My api'].secondaryRoute.stats, null);
    test.notEqual(results['My api'].postRoute, null);
    test.notEqual(results['My api'].postRoute.stats, null);
    test.notEqual(results['My api'].deleteRoute, null);
    test.notEqual(results['My api'].deleteRoute.stats, null);

    test.done();    
  },
  should_html_output_file_contain_html: function(test){
    test.expect(2);

    var output = grunt.file.read(path.join(outputDir, 'output.html'));

    test.ok(/<html>(.*?)<\/html>/i.test(output));

    // data from benchmark
    test.ok(/<script>var data=(.*?)<\/script>/i.test(output));

    test.done();
  }
};