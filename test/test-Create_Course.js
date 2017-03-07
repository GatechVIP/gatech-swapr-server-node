var assert = require('assert');
var should = require('should');
var supertest = require('supertest');

var URL = 'http://localhost:3000';
var request = supertest(URL);

describe('Create Course', function testCreateCourse() {

  /*it('does not let users create courses unless they are instructors');*/

  // it('only lets instructors create courses for the institution and ' +
  //   'department they belong to');

  it('returns id, name, institution, and department of new course ' +
    'when given valid input', function(done) {
    var reqBody = {
      "name": "course1",
      "institution": "Georgia Tech",
      "department": "Physics"
    };
    var expectedResponseBody = {
      "id": 1,
      "name": "course1",
      "institution": "Georgia Tech",
      "department": "Physics"
    };
    request
      .post('/courses')
      .send(reqBody)
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

  //.expect('Content-Type', 'application/json')

  /*it('does not allow duplicate entries');

  it('requires that a course name be specified');

  it('requires that an institution be specified');

  it('requires that a department be specified');

  it('allows different institutions to use the same course name');

  it('allows multiple courses with the same institution');

  it('allows multiple courses with the same department');*/

});
