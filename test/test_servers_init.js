'use strict';

var giveMe = require('give-me');
var grunt = require('grunt');
var path = require('path');
var TestServers = require('http-test-servers');
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
      var servers = new TestServers(endpoints, servers);
      servers.start(function(httpTestServers){
        testServers = httpTestServers;
        callback();
      });
    };

    giveMe.all(initServer, [[input1.endpoints, server1], [input2.endpoints, server2]], function(servers){ 
      testServers = servers;
      test.ok(true);
      test.done();
    });

  }
};