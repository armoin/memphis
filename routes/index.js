var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  var assets = [
    {title: 'Cathedral',      url: '/images/st_giles.jpg'},
    {title: 'Tattoo',         url: '/images/tattoo.jpg'},
    {title: 'Palace',         url: '/images/palace.jpg'},
    {title: "Arthur's Seat",  url: '/images/meadows.jpg'},
    {title: 'Castle',         url: '/images/castle.jpg'}
  ];
  res.render('index', { assets: assets });
});

module.exports = router;
