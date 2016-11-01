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
      "username": "testUser",
      "first_name": "Test",
      "last_name": "User",
      "email": "test@example.com",
      "password": "abc123"
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
      "username": "testUser",
      "first_name": "Test1",
      "last_name": "User1",
      "email": "test1@example.com",
      "password": "123abc"
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(expectErrorResponse(err, res));
  });

  it('returns an error when duplicate email is input', function(done) {
    var requestBody = {
      "username": "test2",
      "first_name": "Test2",
      "last_name": "User2",
      "email": "test1@example.com",
      "password": "1a2b3c"
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(expectErrorResponse(err, res));
  });

  it('allows duplicate passwords', function(done) {
    var requestBody = {
      "username": "test3",
      "first_name": "Test3",
      "last_name": "User3",
      "email": "test3@example.com",
      "password": "1a2b3c"
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
      "username": "test4",
      "first_name": "",
      "last_name": "User4",
      "email": "test4@example.com",
      "password": "abc123"
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(expectErrorResponse(err, res));
  });

  it('requires that a last_name be provided', function(done) {
    var requestBody = {
      "username": "test5",
      "first_name": "Test5",
      "last_name": "",
      "email": "test5@example.com",
      "password": "abc123"
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(expectErrorResponse(err, res));
  });

  it('returns an error when given an empty password field', function(done) {
    var requestBody = {
      "username": "test6",
      "first_name": "Test6",
      "last_name": "User6",
      "email": "test6@example.com",
      "password": ""
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(expectErrorResponse(err, res));
  });

  it('does not accept numerical values as inputs for username', function(done) {
    var requestBody = {
      "username": 123,
      "first_name": "Test7",
      "last_name": "User7",
      "email": "test7@example.com",
      "password": "abc123"
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(expectErrorResponse(err, res));
  });

  it('does not accept boolean values as inputs for username', function(done) {
    var requestBody = {
      "username": true,
      "first_name": "Test8",
      "last_name": "User8",
      "email": "test8@example.com",
      "password": "abc123"
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(expectErrorResponse(err, res));
  });

  it('does not accept arrays as inputs for username', function(done) {
    var requestBody = {
      "username": [],
      "first_name": "Test9",
      "last_name": "User9",
      "email": "test9@example.com",
      "password": "abc123"
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(expectErrorResponse(err, res));
  });

  it('does not accept numerical values as inputs for first_name', function(done) {
    var requestBody = {
      "username": "test10",
      "first_name": 123,
      "last_name": "User10",
      "email": "test10@example.com",
      "password": "abc123"
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(expectErrorResponse(err, res));
  });

  it('does not accept boolean values as inputs for first_name', function(done) {
    var requestBody = {
      "username": "test11",
      "first_name": true,
      "last_name": "User11",
      "email": "test11@example.com",
      "password": "abc123"
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(expectErrorResponse(err, res));
  });

  it('does not accept arrays as inputs for first_name', function(done) {
    var requestBody = {
      "username": "test12",
      "first_name": [],
      "last_name": "User12",
      "email": "test12@example.com",
      "password": "abc123"
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(expectErrorResponse(err, res));
  });

  it('does not accept numerical values as inputs for last_name', function(done) {
    var requestBody = {
      "username": "test13",
      "first_name": "Test13",
      "last_name": 123,
      "email": "test13@example.com",
      "password": "abc123"
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(expectErrorResponse(err, res));
  });

  it('does not accept boolean values as inputs for last_name', function(done) {
    var requestBody = {
      "username": "test14",
      "first_name": "Test14",
      "last_name": true,
      "email": "test14@example.com",
      "password": "abc123"
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(expectErrorResponse(err, res));
  });

  it('does not accept arrays as inputs for last_name', function(done) {
    var requestBody = {
      "username": "test15",
      "first_name": "Test15",
      "last_name": [],
      "email": "test15@example.com",
      "password": "abc123"
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(expectErrorResponse(err, res));
  });

  it('does not accept numerical values as inputs for email', function(done) {
    var requestBody = {
      "username": "test16",
      "first_name": "Test16",
      "last_name": "User16",
      "email": 123,
      "password": "abc123"
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(expectErrorResponse(err, res));
  });

  it('does not accept boolean values as inputs for email', function(done) {
    var requestBody = {
      "username": "test17",
      "first_name": "Test17",
      "last_name": "User17",
      "email": true,
      "password": "abc123"
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(expectErrorResponse(err, res));
  });

  it('does not accept arrays as inputs for email', function(done) {
    var requestBody = {
      "username": "test18",
      "first_name": "Test18",
      "last_name": "User18",
      "email": [],
      "password": "abc123"
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(expectErrorResponse(err, res));
  });

  it('does not accept numerical values as inputs for password', function(done) {
    var requestBody = {
      "username": "test19",
      "first_name": "Test19",
      "last_name": "User19",
      "email": "test19@example.com",
      "password": 123
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(expectErrorResponse(err, res));
  });

  it('does not accept boolean values as inputs for password', function(done) {
    var requestBody = {
      "username": "test20",
      "first_name": "Test20",
      "last_name": "User20",
      "email": "test20@example.com",
      "password": true
    };
    request
      .post('/swaprusers')
      .send(requestBody)
      .end(expectErrorResponse(err, res));
  });

  it('does not accept arrays as inputs for password', function(done) {
    var requestBody = {
      "username": "test21",
      "first_name": "Test21",
      "last_name": "User21",
      "email": "test21@example.com",
      "password": []
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
