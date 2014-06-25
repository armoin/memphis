var app     = require('../../app'),
    api     = require('../../api'),
    http    = require('http'),
    Browser = require('zombie');

before(function () {
  console.log('setting up servers ...');
  this.testAPI = http.createServer(api).listen(9393);
  this.server  = http.createServer(app).listen(3001);
  this.browser = new Browser({site: 'http://localhost:3001'});
});

after(function (done) {
  console.log('shutting down servers ...');
  this.server.close(done);
  this.testAPI.close(done);
});

