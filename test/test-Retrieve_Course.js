var assert = require('assert');
var should = require('should');
var supertest = require('supertest');

var URL = 'http://localhost:3000';

describe('Retrieve a Course', function testRetrieveCourse() {

  it('should not allow id to be undefined');

  it('should not accept numerical values for id');

  it('should not accept boolean values for id');

  it('should not accept arrays for id');

  it('should return information about the course with the specified id',
      function(done) {
    var id = "";
    var request = supertest(URL + '/' + course_id);
    var expectedResponseBody = {
      "id": "",
      "name": "",
      "instructor": "",
      "semester": "",
      "year": "",
      "active": "",
      "institution": "",
      "department": "",
      "students": [

      ]
    };
  });

  it('should return an error if no course exists with the specified id');

});
