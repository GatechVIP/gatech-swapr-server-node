var should = require('should');
var assert = require('assert');
var request = require('supertest');

var url = 'http://localhost:3000';

describe('Auth Token', function() {
  it('should return a correct token when passed a correct username and password', function(done) {
    var reqBody = {
      "username": 'user_1',
      "password": 'a'
    };
    request(url)
      .post("/api-token-auth")
      .send(reqBody)
      .end(function(err, res) {
        if (err) {
          throw err;
        }
        res.status.should.be.exactly(201);
        //res.body.token.should.equal('reirnb');
        done();
      });
  });

  it ('should not return a token for a nonexistent user', function(done) {
    var reqBody = {
      "username": "user_5",
      "password": 'sl88d9'
    };
    request(url)
      .post("/api-token-auth")
      .send(reqBody)
      .end(function(err, res) {
        /*if (err) {
          throw err;
        }*/
        res.status.should.be.exactly(404);
        done();
      });
  });

  it ('should not return a token for an incorrect password', function(done) {
    var reqBody = {
      "username": "user_1",
      "password": 'slatdc41a'
    };
    request(url)
      .post("/api-token-auth")
      .send(reqBody)
      .end(function(err, res) {
        /*if (err) {
          throw err;
        }*/
        res.status.should.be.exactly(404);
        done();
      });
  });

  it ('should not return a token for a blank username and password', function(done) {
    var reqBody = {
      "username": "",
      "password": ""
    };
    request(url)
      .post("/api-token-auth")
      .send(reqBody)
      .end(function(err, res) {
        /*if (err) {
          throw err;
        }*/
        res.status.should.be.exactly(400);
        done();
      });
  });

  it ("should not return a token for providing no password", function(done) {
    var reqBody = {
      "username": "user_1",
      "password": ""
    };
    request(url)
      .post("/api-token-auth")
      .send(reqBody)
      .end(function(err, res) {
        /*if (err) {
          throw err;
        }*/
        res.status.should.be.exactly(400);
        done();
      });
  });

  it ("should not return a token for providing no username", function(done) {
    var reqBody = {
      "username": "",
      "password": 'sl88d9'
    };
    request(url)
      .post("/api-token-auth")
      .send(reqBody)
      .end(function(err, res) {
        /*if (err) {
          throw err;
        }*/
        res.status.should.be.exactly(400);
        done();
      });
  });

  it ('should not allow any kind of access for entering an inappropriate data type for username (test 1)', function(done) {
    var reqBody = {
      "username": ["user_1", "user_2", "user_3", "user_4"],
      "password": 'sl88d9'
    };
    request(url)
      .post("/api-token-auth")
      .send(reqBody)
      .end(function(err, res) {
        /*if (err) {
          throw err;
        }*/
        res.status.should.be.exactly(400);
        done();
      });
  });

  it ('should not allow any kind of access for entering an inappropriate data type for username (test 2)', function(done) {
    var reqBody = {
      "username": 93127490265012,
      "password": 'sl88d9'
    };
    request(url)
      .post("/api-token-auth")
      .send(reqBody)
      .end(function(err, res) {
        /*if (err) {
          throw err;
        }*/
        res.status.should.be.exactly(400);
        done();
      });
  });

  it ('should not allow any kind of access for entering an inappropriate data type for username (test 3)', function(done) {
    var reqBody = {
      "username": true,
      "password": 'sl88d9'
    };
    request(url)
      .post("/api-token-auth")
      .send(reqBody)
      .end(function(err, res) {
        /*if (err) {
          throw err;
        }*/
        res.status.should.be.exactly(400);
        done();
      });
  });

  it ('should not allow any kind of access for entering an inappropriate data type for username (test 4)', function(done) {
    var reqBody = {
      "username": {},
      "password": 'sl88d9'
    };
    request(url)
      .post("/api-token-auth")
      .send(reqBody)
      .end(function(err, res) {
        /*if (err) {
          throw err;
        }*/
        res.status.should.be.exactly(400);
        done();
      });
  });

  it ('should not allow any kind of access for entering an inappropriate data type for password (test 1)', function(done) {
    var reqBody = {
      "username": "user_1",
      "password": ["sl88d9", 'j7jwtsdf', 'qrwefag', 'f23q5th']
    };
    request(url)
      .post("/api-token-auth")
      .send(reqBody)
      .end(function(err, res) {
        /*if (err) {
          throw err;
        }*/
        res.status.should.be.exactly(400);
        done();
      });
  });

  it ('should not allow any kind of access for entering an inappropriate data type for password (test 2)', function(done) {
    var reqBody = {
      "username": "user_1",
      "password": 61209837480921
    };
    request(url)
      .post("/api-token-auth")
      .send(reqBody)
      .end(function(err, res) {
        /*if (err) {
          throw err;
        }*/
        res.status.should.be.exactly(400);
        done();
      });
  });

  it ('should not allow any kind of access for entering an inappropriate data type for password (test 3)', function(done) {
    var reqBody = {
      "username": "user_1",
      "password": true
    };
    request(url)
      .post("/api-token-auth")
      .send(reqBody)
      .end(function(err, res) {
        /*if (err) {
          throw err;
        }*/
        res.status.should.be.exactly(400);
        done();
      });
  });

  it ('should not allow any kind of access for entering an inappropriate data type for password (test 4)', function(done) {
    var reqBody = {
      "username": "user_1",
      "password": {}
    };
    request(url)
      .post("/api-token-auth")
      .send(reqBody)
      .end(function(err, res) {
        /*if (err) {
          throw err;
        }*/
        res.status.should.be.exactly(400);
        done();
      });
  });
});
