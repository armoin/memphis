var http = require('http');
var request = require("request");

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
  },

  create: function (asset, cb) {
    asset.type = "Asset";

    request({uri: "http://localhost:9393/assets", method: "POST", form: {asset: asset}}, cb);
  }
};

module.exports = Asset;
