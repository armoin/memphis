var express    = require('express'),
    router     = express.Router(),

    Asset      = require('../models/asset.js');

/* GET home page. */
router.get('/', function (req, res) {
  Asset.fetchAll(function (assets) {
    res.render('index', { assets: assets });
  });
});

module.exports = router;
