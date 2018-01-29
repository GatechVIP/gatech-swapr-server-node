var models = require('../db/models');
var logger = require('../util/logger');

module.exports.createSession = function(courseID, name, start_date, end_date, callback) {
    if (isNaN(courseID)) {
        return callback({'status': 400, 'message': 'invalid course id'});
    }

    models.Session.create({
        "name": name,
        "start_date": start_date,
        "end_date": end_date,
        "course_id": parseInt(courseID)
    }).then(function(newSession) {
        var response = {
            "id": newSession.id,
            "name": newSession.name,
            "start_date": newSession.start_date,
            "end_date": newSession.end_date,
            "course_id": newSession.course_id
        }
        return callback(null, response);
    }).catch(function(error) {
        return callback({'status': 500, 'message': 'could not create a session'});
    });
};

module.exports.enrollInSession = function(courseID, students, sessionID, callback) {
    if (isNaN(courseID) || isNaN(sessionID)) {
        return callback({'status': 400, 'message': 'unable to enroll in session'});
    }

    models.User.findAll({ 'where': {
        'username': { '$in': students}
    }}).then(function(students) {
        var enrollments = students.map(function(student) {
            return {
                'session_id': parseInt(sessionID),
                'user_id': student.id
            }
        });
        models.SessionEnrollment.bulkCreate(enrollments).then(function(sessionEnrollments) {
            models.Session.findOne({ 'where': { 'id': parseInt(sessionID)}}).then(function(theSession) {
                models.SessionEnrollment.findAll({ 'where': {'session_id': parseInt(sessionID)}}).then(function(allEnrollments) {
                    var response = {
                        "id": theSession.id,
                        "course_id": theSession.course_id,
                        "start_date": theSession.start_date,
                        "end_date": theSession.end_date,
                        "students": allEnrollments.map(function(e) {
                            return e.user_id;
                        })
                    };
                    return callback(null, response);
                }).catch(function(error) {
                    logger.error(error);
                    return callback({'status': 400, 'message': 'could not complete enrollment'});
                })
            }).catch(function(error) {
                logger.error(error);
                return callback({'status': 400, 'message': 'unable to enroll in session'});
            })
        }).catch(function(error) {
            logger.error(error);
            return callback({'status': 400, 'message': 'unable to enroll in session'});
        })
    }).catch(function(error) {
        logger.error(error);
        return callback({'status': 400, 'message': 'unable to enroll in session'});
    });
};

module.exports.getSession = function(courseID, sessionID, callback) {
    if (isNaN(courseID) || isNaN(sessionID)) {
        return callback({'status': 400, 'message': 'invalid id input'});
    }
    models.Session.findOne({'where': { 'id': parseInt(sessionID)}}).then(function(aSession) {
        models.SessionEnrollment.findAll({'where': {'session_id': parseInt(sessionID)}}).then(function(enrollments) {
            var result = {
              "id": aSession.id,
              "name": aSession.name,
              "start_date": aSession.start_date,
              "end_date": aSession.end_date,
              "course_id": aSession.course_id,
              "students": enrollments.map(function(d) {
                  return d.user_id;
              })
            };
            return callback(null, result);
        }).catch(function(error) {
            return callback({'status': 400, 'message': 'could not retrieve the course'});
        })
    }).catch(function(error) {
        logger.error(error);
        return callback({'status': 400, 'message': 'could not retrieve the course'});
    });
};

module.exports.getSessions = function(courseID, callback) {
    if (isNaN(courseID)) {
        return callback({'status': 400, 'message': 'invalid course id'});
    }

    models.Session.findAll({'where': {'course_id': parseInt(courseID)}}).then(function(sessions) {
        var session_ids = sessions.map(function(d) {
            return d.id;
        });
        models.SessionEnrollment.findAll({
            'where': {
                'session_id': {
                    '$in': session_ids
                }
            }
        }).then(function(enrollments) {
            var result = sessions.map(function(d) {
                return {
                  "id": d.id,
                  "name": d.name,
                  "start_date": d.start_date,
                  "end_date": d.end_date,
                  "course_id": d.course_id,
                  "students": enrollments.filter(function(s) {
                      return s.session_id === d.id;
                  }).map(function(s) {
                      return s.user_id;
                  })
                };
            });
            return callback(null, result);
        }).catch(function(error) {
            logger.error(error);
            return callback({'status': 400, 'message': 'could not get the sessions'});
        })
    }).catch(function(error) {
        logger.error(error);
        return callback({'status': 400, 'message': 'could not get the sessions'});
    })
};
