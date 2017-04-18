var debug = require('debug')('instructorController');
var models = require('../models');

module.exports.createCourse = function(req, res) {

  if (typeof req.body.name !== 'string' || isNaN(req.body.institute)) {
      return res.status(500).send({ 'error': 'unable to create new course' });
  }


  models.Course.create({
      "name": req.body.name,
      "InstituteId": req.body.institute,
      "institute": {
          "id": req.body.institute
      }
  }).then(function(created) {
      var result = {
          "id": created.id,
          "name": created.name,
          "InstituteId": created.InstituteId
      }
      return res.status(201).send(result);
  }).catch(function(error) {
      debug(error);
      return res.status(500).send({ 'error': 'unable to create new course' });
  })
};

module.exports.getCourse = function(req, res) {
    if (isNaN(req.params.courseID)) {
        return res.status(400).send({ 'error': 'invalid course id' });
    }

    models.Course.findOne({'where': {'id': parseInt(req.params.courseID)}}).then(function(course) {
        var result = {
            "id": course.id,
            "name": course.name,
            "InstituteId": course.InstituteId
        }
        return res.status(201).send(result);
    }).catch(function(error) {
        debug(error);
        return res.status(404).send({ 'error': 'invalid course id' });
    });
};

module.exports.getAllCourses = function(req, res) {

    models.Course.findAll().then(function(courses) {
        var courseList = courses.map(function(course) {
            return {
                "id": course.id,
                "name": course.name,
                "InstituteId": course.InstituteId
            }
        });
        return res.status(201).send(courseList);

    }).catch(function(error) {
        return res.status(400).send({ 'error': 'could not get all courses' });
    })
};

module.exports.createSession = function(req, res) {
    if (isNaN(req.params.courseID)) {
        return res.status(400).send({ 'error': 'invalid course id' });
    }
    models.Session.create({
        "name": req.body.name,
        "startDate": req.body.startDate,
        "endDate": req.body.endDate,
        "CourseId": parseInt(req.params.courseID)
    }).then(function(newSession) {
        var response = {
            "id": newSession.id,
            "name": newSession.name,
            "startDate": newSession.startDate,
            "endDate": newSession.endDate,
            "CourseId": newSession.CourseId
        }
        return res.status(201).send(response);
    }).catch(function(error) {
        return res.status(500).send({ 'error': 'could not create a session' });
    });
};

module.exports.enrollInSession = function(req, res) {
    if (isNaN(req.params.courseID) || isNaN(req.params.sessionID)) {
        return res.status(400).send({ 'error': 'Unable to enroll in session' })
    }
    models.User.findAll({ 'where': {
        'username': { '$in': req.body.students}
    }}).then(function(students) {
        var enrollments = students.map(function(student) {
            return {
                'SessionId': parseInt(req.params.sessionID),
                'UserId': student.id
            }
        });
        models.SessionEnrollment.bulkCreate(enrollments).then(function(sessionEnrollments) {

            models.Session.findOne({ 'where': { 'id': parseInt(req.params.sessionID) }}).then(function(theSession) {
                models.SessionEnrollment.findAll({ 'where': {'SessionId': parseInt(req.params.sessionID)}}).then(function(allEnrollments) {
                    var response = {
                        "id": theSession.id,
                        "CourseId": theSession.CourseId,
                        "startDate": theSession.startDate,
                        "endDate": theSession.endDate,
                        "students": allEnrollments.map(function(e) {
                            return e.UserId;
                        })
                    };
                    return res.status(201).send(response);
                }).catch(function(error) {
                    debug(error)
                    return res.status(400).send({ 'error': 'could not complete enrollment'});
                })
            }).catch(function(error) {
                debug(error);
                return res.status(400).send({ 'error': 'Unable to enroll in courses' });
            })
        }).catch(function(error) {
            debug(error);
            return res.status(400).send({ 'error': 'Unable to enroll in courses' });
        })
    }).catch(function(error) {
        debug(error);
        return res.status(400).send({ 'error': 'Unable to enroll in courses' });
    });
};

module.exports.getSession = function(req, res) {
    if (isNaN(req.params.courseID) || isNaN(req.params.sessionID)) {
        return res.status(400).send({ 'error': 'invalid id input' });
    }
    models.Session.findOne({ 'where': { 'id': parseInt(req.params.sessionID) } }).then(function(aSession) {
        models.SessionEnrollment.findAll({ 'where': { 'SessionId': parseInt(req.params.sessionID) } }).then(function(enrollments) {
            var result = {
              "id": aSession.id,
              "name": aSession.name,
              "startDate": aSession.startDate,
              "endDate": aSession.endDate,
              "CourseId": aSession.CourseId,
              "students": enrollments.map(function(d) {
                  return d.UserId;
              })
            };
            return res.status(201).send(result);
        }).catch(function(error) {
            return res.status(400).send({ 'error': 'could not retrieve the course'});
        })
    }).catch(function(error) {
        debug(error);
        return res.status(400).send({ 'error': 'could not retrieve the course'});
    });
};

module.exports.getSessions = function(req, res) {
    if (isNaN(req.params.courseID)) {
        return res.status(400).send({ "error": "Invalid input" });
    }
    models.Session.findAll({ 'where': { 'CourseId': parseInt(req.params.courseID) } }).then(function(sessions) {
        var sessionIDs = sessions.map(function(d) {
            return d.id;
        });
        models.SessionEnrollment.findAll({
            'where': {
                'SessionId': {
                    '$in': sessionIDs
                }
            }
        }).then(function(enrollments) {
            var result = sessions.map(function(d) {
                return {
                  "id": d.id,
                  "name": d.name,
                  "startDate": d.startDate,
                  "endDate": d.endDate,
                  "CourseId": d.CourseId,
                  "students": enrollments.filter(function(s) {
                      return s.SessionId === d.id;
                  }).map(function(s) {
                      return s.UserId;
                  })
                };
            });
            return res.status(201).send(result);
        }).catch(function(error) {
            debug(error);
            return res.status(400).send({ 'error': 'could not get the sessions' });
        })
    }).catch(function(error) {
        debug(error);
        return res.status(400).send({ 'error': 'could not get the sessions' });
    })
};
