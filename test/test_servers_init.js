'use strict';

var giveMe = require('give-me');
var grunt = require('grunt');
var path = require('path');
var TestServers = require('./fixtures/test-servers');
var _ = grunt.util._;

var testServers, input;
var fixtures = path.join(__dirname, 'fixtures');

exports.testServers = { 
  init: function(test) {
    test.expect(1);

    var input1 = grunt.file.readJSON(path.join(fixtures, 'input1.json')),
        input2 = grunt.file.readJSON(path.join(fixtures, 'input2.json')),
        server1 = grunt.file.readJSON(path.join(fixtures, 'server1.json')),
        server2 = grunt.file.readJSON(path.join(fixtures, 'server2.json'));

    var initServer = function(endpoints, servers, callback){
      var testServer = new TestServers(endpoints, servers, callback);
    };

    giveMe.all(initServer, [[input1.endpoints, [server1]], [input2.endpoints, [server2]]], function(servers){ 
      testServers = servers;
      test.ok(true);
      test.done();
    });

  }/*,
  tearDown: function(done){
    giveMe.all(_.map(testServers, function(testServer){ return testServer.kill; }), done);
  }*/
};