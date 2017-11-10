var models = require('../db/models');
var logger = require('../util/logger');

module.exports.createSession = function(req, res) {
    if (isNaN(req.params.course_id)) {
        return res.status(400).send({ 'error': 'invalid course id' });
    }
    models.Session.create({
        "name": req.body.name,
        "start_date": req.body.start_date,
        "end_date": req.body.end_date,
        "course_id": parseInt(req.params.course_id)
    }).then(function(newSession) {
        var response = {
            "id": newSession.id,
            "name": newSession.name,
            "start_date": newSession.start_date,
            "end_date": newSession.end_date,
            "course_id": newSession.course_id
        }
        return res.status(201).send(response);
    }).catch(function(error) {
        return res.status(500).send({ 'error': 'could not create a session' });
    });
};

module.exports.enrollInSession = function(req, res) {
    if (isNaN(req.params.course_id) || isNaN(req.params.course_id)) {
        return res.status(400).send({ 'error': 'Unable to enroll in session' })
    }
    models.User.findAll({ 'where': {
        'username': { '$in': req.body.students}
    }}).then(function(students) {
        var enrollments = students.map(function(student) {
            return {
                'session_id': parseInt(req.params.session_id),
                'user_id': student.id
            }
        });
        models.SessionEnrollment.bulkCreate(enrollments).then(function(sessionEnrollments) {

            models.Session.findOne({ 'where': { 'id': parseInt(req.params.session_id) }}).then(function(theSession) {
                models.SessionEnrollment.findAll({ 'where': {'session_id': parseInt(req.params.session_id)}}).then(function(allEnrollments) {
                    var response = {
                        "id": theSession.id,
                        "course_id": theSession.course_id,
                        "start_date": theSession.start_date,
                        "end_date": theSession.end_date,
                        "students": allEnrollments.map(function(e) {
                            return e.user_id;
                        })
                    };
                    return res.status(201).send(response);
                }).catch(function(error) {
                    logger.error(error);
                    return res.status(400).send({ 'error': 'could not complete enrollment'});
                })
            }).catch(function(error) {
                logger.error(error);
                return res.status(400).send({ 'error': 'Unable to enroll in courses' });
            })
        }).catch(function(error) {
            logger.error(error);
            return res.status(400).send({ 'error': 'Unable to enroll in courses' });
        })
    }).catch(function(error) {
        logger.error(error);
        return res.status(400).send({ 'error': 'Unable to enroll in courses' });
    });
};

module.exports.getSession = function(req, res) {
    if (isNaN(req.params.course_id) || isNaN(req.params.session_id)) {
        return res.status(400).send({ 'error': 'invalid id input' });
    }
    models.Session.findOne({ 'where': { 'id': parseInt(req.params.session_id) } }).then(function(aSession) {
        models.SessionEnrollment.findAll({ 'where': { 'session_id': parseInt(req.params.session_id) } }).then(function(enrollments) {
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
            return res.status(201).send(result);
        }).catch(function(error) {
            return res.status(400).send({ 'error': 'could not retrieve the course'});
        })
    }).catch(function(error) {
        logger.error(error);
        return res.status(400).send({ 'error': 'could not retrieve the course'});
    });
};

module.exports.getSessions = function(req, res) {
    if (isNaN(req.params.course_id)) {
        return res.status(400).send({ "error": "Invalid input" });
    }
    models.Session.findAll({ 'where': { 'course_id': parseInt(req.params.course_id) } }).then(function(sessions) {
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
            return res.status(201).send(result);
        }).catch(function(error) {
            logger.error(error);
            return res.status(400).send({ 'error': 'could not get the sessions' });
        })
    }).catch(function(error) {
        logger.error(error);
        return res.status(400).send({ 'error': 'could not get the sessions' });
    })
};
