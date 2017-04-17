var should = require('should');
var assert = require('assert');
var request = require('supertest');

describe('Instructor Creation', function() {
	//test addition of new username
	it ('should allow addition of new username', function(done) {
    var reqBody = {
      "username": "teacher_new",
      "first_name": "FIRSTNAME",
      "last_name": 'LASTNAME'
    };
    request(url)
      .post("/swaprinstructors")
      .send(reqBody)
      .end(function(err, res) {
        res.status.should.be.exactly(201);
        done();
      });
  });
	//test to disallow existing usernames
	it ('should not allow insert of existing username', function(done) {
    var reqBody = {
      "username": "teacher0",
      "first_name": "FIRSTNAME",
      "last_name": 'LASTNAME'
    };
    request(url)
      .post("/swaprinstructors")
      .send(reqBody)
      .end(function(err, res) {
        res.status.should.be.exactly(400);
        done();
      });
  });
	//test to ensure a blank username doesn't get inserted 
		it ('should not allow insert of blank username', function(done) {
    var reqBody = {
      "username": "",
      "first_name": "FIRSTNAME",
      "last_name": 'LASTNAME'
    };
    request(url)
      .post("/swaprinstructors")
      .send(reqBody)
      .end(function(err, res) {
        res.status.should.be.exactly(400);
        done();
      });
  });
		//TODO: future tests
		//test for invalid characters in a username
		//test for blank first/ last name
		//test for invalid characters in first/ last name
});