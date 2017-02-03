var express = require('express');
var router = express.Router();
var instructorController = require('../routes/instructorController');

/* List ALL Courses */
router.route('/courses')
  .get();

/* Create Course */
router.route('/courses')
  .post(instructorController.createCourse);

/* Retrieve a Course */
router.route('/courses/:courseID')
  .get();


module.exports = router;
