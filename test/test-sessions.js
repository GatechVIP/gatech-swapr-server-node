var request = require('supertest');

var url = 'http://localhost:3000/api';

var testInstituteId;

before(function() {
    request(url)
        .post('/institutes')
        .set('Authorization', 'bearer 1234')
        .send({'name': 'SessionTest University'})
        .expect(201)
        .then(res => {
            testInstituteId = res.body.id;
        });
});

var createTestSession = function(name, courseId, callback) {
    request(url)
        .post('/courses/' + courseId + '/sessions')
        .set('Authorization', 'bearer 1234')
        .send({'name': name, 'start_date': new Date(2017, 1, 9).toISOString(), 'end_date': new Date(2017, 5, 6).toISOString()})
        .expect(201)
        .end(callback);
};

describe('Session Listing', function() {

    it('Returns a list of sessions for a course with multiple sessions', function(done) {
        // setup a test course with 2 sessions
        request(url)
            .post('/courses')
            .set('Authorization', 'bearer 1234')
            .send({'name': 'multiSessionTest Course', 'institute': testInstituteId})
            .expect(201)
            .end(function(err, res) {
                var testCourseId = res.body.id;
                createTestSession('spring 2017', testCourseId, function(err, res){
                    var sessId1 = res.body.id;
                    createTestSession('fall 2017', testCourseId, function(err, res){
                        var sessId2 = res.body.id;

                        // do the test
                        var expectedResponseBody = [
                            {
                                'course_id': testCourseId,
                                'id': sessId1,
                                'name': 'spring 2017',
                                'start_date': new Date(2017, 1, 9).toISOString(),
                                'end_date': new Date(2017, 5, 6).toISOString(),
                                'students': []
                            },
                            {
                                'course_id': testCourseId,
                                'id': sessId2,
                                'name': 'fall 2017',
                                'start_date': new Date(2017, 1, 9).toISOString(),
                                'end_date': new Date(2017, 5, 6).toISOString(),
                                'students': []
                            }];
                        request(url)
                            .get('/courses/' + testCourseId + '/sessions')
                            .set('Authorization', 'bearer 1234')
                            .expect(200, expectedResponseBody)
                            .expect('Content-Type', 'application/json; charset=utf-8')
                            .end(done);
                    });
                });

            });
    });

    it('Returns a single session for a course with only one session', function(done) {
        // setup a test course with 1 session
        request(url)
            .post('/courses')
            .set('Authorization', 'bearer 1234')
            .send({'name': 'singleSessionTest Course', 'institute': testInstituteId})
            .expect(201)
            .end(function(err, res) {
                var testCourseId = res.body.id;
                createTestSession('spring 2017', testCourseId, function(err, res){
                    var sessId = res.body.id;

                    var expectedResponseBody = [
                        {
                            'course_id': testCourseId,
                            'id': sessId,
                            'name': 'spring 2017',
                            'start_date': new Date(2017, 1, 9).toISOString(),
                            'end_date': new Date(2017, 5, 6).toISOString(),
                            'students': []
                        }
                    ];
                    request(url)
                        .get('/courses/' + testCourseId + '/sessions')
                        .set('Authorization', 'bearer 1234')
                        .expect(200, expectedResponseBody)
                        .expect('Content-Type', 'application/json; charset=utf-8')
                        .end(done);
                });
            });
    });

    it('Returns an error if given a non-numeric string for the course ID', function(done) {
        request(url)
            .get('/courses/NotANumber/sessions')
            .set('Authorization', 'bearer 1234')
            .end(function expectErrorResponse(err, res) {
                res.status.should.be.exactly(400);
                res.body.should.have.property('error', 'invalid course id');
                done();
            });
    });
});
