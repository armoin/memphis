var express      = require('express'),
    bodyParser   = require('body-parser'),
    app          = express(),

    nano         = require('nano')('http://localhost:5984'),
    db           = nano.db.use('memphis_test_api');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/assets', function (req, res, next) {
  db.list({include_docs: true}, function (err, body) {
    var assets = body.rows
      .map(function (row) { return row.doc })
      .filter(function (doc) { return doc.type === 'Asset' });
    res.write(JSON.stringify(assets))
    res.end();
  });
});

app.post('/assets', function (req, res, next) {
  db.insert(req.body.asset, function (err, body) {
    res.send(body);
    res.end();
  });
});

app.post('/createdb', function (req, res, next) {
  nano.db.create('memphis_test_api', function (err, body) {
    res.send(body);
    res.end();
  });
});

app.delete('/dropdb', function (req, res, next) {
  nano.db.destroy('memphis_test_api', function (err, body) {
    res.send(body);
    res.end();
  });
});

// app.listen(9393, function () { console.log('Running ...') });
module.exports = app;
