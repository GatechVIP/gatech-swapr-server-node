var express = require('express');
var router = express.Router();
var instructorController = require('../controllers/instructorController');

/* List ALL Courses */
router.route('/')
  .get();

/* Create Course */
router.route('/')
  .post(instructorController.createCourse);

/* Retrieve a Course */
router.route('/:courseID')
  .get(instructorController.getCourse);

router.route('/:courseID/sessions')
  .post(instructorController.createSession);

router.route('/:courseID/sessions/:sessionID')
  .post(instructorController.enrollInSession);


module.exports = router;
