var apiBenchmark = require('api-benchmark');

module.exports = {
  misure: function(input, callback){
    apiBenchmark.misure(input.service, input.endpoints, input.options, callback);
  }
}