process.env.NODE_ENV = 'test';

var app     = require('../../app'),
    http    = require('http'),
    Browser = require('zombie'),
    expect  = require('chai').expect;

describe('My Assets page', function () {
  before(function () {
    this.server  = http.createServer(app).listen(3001);
    this.browser = new Browser({site: 'http://localhost:3001'});
  });

  before(function (done) {
    this.browser.visit('/', done);
  });

  it("is successful", function () {
    expect(true).to.be.true;
  });

  it("displays all the user's assets", function () {
    expect(this.browser.queryAll('.asset').length).to.eql(5);
  });

  after(function (done) {
    this.server.close(done);
  });
});
