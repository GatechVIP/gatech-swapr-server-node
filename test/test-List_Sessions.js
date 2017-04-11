var should = require('should');
var assert = require('assert');
var request = require('supertest');

var url = 'http://localhost:3000';

describe('Session Listing', function() {
    it('Returns a list of sessions for a course with multiple sessions', function(done) {
      var expectedResponseBody = [
        {
          "course_id": 1,
          "session_id": 1,
          "semester": "spring",
          "year": 2017,
          "status": "pending",
          "instructors": [
            1
          ],
          "students": [
            3,
            4
          ]
        },
        {
          "course_id": 1,
          "session_id": 2,
          "semester": "fall",
          "year": 2017,
          "status": "pending",
          "instructors": [
            2
          ],
          "students": [
            5
          ]
        }
      ];
      request(url)
          .get('/courses/1/sessions')
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

    it('Returns a single session for a course with only one session', function(done) {
      var expectedResponseBody = [
        {
          "course_id": 2,
          "session_id": 3,
          "semester": "fall",
          "year": 2017,
          "status": "pending",
          "instructors": [
            2
          ],
          "students": [
            4,
            5
          ]
        }
      ];
      request(url)
          .get('/courses/2/sessions')
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

    it('Returns an error if given a non-numeric string for the course ID', function(done) {
        request(url)
            .get('/courses/NotANumber/sessions')
            .end(function expectErrorResponse(err, res) {
                res.status.should.be.exactly(400);
                res.body.should.have.property('error', "Invalid input");
                done();
            });
    });
});
