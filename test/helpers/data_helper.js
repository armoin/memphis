var request = require("request");

var DataHelper = {
  createDatabase: function(callback) {
    request({uri: "http://localhost:9393/createdb", method: "POST"}, callback);
  },

  addAssets: function (assets, callback) {
    var counter = 0;
    assets.forEach(function (asset) {
      asset.type = "Asset";
      addDocument('assets', {asset: asset}, function () {
        counter++;
        if (counter == assets.length) { callback() }
      });
    });
  },

  dropDatabase: function (callback) {
    request({uri: "http://localhost:9393/dropdb", method: "DELETE"}, callback);
  }
};

var addDocument = function (type, doc, callback) {
  request({uri: "http://localhost:9393/" + type, method: "POST", form: doc}, callback);
};


module.exports = DataHelper;
