var assert = require('assert');
var should = require('should');
var supertest = require('supertest');

var URL = 'http://localhost:3000';
var request = supertest(URL);

describe('Create Course', function testCreateCourse() {

  // The contents of the request and response bodies will need to be changed.

  it('', function NAME(done) {
    var reqBody = {
      "active": ,
      "name": ,
      "semester": ,
      "year": ,

    };
    var expectedResponseBody = {

    };
    request
      .post('/courses')
      .set('Content-Type', 'application/x-www-form-urlencoded') //why not application/json ?
      .send(reqBody)
      .end(function NAME(err, res) {

        done();
      });
  });


});
