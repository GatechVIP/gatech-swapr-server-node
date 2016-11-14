var express = require('express');
var router = express.Router();

/* List Sessions */
router.route('/courses/:courseID/sessions')
  .get();

/* Create Sessions */
router.route('/courses/:courseID/sessions')
  .post();

/* Retrieve Session */
router.route('/courses/:courseID/sessions/:sessionID')
  .get();

/* Enroll Session */
router.route('/courses/:courseID/sessions/:sessionID')
  .post();


module.exports = router;
