var express    = require('express'),
    router     = express.Router(),

    fs         = require('fs'),
    join       = require('path').join,
    formidable = require('formidable');

    Asset      = require('../models/asset.js');

/* GET home page. */
router.get('/', function (req, res) {
  Asset.fetchAll(function (assets) {
    res.render('assets', { assets: assets });
  });
});

router.get('/new', function (req, res) {
  res.render('assets/new', {});
});

router.post('/', function (req, res) {
  var dir = join(__dirname, '/../public/images');

  var form = new formidable.IncomingForm();
  form.uploadDir = __dirname + "/../tmp";
  form.parse(req, function(err, fields, files) {
    var img   = files.file;
    var url   = '/images/' + img.name;
    var title = fields.title || img.name;
    var path  = join(dir, img.name);

    fs.rename(img.path, path, function (err) {
      if (err) return next(err);

      Asset.create({
        title: title,
        url:   url
      }, function (err) {
        if (err) return next(err);
        res.redirect('/assets');
      });
    });
  });
});

module.exports = router;
