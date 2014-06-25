process.env.NODE_ENV = 'test';

var DataHelper = require('../../helpers/data_helper.js'),
    expect     = require('chai').expect;

describe('My Assets page', function () {
  describe('GET /assets', function () {
    beforeEach(function (done) {
      DataHelper.createDatabase(done);
    });

    afterEach(function (done) {
      DataHelper.dropDatabase(done);
    });

    beforeEach(function (done) {
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

    beforeEach(function (done) {
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

    it('links to the new asset page', function () {
      this.browser.clickLink('.add-asset');
      expect(this.browser.location.pathname).to.eql('/assets/new');
    });
  });
});
