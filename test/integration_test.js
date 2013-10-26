'use strict';

var grunt = require('grunt');
var path = require('path');
var apiBenchmark = require('../tasks/lib/index');
var TestServers = require('./fixtures/test-servers');

var testServers, input;
var fixtures = path.join(__dirname, 'fixtures');

exports.integration = {
  setUp: function(done) {
    input = grunt.file.readJSON(path.join(fixtures, 'input.json'));
    var server = { name: "My api", port: 3006, delay: 200 };
    testServers = new TestServers(input.endpoints, [server], done);
  },
  tearDown: function(done){
    testServers.kill();
    done();
  },
  api_benchmark_should_correctly_perform_benchmarks: function(test) {
    test.expect(10);

    apiBenchmark.misure(input, function(results){
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
    });
  }
};