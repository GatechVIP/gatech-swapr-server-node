var assert = require('assert');
var should = require('should');
var supertest = require('supertest');

var url = 'http://localhost:3000/api';
var request = supertest(url);

var testInstituteId;

before(function() {
    return request
        .post('/institutes')
        .set('Authorization', 'bearer 1234')
        .send({'name': 'CourseTest University'})
        .expect(201)
        .then(res => {
            testInstituteId = res.body.id;
        });
});

var _fixedid = function(res){
    res.body.id.should.be.a.Number();
    res.body.id = 1;
};

describe('Create Course', function testCreateCourse() {

  /*it('does not let users create courses unless they are instructors');*/

  // it('only lets instructors create courses for the institution and ' +
  //   'department they belong to');

  it('returns id, name, and institute of new course ' +
    'when given valid input', function(done) {
    var reqBody = {
      'name': 'course2',
      'institute': testInstituteId,
    };
    var expectedResponseBody = {
      'id': 1,
      'name': 'course2',
      'institute_id': testInstituteId,
    };
    request
      .post('/courses')
      .send(reqBody)
      .expect(_fixedid)
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

describe('Retrieve a Course', function testRetrieveCourse() {

  it('returns an error if given a non-numeric string for id', function(done) {
    var id = 'This is definitely not a number';
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
    request
        .post('/courses/')
        .send({'name': 'Chemistry I', 'institute': testInstituteId})
        .expect(201)
        .end(function(err, res) {
            var id = res.body.id;
            var expectedResponseBody = {
              'id': id,
              'name': 'Chemistry I',
              'institute_id': testInstituteId
            };
            request
              .get('/courses/' + id)
              .expect(200, expectedResponseBody)
              .expect('Content-Type', 'application/json; charset=utf-8')
              .end(function(err, res) {
                if (err) {
                  return done(err);
                } else {
                  done();
                }
              });
        });
  });

  it('returns an error if no course exists with the given id', function(done) {
    var id = '82';
    request
      .get('/courses/' + id)
      .end(function expectErrorResponse(err, res) {
        res.status.should.be.exactly(404);
        res.body.should.have.property('error', 'invalid course id');
        done();
      });
  });

});

describe('Course Listing', function() {
  it ('should return information about all courses and which students are taking them', function(done) {
    request
      .get('/courses')
      .end(function(err, res) {
        res.status.should.be.exactly(200);
        res.body.should.be.an.Array();
        res.body.length.should.be.above(1);
        res.body[0].id.should.be.a.Number();
        res.body[0].name.should.be.a.String();
        done();
      });
  });
});
