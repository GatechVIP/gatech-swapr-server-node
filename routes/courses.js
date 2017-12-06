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
router.route('/:course_id')
  .get(courseController.getCourse);

router.route('/:course_id/sessions')
  .post(sessionController.createSession);

router.route('/:course_id/sessions')
  .get(sessionController.getSessions);

router.route('/:course_id/sessions/:session_id')
  .post(sessionController.enrollInSession);

router.route('/:course_id/sessions/:session_id')
    .get(sessionController.getSession);

module.exports = router;
