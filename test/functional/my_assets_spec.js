process.env.NODE_ENV = 'test';

var app        = require('../../app'),
    api        = require('../../api'),
    DataHelper = require('../helpers/data_helper.js'),
    http       = require('http'),
    Browser    = require('zombie'),
    expect     = require('chai').expect;

describe('My Assets page', function () {
  before(function () {
    this.testAPI = http.createServer(api).listen(9393);
    this.server  = http.createServer(app).listen(3001);
    this.browser = new Browser({site: 'http://localhost:3001'});
  });

  before(function (done) {
    DataHelper.createDatabase(done);
  });

  after(function (done) {
    DataHelper.dropDatabase(done);
  });

  after(function (done) {
    this.server.close(done);
  });

  describe('GET list', function () {
    before(function (done) {
      var browser = this.browser;
      DataHelper.addAssets([
        {
          url: "/images/st_giles.jpg",
          title: "Cathedral"
        },
        {
          url: "/images/castle.jpg",
          title: "Castle"
        }
      ], done);
    });

    before(function (done) {
      this.browser.visit('/assets', done);
    });

    it("is successful", function () {
      expect(this.browser.statusCode).to.eql(200);
    });

    it("displays all the user's assets", function () {
      expect(this.browser.queryAll('.asset').length).to.eql(2);
    });

    describe('an asset', function () {
      beforeEach(function () {
        this.asset = this.browser.query('.asset');
      });

      it("has a title", function () {
        var title = this.asset.querySelector('.title').innerHTML;
        expect(title).to.equal('Cathedral');
      });

      it("has a image representing the asset", function () {
        var url = this.asset.querySelector('img').attributes.src.value;
        expect(url).to.equal('/images/st_giles.jpg');
      });

      it("has a link to more details", function () {
        var viewDetails = this.asset.querySelector('a.details');
        expect(viewDetails).not.to.be.null;
      });
    });
  });
});
