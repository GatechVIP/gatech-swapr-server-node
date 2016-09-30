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
        res.should.have.status(201);
        res.body.token.should.equal('reirnb');
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
        res.should.have.status(404);
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
        res.should.have.status(404);
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
        res.should.have.status(400);
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
        res.should.have.status(400);
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
        res.should.have.status(400);
        done();
      });
  })

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
        res.should.have.status(400);
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
        res.should.have.status(400);
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
        res.should.have.status(400);
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
        res.should.have.status(400);
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
        res.should.have.status(400);
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
        res.should.have.status(400);
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
        res.should.have.status(400);
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
        res.should.have.status(400);
        done();
      });
  });

  it ('should return information about all courses and which students are taking them', function(done) {
    request(url)
      .get("/courses")
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.length.should.equal(4);
        res.body[0].id.should.equal(1);
        res.body[0].name.should.equal("course0");
        res.body[0].active.should.equal(true);
        res.body[0].year.should.equal(2015);
        res.body[0].semester.should.equal("spring")
        res.body[0].students.length.should.equal(2);
        res.body[0].students[0].should.equal(1);
        res.body[0].students[1].should.equal(2);
        res.body[1].id.should.equal(2);
        res.body[1].name.should.equal("course1");
        res.body[1].active.should.equal(true);
        res.body[1].year.should.equal(2015);
        res.body[1].semester.should.equal("spring")
        res.body[1].students.length.should.equal(2);
        res.body[1].students[0].should.equal(2);
        res.body[1].students[1].should.equal(3);
        res.body[2].id.should.equal(3);
        res.body[2].name.should.equal("course2");
        res.body[2].active.should.equal(true);
        res.body[2].year.should.equal(2015);
        res.body[2].semester.should.equal("spring")
        res.body[2].students.length.should.equal(1);
        res.body[2].students[0].should.equal(3);
        res.body[3].id.should.equal(4);
        res.body[3].name.should.equal("course3");
        res.body[3].active.should.equal(true);
        res.body[3].year.should.equal(2015);
        res.body[3].semester.should.equal("spring")
        res.body[3].students.length.should.equal(1);
        res.body[3].students[0].should.equal(4);
        done();
      })
  });
});
