var express = require('express');
var router = express.Router();
var courseController = require('../controllers/courseController');
var sessionController = require('../controllers/sessionController');

/* List ALL Courses */
router.route('/')
  .get(courseController.getAllCourses);

/* Create Course */
router.route('/')
  .post(courseController.createCourse);

/* Retrieve a Course */
router.route('/:courseID')
  .get(courseController.getCourse);

router.route('/:courseID/sessions')
  .post(sessionController.createSession);

router.route('/:courseID/sessions')
  .get(sessionController.getSessions);

router.route('/:courseID/sessions/:sessionID')
  .post(sessionController.enrollInSession);

router.route('/:courseID/sessions/:sessionID')
    .get(sessionController.getSession);

module.exports = router;
