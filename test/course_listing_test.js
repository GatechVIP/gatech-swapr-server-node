var should = require('should');
var assert = require('assert');
var request = require('supertest');

var url = 'http://localhost:3000';

describe('Course Listing', function() {
  it ('should return information about all courses and which students are taking them', function(done) {
    request(url)
      .get("/courses")
      .end(function(err, res) {
        res.status.should.be.exactly(200);
        res.body.length.should.equal(4);
        res.body[0].id.should.equal(1);
        res.body[0].name.should.equal("course0");
        res.body[0].active.should.equal(true);
        res.body[0].year.should.equal(2015);
        res.body[0].semester.should.equal("spring");
        res.body[0].students.length.should.equal(2);
        res.body[0].students[0].should.equal(1);
        res.body[0].students[1].should.equal(2);
        res.body[1].id.should.equal(2);
        res.body[1].name.should.equal("course1");
        res.body[1].active.should.equal(true);
        res.body[1].year.should.equal(2015);
        res.body[1].semester.should.equal("spring");
        res.body[1].students.length.should.equal(2);
        res.body[1].students[0].should.equal(2);
        res.body[1].students[1].should.equal(3);
        res.body[2].id.should.equal(3);
        res.body[2].name.should.equal("course2");
        res.body[2].active.should.equal(true);
        res.body[2].year.should.equal(2015);
        res.body[2].semester.should.equal("spring");
        res.body[2].students.length.should.equal(1);
        res.body[2].students[0].should.equal(3);
        res.body[3].id.should.equal(4);
        res.body[3].name.should.equal("course3");
        res.body[3].active.should.equal(true);
        res.body[3].year.should.equal(2015);
        res.body[3].semester.should.equal("spring");
        res.body[3].students.length.should.equal(1);
        res.body[3].students[0].should.equal(4);
        done();
      });
  });
});
