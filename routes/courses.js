var express = require('express');
var router = express.Router();
var instructorController = require('../controllers/instructorController');

/* List ALL Courses */
router.route('/')
  .get(instructorController.getAllCourses);

/* Create Course */
router.route('/')
  .post(instructorController.createCourse);

/* Retrieve a Course */
router.route('/:courseID')
  .get(instructorController.getCourse);

router.route('/:courseID/sessions')
  .post(instructorController.createSession);

router.route('/:courseID/sessions')
  .get(instructorController.getSessions);

router.route('/:courseID/sessions/:sessionID')
  .post(instructorController.enrollInSession);

router.route('/:courseID/sessions/:sessionID')
    .get(instructorController.getSession);


module.exports = router;
