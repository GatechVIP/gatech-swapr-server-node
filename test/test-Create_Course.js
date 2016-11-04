var assert = require('assert');
var should = require('should');
var supertest = require('supertest');

var URL = 'http://localhost:3000';
var request = supertest(URL);

describe('Create Course', function testCreateCourse() {

  it('', function(done) {
    var reqBody = {
      "active": "",
      "name": "",
      "instructor": "",
      "semester": "",
      "year": ""
    };
    var expectedResponseBody = {
      "id": "",
      "name": "",
      "instructor": "",
      "semester": "",
      "year": "",
      "active": "",
      "institution": "",
      "department": ""
    };
    request
      .post('/courses')
      .set('Content-Type', 'application/x-www-form-urlencoded') //why not application/json ?
      .send(reqBody)
      .end(function(err, res) {

        done();
      });
  });


});
