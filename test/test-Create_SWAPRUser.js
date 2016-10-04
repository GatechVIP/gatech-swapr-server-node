var assert = require('assert');
var should = require('should');
var supertest = require('supertest');

var URL = 'http://localhost:3000';
var request = supertest(URL);

function expectErrorResponse(err, res) {
  res.should.have.status(400);
  res.should.have.body({"error": "django user with username already exists"});
  done(err);
}

describe('Create SWAPRUser', function testCreateSWAPRUser() {

  it('returns username, first_name, last_name, and email when given valid input'
      + 'for those fields along with a password', function(done) {
    var requestBody = {
      "username": ,
      "first_name": ,
      "last_name": ,
      "email": ,
      "password":
    };
    var expectedResponseBody = {

    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .expect(201, expectedResponseBody)
      .expect('Content-Type', 'application/json')
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('returns an error when duplicate username is input', function(done) {
    var requestBody = {
      "username": ,
      "first_name": ,
      "last_name": ,
      "email": ,
      "password":
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(expectErrorResponse(err, res));
  });

  it('returns an error when duplicate email is input', function(done) {
    var requestBody = {
      "username": ,
      "first_name": ,
      "last_name": ,
      "email": ,
      "password":
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(expectErrorResponse(err, res));
  });

  it('allows duplicate passwords', function(done) {
    var requestBody = {
      "username": ,
      "first_name": ,
      "last_name": ,
      "email": ,
      "password":
    };
    var expectedResponseBody = {

    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .expect(201, expectedResponseBody)
      .expect('Content-Type', 'application/json')
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('requires that a first_name be provided', function(done) {
    var requestBody = {
      "username": ,
      "first_name": ,
      "last_name": ,
      "email": ,
      "password":
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(expectErrorResponse(err, res));
  });

  it('requires that a last_name be provided', function(done) {
    var requestBody = {
      "username": ,
      "first_name": ,
      "last_name": ,
      "email": ,
      "password":
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(expectErrorResponse(err, res));
  });

  it('returns an error when given an empty password field', function(done) {
    var requestBody = {
      "username": ,
      "first_name": ,
      "last_name": ,
      "email": ,
      "password":
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(expectErrorResponse(err, res));
  });

  it('does not accept numerical values as inputs for username', function(done) {
    var requestBody = {
      "username": ,
      "first_name": ,
      "last_name": ,
      "email": ,
      "password":
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(expectErrorResponse(err, res));
  });

  it('does not accept boolean values as inputs for username', function(done) {
    var requestBody = {
      "username": ,
      "first_name": ,
      "last_name": ,
      "email": ,
      "password":
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(expectErrorResponse(err, res));
  });

  it('does not accept arrays as inputs for username', function(done) {
    var requestBody = {
      "username": ,
      "first_name": ,
      "last_name": ,
      "email": ,
      "password":
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(expectErrorResponse(err, res));
  });

  it('does not accept numerical values as inputs for first_name', function(done) {
    var requestBody = {
      "username": ,
      "first_name": ,
      "last_name": ,
      "email": ,
      "password":
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(expectErrorResponse(err, res));
  });

  it('does not accept boolean values as inputs for first_name', function(done) {
    var requestBody = {
      "username": ,
      "first_name": ,
      "last_name": ,
      "email": ,
      "password":
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(expectErrorResponse(err, res));
  });

  it('does not accept arrays as inputs for first_name', function(done) {
    var requestBody = {
      "username": ,
      "first_name": ,
      "last_name": ,
      "email": ,
      "password":
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(expectErrorResponse(err, res));
  });

  it('does not accept numerical values as inputs for last_name', function(done) {
    var requestBody = {
      "username": ,
      "first_name": ,
      "last_name": ,
      "email": ,
      "password":
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(expectErrorResponse(err, res));
  });

  it('does not accept boolean values as inputs for last_name', function(done) {
    var requestBody = {
      "username": ,
      "first_name": ,
      "last_name": ,
      "email": ,
      "password":
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(expectErrorResponse(err, res));
  });

  it('does not accept arrays as inputs for last_name', function(done) {
    var requestBody = {
      "username": ,
      "first_name": ,
      "last_name": ,
      "email": ,
      "password":
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(expectErrorResponse(err, res));
  });

  it('does not accept numerical values as inputs for email', function(done) {
    var requestBody = {
      "username": ,
      "first_name": ,
      "last_name": ,
      "email": ,
      "password":
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(expectErrorResponse(err, res));
  });

  it('does not accept boolean values as inputs for email', function(done) {
    var requestBody = {
      "username": ,
      "first_name": ,
      "last_name": ,
      "email": ,
      "password":
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(expectErrorResponse(err, res));
  });

  it('does not accept arrays as inputs for email', function(done) {
    var requestBody = {
      "username": ,
      "first_name": ,
      "last_name": ,
      "email": ,
      "password":
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(expectErrorResponse(err, res));
  });

  it('does not accept numerical values as inputs for password', function(done) {
    var requestBody = {
      "username": ,
      "first_name": ,
      "last_name": ,
      "email": ,
      "password":
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(expectErrorResponse(err, res));
  });

  it('does not accept boolean values as inputs for password', function(done) {
    var requestBody = {
      "username": ,
      "first_name": ,
      "last_name": ,
      "email": ,
      "password":
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(expectErrorResponse(err, res));
  });

  it('does not accept arrays as inputs for password', function(done) {
    var requestBody = {
      "username": ,
      "first_name": ,
      "last_name": ,
      "email": ,
      "password":
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(expectErrorResponse(err, res));
  });



//////////////////////////////////////////////////////////////////////////////////////////////////////////////
  it('should take username, first_name, last_name, email, and password as inputs'
    + 'and respond to valid requests by returning all inputs except for password', function (done) {
    request({
      method: 'POST',
      url: URL,
      headers: {
        'Content-Type': 'application/json'
      },
      body: "{'username': 'student0', 'first_name': 'Student', 'last_name': 'Zero', 'email': 'student0@example.com', 'password': 'studentpass'}"
    }, function (error, response, body) {
      var code = response.statusCode;
      var contentType = reponse.headers['Content-Type'];
      var result = JSON.parse(body);
      assert.equal(code, 201, "Status code does not match.");
      assert.equal(contentType, 'application/json', "Content-Type does not match.");
      var expected = {
        "id": 5,
        "username": "student0",
        "first_name": "Student",
        "last_name": "Zero",
        "email": "student0@example.com"
      };
      assert.equal(result, expected, "Response body does not match.");
      done();
    });
  });


  it('should return an error when a duplicate username is input', function (done) {
    request({
      method: 'POST',
      url: URL,
      headers: {
        'Content-Type': 'application/json'
      },
      body: "{'username': 'user_1', 'first_name': 'Joe', 'last_name': 'Userman', 'email': 'duplicateUser@email.com', 'password': 'randompassword'}"
    }, function (error, response, body) {
      var code = response.statusCode;
      var contentType = reponse.headers['Content-Type'];''
      var result = JSON.parse(body);
      assert.equal(code, 400, "Status code does not match.");
      assert.equal(contentType, 'application/json', "Content-Type does not match.");
      var expected = {
        "error": "django user with username already exists"
      };
      assert.equal(result, expected, "Response body does not match.");
      done();
    });
  });


  it('should return an error when a duplicate email is input', function(done) {
    request({
      method: 'POST',
      url: URL,
      headers: {
        'Content-Type': 'application/json'
      },
      body: "{'username': 'user_7', 'first_name': 'Duplicate', 'last_name': 'User', 'email': 'test1@email.com', 'password': 'randompassword'}"
    }, function (error, response, body) {
      var code = response.statusCode;
      var contentType = reponse.headers['Content-Type'];
      var result = JSON.parse(body);
      assert.equal(code, 400, "Status code does not match.");
      assert.equal(contentType, 'application/json', "Content-Type does not match.");
      var expected = {
        "error": "django user with email already exists"
      };
      assert.equal(result, expected, "Response body does not match.");
      done();
    });
  });


  it('should allow duplicate passwords', function (done) {
    request({
      method: 'POST',
      url: URL,
      headers: {
        'Content-Type': 'application/json'
      },
      body: "{'username': 'student1', 'first_name': 'Student', 'last_name': 'One', 'email': 'student1@example.com', 'password': 'studentpass'}"
    }, function (error, response, body) {
      var code = response.statusCode;
      var contentType = reponse.headers['Content-Type'];
      var result = JSON.parse(body);
      assert.equal(code, 201, "Status code does not match.");
      assert.equal(contentType, 'application/json', "Content-Type does not match.");
      var expected = {
        "id": 6,
        "username": "student1",
        "first_name": "Student",
        "last_name": "One",
        "email": "student1@example.com"
      };
      assert.equal(result, expected, "Response body does not match.");
      done();
    });
  });

});
