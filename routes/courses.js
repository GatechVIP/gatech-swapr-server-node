var express = require('express');
var router = express.Router();

/* List ALL Courses */
router.route('/courses')
  .get();

/* Create Course */
router.route('/courses')
  .post();

/* Retrieve a Course */
router.route('/courses/:courseID')
  .get();


module.exports = router;
