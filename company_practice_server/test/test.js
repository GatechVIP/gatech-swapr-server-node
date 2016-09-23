var should = require('should');
var assert = require('assert');
var request = require('supertest');

var url = 'http://localhost:3000';

describe('Food', function() {

  it('should return right items for Chicken category', function(done) {
    request(url)
      .get('/api/food/category/Chicken')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        }
        res.body.length.should.equal(6);
        done();
      })
  });

  it('should return right items for Vegetarian category', function(done) {
    request(url)
      .get('/api/food/category/Vegetarian')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        }
        res.body.length.should.equal(8);
        done();
      })
  });

  it('should return right items for Noodles category', function(done) {
    request(url)
      .get('/api/food/category/Noodles')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        }
        res.body.length.should.equal(6);
        done();
      })
  });

  it('should return right items for Rice category', function(done) {
    request(url)
      .get('/api/food/category/Rice')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        }
        res.body.length.should.equal(4);
        done();
      })
  });

  it('should return right items for Curries category', function(done) {
    request(url)
      .get('/api/food/category/Curries')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        }
        res.body.length.should.equal(4);
        done();
      })
  });

  it('should return the correct food item for a specific item ID', function(done) {
    request(url)
      .get('/api/food/5732270a7da77086e3e4b6f3')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        }
        res.body.name.should.equal("Chicken Tikka Masala");
        res.body._id.should.equal('5732270a7da77086e3e4b6f3');
        done();
      })
  })
});

describe('Orders', function() {
  it('should return the right amount of total orders', function(done) {
    request(url)
      .get('/api/order')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        }
        res.body.length.should.equal(5);
        done();
      });
  });

  it('should return the right number of orders belonging to a particular user', function(done) {
    request(url)
      .get('/api/order/user/57d7777e3d77b98509833151')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        }
        res.body.length.should.equal(3);
        done();
      })
  });

  it('should return an individual order when supplied an order ID', function(done) {
    request(url)
      .get('/api/order/57d778453d77b98509833155')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        }
        res.body._id.should.equal("57d778453d77b98509833155");
        res.body.userId.should.equal("57d7777e3d77b98509833151");
        res.body.cost.should.equal(34.62);
        res.body.items.length.should.equal(2);
        done();
      })
  });

  /*it('should close an order when specified', function(done) {
    request(url)
      .put('/api/order/57d778453d77b98509833155')
      .send({ "isSatisfied": true })
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        }
        res.body._id.should.equal("57d778453d77b98509833155");
        res.body.userId.should.equal("57d7777e3d77b98509833151");
        res.body.cost.should.equal(34.62);
        res.body.items.length.should.equal(2);
        res.body.isSatisfied.should.equal(true);
        done();
      })
  });*/
});
