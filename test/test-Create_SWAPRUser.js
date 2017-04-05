var assert = require('assert');
var should = require('should');
var supertest = require('supertest');

var URL = 'http://localhost:3000';
var request = supertest(URL);

describe('Create SWAPRUser', function testCreateSWAPRUser() {

  it('returns username, first_name, last_name, and email when given valid input'
      + ' for those fields along with a password', function(done) {
    var requestBody = {
      "username": "user_7",
      "first_name": "User",
      "last_name": "Seven",
      "email": "test7@email.com",
      "password": "password7"
    };
    var expectedResponseBody = {
      "id": 7,
      "username": "user_7",
      "first_name": "User",
      "last_name": "Seven",
      "email": "test7@email.com"
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .expect(201, expectedResponseBody)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(function(err, res) {
        if (err) {
          return done(err);
        } else {
          done();
        }
      });
  });

  it('returns an error when a duplicate username is input', function(done) {
    var requestBody = {
      "username": "student1",
      "first_name": "Duplicate",
      "last_name": "Username",
      "email": "test1duplicate@email.com",
      "password": "password1duplicate"
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(function expectErrorResponse(err, res) {
        res.status.should.be.exactly(400);
        res.body.should.have.property('error', 'unable to create new user');
        done(err);
      });
  });

  it('returns an error when a duplicate email is input', function(done) {
    var requestBody = {
      "username": "user_8",
      "first_name": "Userman",
      "last_name": "Eight",
      "email": "aduncan37@gatech.edu",
      "password": "password8"
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(function expectErrorResponse(err, res) {
        res.status.should.be.exactly(400);
        res.body.should.have.property('error', 'unable to create new user');
        done(err);
      });
  });

  it('allows duplicate passwords', function(done) {
    var requestBody = {
      "username": "user_8",
      "first_name": "Userman",
      "last_name": "Eight",
      "email": "test8@email.com",
      "password": "password7"
    };
    var expectedResponseBody = {
      "id": 8,
      "username": "user_8",
      "first_name": "Userman",
      "last_name": "Eight",
      "email": "test8@email.com"
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .expect(201, expectedResponseBody)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(function(err, res) {
        if (err) {
          return done(err);
        } else {
          done();
        }
      });
  });

  it('allows duplicate first_names', function(done) {
    var requestBody = {
      "username": "user_9a",
      "first_name": "User",
      "last_name": "Nine",
      "email": "test9a@email.com",
      "password": "password9a"
    };
    var expectedResponseBody = {
      "id": 9,
      "username": "user_9a",
      "first_name": "User",
      "last_name": "Nine",
      "email": "test9a@email.com"
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .expect(201, expectedResponseBody)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(function(err, res) {
        if (err) {
          return done(err);
        } else {
          done();
        }
      });
  });

  it('allows duplicate last_names', function(done) {
    var requestBody = {
      "username": "user_9b",
      "first_name": "Bob",
      "last_name": "Nine",
      "email": "test9b@email.com",
      "password": "password9b"
    };
    var expectedResponseBody = {
      "id": 10,
      "username": "user_9b",
      "first_name": "Bob",
      "last_name": "Nine",
      "email": "test9b@email.com"
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .expect(201, expectedResponseBody)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(function(err, res) {
        if (err) {
          return done(err);
        } else {
          done();
        }
      });
  });

  it('requires that a username be provided', function(done) {
    var requestBody = {
      "username": "",
      "first_name": "Mister",
      "last_name": "Zero",
      "email": "test0@email.com",
      "password": "crocodile"
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(function expectErrorResponse(err, res) {
        res.status.should.be.exactly(400);
        res.body.should.have.property('error', 'unable to create new user');
        done(err);
      });
  });

  it('requires that a first_name be provided', function(done) {
    var requestBody = {
      "username": "user_0",
      "first_name": "",
      "last_name": "Zero",
      "email": "test0@email.com",
      "password": "crocodile"
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(function expectErrorResponse(err, res) {
        res.status.should.be.exactly(400);
        res.body.should.have.property('error', 'unable to create new user');
        done(err);
      });
  });

  it('requires that a last_name be provided', function(done) {
    var requestBody = {
      "username": "user_0",
      "first_name": "Mister",
      "last_name": "",
      "email": "test0@email.com",
      "password": "crocodile"
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(function expectErrorResponse(err, res) {
        res.status.should.be.exactly(400);
        res.body.should.have.property('error', 'unable to create new user');
        done(err);
      });
  });

  it('requires that an email address be provided', function(done) {
    var requestBody = {
      "username": "user_0",
      "first_name": "Mister",
      "last_name": "Zero",
      "email": "",
      "password": "crocodile"
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(function expectErrorResponse(err, res) {
        res.status.should.be.exactly(400);
        res.body.should.have.property('error', 'unable to create new user');
        done(err);
      });
  });

  it('requires that the email address input take the form of an email address',
    function(done) {
    var requestBody = {
      "username": "user_0",
      "first_name": "Mister",
      "last_name": "Zero",
      "email": "Not An Email Address",
      "password": "crocodile"
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(function expectErrorResponse(err, res) {
        res.status.should.be.exactly(400);
        res.body.should.have.property('error', 'unable to create new user');
        done(err);
      });
  });

  it('returns an error when given an empty password field', function(done) {
    var requestBody = {
      "username": "user_0",
      "first_name": "Mister",
      "last_name": "Zero",
      "email": "test0@email.com",
      "password": ""
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(function expectErrorResponse(err, res) {
        res.status.should.be.exactly(400);
        res.body.should.have.property('error', 'unable to create new user');
        done(err);
      });
  });

  it('does not accept numerical values as inputs for username', function(done) {
    var requestBody = {
      "username": 0,  //"SAH1_OF_USERNAME"
      "first_name": "Mister",
      "last_name": "Zero",
      "email": "test0@email.com",
      "password": "crocodile"
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(function expectErrorResponse(err, res) {
        res.status.should.be.exactly(400);
        res.body.should.have.property('error', 'unable to create new user');
        done(err);
      });
  });

  it('does not accept boolean values as inputs for username', function(done) {
    var requestBody = {
      "username": false,
      "first_name": "Mister",
      "last_name": "Zero",
      "email": "test0@email.com",
      "password": "crocodile"
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(function expectErrorResponse(err, res) {
        res.status.should.be.exactly(400);
        res.body.should.have.property('error', 'unable to create new user');
        done(err);
      });
  });

  it('does not accept arrays as inputs for username', function(done) {
    var requestBody = {
      "username": ["array", "of", "strings"],
      "first_name": "Mister",
      "last_name": "Zero",
      "email": "test0@email.com",
      "password": "crocodile"
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(function expectErrorResponse(err, res) {
        res.status.should.be.exactly(400);
        res.body.should.have.property('error', 'unable to create new user');
        done(err);
      });
  });

  it('does not accept numerical values as inputs for first_name', function(done) {
    var requestBody = {
      "username": "user_0",
      "first_name": 0,
      "last_name": "Zero",
      "email": "test0@email.com",
      "password": "crocodile"
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(function expectErrorResponse(err, res) {
        res.status.should.be.exactly(400);
        res.body.should.have.property('error', 'unable to create new user');
        done(err);
      });
  });

  it('does not accept boolean values as inputs for first_name', function(done) {
    var requestBody = {
      "username": "user_0",
      "first_name": true,
      "last_name": "Zero",
      "email": "test0@email.com",
      "password": "crocodile"
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(function expectErrorResponse(err, res) {
        res.status.should.be.exactly(400);
        res.body.should.have.property('error', 'unable to create new user');
        done(err);
      });
  });

  it('does not accept arrays as inputs for first_name', function(done) {
    var requestBody = {
      "username": "user_0",
      "first_name": ["array", "of", "strings"],
      "last_name": "Zero",
      "email": "test0@email.com",
      "password": "crocodile"
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(function expectErrorResponse(err, res) {
        res.status.should.be.exactly(400);
        res.body.should.have.property('error', 'unable to create new user');
        done(err);
      });
  });

  it('does not accept numerical values as inputs for last_name', function(done) {
    var requestBody = {
      "username": "user_0",
      "first_name": "Mister",
      "last_name": 0,
      "email": "test0@email.com",
      "password": "crocodile"
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(function expectErrorResponse(err, res) {
        res.status.should.be.exactly(400);
        res.body.should.have.property('error', 'unable to create new user');
        done(err);
      });
  });

  it('does not accept boolean values as inputs for last_name', function(done) {
    var requestBody = {
      "username": "user_0",
      "first_name": "Mister",
      "last_name": true,
      "email": "test0@email.com",
      "password": "crocodile"
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(function expectErrorResponse(err, res) {
        res.status.should.be.exactly(400);
        res.body.should.have.property('error', 'unable to create new user');
        done(err);
      });
  });

  it('does not accept arrays as inputs for last_name', function(done) {
    var requestBody = {
      "username": "user_0",
      "first_name": "Mister",
      "last_name": ["array", "of", "strings"],
      "email": "test0@email.com",
      "password": "crocodile"
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(function expectErrorResponse(err, res) {
        res.status.should.be.exactly(400);
        res.body.should.have.property('error', 'unable to create new user');
        done(err);
      });
  });

  it('does not accept numerical values as inputs for email', function(done) {
    var requestBody = {
      "username": "user_0",
      "first_name": "Mister",
      "last_name": "Zero",
      "email": 0,
      "password": "crocodile"
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(function expectErrorResponse(err, res) {
        res.status.should.be.exactly(400);
        res.body.should.have.property('error', 'unable to create new user');
        done(err);
      });
  });

  it('does not accept boolean values as inputs for email', function(done) {
    var requestBody = {
      "username": "user_0",
      "first_name": "Mister",
      "last_name": "Zero",
      "email": false,
      "password": "crocodile"
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(function expectErrorResponse(err, res) {
        res.status.should.be.exactly(400);
        res.body.should.have.property('error', 'unable to create new user');
        done(err);
      });
  });

  it('does not accept arrays as inputs for email', function(done) {
    var requestBody = {
      "username": "user_0",
      "first_name": "Mister",
      "last_name": "Zero",
      "email": ["array", "of", "strings"],
      "password": "crocodile"
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(function expectErrorResponse(err, res) {
        res.status.should.be.exactly(400);
        res.body.should.have.property('error', 'unable to create new user');
        done(err);
      });
  });

  it('does not accept numerical values as inputs for password', function(done) {
    var requestBody = {
      "username": "user_0",
      "first_name": "Mister",
      "last_name": "Zero",
      "email": "test0@email.com",
      "password": 0
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(function expectErrorResponse(err, res) {
        res.status.should.be.exactly(400);
        res.body.should.have.property('error', 'unable to create new user');
        done(err);
      });
  });

  it('does not accept boolean values as inputs for password', function(done) {
    var requestBody = {
      "username": "user_0",
      "first_name": "Mister",
      "last_name": "Zero",
      "email": "test0@email.com",
      "password": true
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(function expectErrorResponse(err, res) {
        res.status.should.be.exactly(400);
        res.body.should.have.property('error', 'unable to create new user');
        done(err);
      });
  });

  it('does not accept arrays as inputs for password', function(done) {
    var requestBody = {
      "username": "user_0",
      "first_name": "Mister",
      "last_name": "Zero",
      "email": "test0@email.com",
      "password": ["array", "of", "strings"]
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(function expectErrorResponse(err, res) {
        res.status.should.be.exactly(400);
        res.body.should.have.property('error', 'unable to create new user');
        done(err);
      });
  });

  it('does not allow username to be undefined', function(done) {
    var requestBody = {
      "first_name": "Mister",
      "last_name": "Zero",
      "email": "test0@email.com",
      "password": ["array", "of", "strings"]
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(function expectErrorResponse(err, res) {
        res.status.should.be.exactly(400);
        res.body.should.have.property('error', 'unable to create new user');
        done(err);
      });
  });

  it('does not allow first_name to be undefined', function(done) {
    var requestBody = {
      "username": "user_0",
      "last_name": "Zero",
      "email": "test0@email.com",
      "password": ["array", "of", "strings"]
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(function expectErrorResponse(err, res) {
        res.status.should.be.exactly(400);
        res.body.should.have.property('error', 'unable to create new user');
        done(err);
      });
  });

  it('does not allow last_name to be undefined', function(done) {
    var requestBody = {
      "username": "user_0",
      "first_name": "Mister",
      "email": "test0@email.com",
      "password": ["array", "of", "strings"]
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(function expectErrorResponse(err, res) {
        res.status.should.be.exactly(400);
        res.body.should.have.property('error', 'unable to create new user');
        done(err);
      });
  });

  it('does not allow email to be undefined', function(done) {
    var requestBody = {
      "username": "user_0",
      "first_name": "Mister",
      "last_name": "Zero",
      "password": ["array", "of", "strings"]
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(function expectErrorResponse(err, res) {
        res.status.should.be.exactly(400);
        res.body.should.have.property('error', 'unable to create new user');
        done(err);
      });
  });

  it('does not allow password to be undefined', function(done) {
    var requestBody = {
      "username": "user_0",
      "first_name": "Mister",
      "last_name": "Zero",
      "email": "test0@email.com"
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(function expectErrorResponse(err, res) {
        res.status.should.be.exactly(400);
        res.body.should.have.property('error', 'unable to create new user');
        done(err);
      });
  });

});
