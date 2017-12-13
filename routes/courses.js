var express = require('express');
var router = express.Router();
var courseController = require('../controllers/courseController');
var sessionController = require('../controllers/sessionController');
var passport = require('passport');

/* Create Course */
/*router.route('/')
  .post(courseController.createCourse);*/
router.route('/')
    .post(passport.authenticate('token'), function(req, res) {
        courseController.createCourse(req.body.name, req.body.institute,
            function(err, token) {
                if (err) {
                    return res.status(err.status).send(err.message);
                }
                return res.send(token);
            })
    });

/* Retrieve a Course */
/*router.route('/:course_id')
  .get(courseController.getCourse);*/
router.route('/:course_id')
    .get(passport.authenticate('token'), function(req, res) {
        courseController.getCourse(req.params.course_id,
            function(err, token) {
                if (err) {
                    return res.status(err.status).send(err.message);
                }
                return res.send(token);
            })
    });

/* List ALL Courses */
/*router.route('/')
  .get(courseController.getAllCourses);*/
router.route('/')
    .get(passport.authenticate('token'), function(req, res) {
        courseController.getAllCourses(function(err, token) {
            if (err) {
                return res.status(err.status).send(err.message);
            }
            return res.send(token);
        })
    });

/* Create a Course Session */
/*router.route('/:course_id/sessions')
  .post(sessionController.createSession);*/
router.route('/:course_id/sessions')
    .post(passport.authenticate('token'), function(req, res) {
        sessionController.createSession(req.params.course_id, req.body.name, req.body.start_date, req.body.end_date,
            function(err, token) {
                if (err) {
                    return res.status(err.status).send(err.message);
                }
                return res.send(token);
            })
    });

/* Enroll in a Particular Course Session */
/*router.route('/:course_id/sessions/:session_id')
  .post(sessionController.enrollInSession);*/
router.route('/:course_id/sessions/:session_id')
    .post(passport.authenticate('token'), function(req, res) {
        sessionController.enrollInSession(req.params.course_id, req.body.students. req.params.session_id,
            function(err, token) {
                if (err) {
                    return res.status(err.status).send(err.message);
                }
                return res.send(token);
            })
    });

/* Retrieve a Particular Course Session */
/*router.route('/:course_id/sessions/:session_id')
    .get(sessionController.getSession);*/
router.route('/:course_id/sessions/:session_id')
    .get(passport.authenticate('token'), function(req, res) {
        sessionController.getSession(req.params.course_id, req.params.session_id,
            function(err, token) {
                if (err) {
                    return res.status(err.status).send(err.message);
                }
                return res.send(token);
            })
    });

/* List ALL Sessions of a Course */
/*router.route('/:course_id/sessions')
  .get(sessionController.getSessions);*/
router.route('/:course_id/sessions')
    .get(passport.authenticate('token'), function(req, res) {
        sessionController.getSessions(req.params.course_id,
            function(err, token) {
                if (err) {
                    return res.status(err.status).send(err.message);
                }
                return res.send(token);
            })
    });

module.exports = router;
