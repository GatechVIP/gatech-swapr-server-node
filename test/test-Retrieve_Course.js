var assert = require('assert');
var should = require('should');
var supertest = require('supertest');

var URL = 'http://localhost:3000';
var request = supertest(URL);

describe('Retrieve a Course', function testRetrieveCourse() {

  it('returns an error if given a non-numeric string for id', function(done) {
    var id = "This is definitely not a number";
    request
      .get('/courses/' + id)
      .end(function expectErrorResponse(err, res) {
        res.status.should.be.exactly(400);
        res.body.should.have.property('error', 'invalid course id');
        done();
      });
  });

  /*it('returns an error if given a string containing non-numeric characters '
      + 'for id');*/

  it('should return information about the course with the specified id',
      function(done) {
    var id = "5";
    var expectedResponseBody = {
      "id": 5,
      "name": "course5",
      "instructor": 1,
      "semester": "spring",
      "year": 2015,
      "active": true,
      "institution": "Georgia Tech",
      "department": "Physics",
      "students": [
        1, 5, 6, 8, 2
      ]
    };
    request
      .get('/courses/' + id)
      .expect(200, expectedResponseBody)
      .expect('Content-Type', 'application/json')
      .end(function(err, res) {
        if (err) {
          return done(err);
        } else {
          done();
        }
      });
  });

  it('returns an error if no course exists with the given id', function(done) {
    var id = "82";
    request
      .get('/courses/' + id)
      .end(function expectErrorResponse(err, res) {
        res.status.should.be.exactly(400);
        res.body.should.have.property('error', 'invalid course id');
        done();
      });
  });

});
