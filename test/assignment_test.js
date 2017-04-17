var should = require('should');
var assert = require('assert');
var request = require('supertest');

var url = 'http://localhost:3000';

describe ('Making a submission assignment', function() {
  it ('Should create a submission assignment', function(done) {
      var requestBody = {
        "assigner": "chris wang setup script",
        'course': 1,
        'description': 'submission assignment number 1 for courseNumber 1',
        'due_date': datetime.datetime(2014, 1, 2, 0, 0),
        'type': 'submission'
      };
      request(url)
          .post('/assignments')
          .send(requestBody)
          .end(function(err, res) {
              if (err) {
                  throw err;
              }
              res.status.should.be.exactly(201);
              res.body.course.should.equal(1);
              res.body.description.should.equal('submission assignment number 1 for courseNumber 1');
              res.body.due_date.should.equal('2014-01-02T00:00:00-04:56');
              res.body.id.should.equal(1);
              res.body.related_assignment.should.equal(null);
              res.body.swaprinstructor.should.equal(1);
              res.body.type.should.equal('submission');
              done();
          });
  });
});

describe ('Making an evaluation assignment', function() {
  it ('Should create an evaluation assignment', function(done) {
    var requestBody = {
      'course': 1,
      'description': 'evaluation assignment submission assignment number 1',
      'due_date': datetime.datetime(2014, 1, 2, 0, 0),
      'items': [
          {'max_value': 5,
            'question': 'item #1 for assignment number: 2 for class number 1'},
          {'max_value': 5,
            'question': 'item #2 for assignment number: 2 for class number 1'},
          {'max_value': 5,
            'question': 'item #3 for assignment number: 2 for class number 1'},
          {'max_value': 5,
            'question': 'item #4 for assignment number: 2 for class number 1'}
      ],
      'related_assignment': 1,
      'type': 'evaluation'
   };
   request(url)
      .post('/assignments')
      .send(requestBody)
      .end(function(err, res) {
          if (err) {
              throw err;
          }
          res.status.should.be.exactly(201);
          res.body.course.should.equal(1);
          res.body.description.should.equal('evaluation assignment submission assignment number 1');
          res.body.due_date.should.equal("2014-01-02T04:56:00Z");
          res.body.id.should.equal(2);
          res.body.related_assignment.should.equal(1);
          res.body.swaprinstructor.should.equal(1);
          res.body.type.should.equal('evaluation');
          done();
      })
  });
});

describe('Listing all assignments', function() {
  it ('should return all assignments as listed', function(done) {
    request(url)
      .get('/assignments')
      .end(function(err, res) {
          res.status.should.be.exactly(200);
          res.body.length.should.equal(2);
          res.body[0].id.should.equal(1);
          res.body[0].swaprinstructor.should.equal(1);
          res.body[0].description.should.equal("submission assignment number 1 for courseNumber 1");
          res.body[0].type.should.equal("submission");
          res.body[0].course.should.equal(1);
          res.body[0].due_date.should.equal("2014-01-02T04:56:00Z");
          res.body[0].date_posted.should.equal("2015-03-16T04:52:00.108Z");
          res.body[0].related_assignment.should.equal(null);
          res.body[0].grade.should.equal(null);
          res.body[1].id.should.equal(2);
          res.body[1].swaprinstructor.should.equal(1);
          res.body[1].description.should.equal("evaluation assignment submission assignment number 1");
          res.body[1].type.should.equal("evaluation");
          res.body[1].type.should.equal(1);
          res.body[1].due_date.should.equal("2014-01-02T04:56:00Z");
          res.body[1].date_posted.should.equal("2015-03-16T04:52:00.108Z");
          res.body[1].related_assignment.should.equal(1);
          res.body[1].grade.should.equal(null);
          done();
      });
  });
});

describe('Getting one assignment', function() {
  it ('Should return all details related to a valid assignment in the system', function(done) {
    request(url)
      .get('/assignments/2')
      .end(function(err, res) {
          res.status.should.be.exactly(200);
          res.body.id.should.equal(2);
          res.body.swaprinstructor.should.equal(1);
          res.body.description.should.equal("evaluation assignment submission assignment number 1");
          res.body.type.should.equal("evaluation");
          res.body.course.should.equal(1);
          res.body.due_date.should.equal("2014-01-02T04:56:00Z");
          res.body.date_posted.should.equal("2015-03-16T04:52:00.108Z");
          res.body.related_assignment.should.equal(1);
          res.body.grade.should.equal(null);
          res.body.items.length.should.equal(4);
          res.body.items[0].id.should.equal(1);
          res.body.items[0].question.should.equal("item #1 for assignment number: 2 for class number 1");
          res.body.items[0].max_value.should.equal(5);
          res.body.items[0].assignment.should.equal(2);
          res.body.items[1].id.should.equal(2);
          res.body.items[1].question.should.equal("item #2 for assignment number: 2 for class number 1");
          res.body.items[1].max_value.should.equal(5);
          res.body.items[1].assignment.should.equal(2);
          res.body.items[2].id.should.equal(3);
          res.body.items[2].question.should.equal("item #3 for assignment number: 2 for class number 1");
          res.body.items[2].max_value.should.equal(5);
          res.body.items[2].assignment.should.equal(2);
          res.body.items[3].id.should.equal(4);
          res.body.items[3].question.should.equal("item #4 for assignment number: 2 for class number 1");
          res.body.items[3].max_value.should.equal(5);
          res.body.items[3].assignment.should.equal(2);
          done();
      });
  });

  it ('Should return a 404 error for a non-existent item number', function(done) {
    request(url)
      .get('/assignments/420')
      .end(function(err, res) {
        res.status.should.be.exactly(404);
        done();
      });
  });

  it ('Should return a 400 error for a non-numerical id placed in the URL', function(done) {
    request(url)
      .get('/assignments/ayandas')
      .end(function(err, res) {
        res.status.should.be.exactly(400);
        done();
      });
  });
});
