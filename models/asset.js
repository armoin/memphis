var http = require('http');

var Asset = {
  fetchAll: function (cb) {
    var options = {
      hostname: 'localhost',
      port:     9393,
      path:     '/assets',
      method:   'GET'
    };

    http.request(options, function (response) {
      var assets = '';

      response.on('data', function (chunk) {
        assets += chunk;
      });

      response.on('end', function () {
        cb(JSON.parse(assets));
      });
    }).end();
  }
};

module.exports = Asset;
