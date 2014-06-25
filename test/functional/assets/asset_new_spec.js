process.env.NODE_ENV = 'test';

var expect = require('chai').expect;

describe('GET /assets/new', function () {
  beforeEach(function (done) {
    this.browser.visit('/assets/new', done);
  });

  it('is successful', function () {
    expect(this.browser.statusCode).to.eql(200);
  });

  describe('form', function () {
  });
});

