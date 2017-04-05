var express = require('express');
var router = express.Router();
var instructorController = require('../controllers/instructorController');


/* List Sessions */
router.route('/courses/:courseID/sessions')
  .get();

/* Create Sessions */
router.route('/courses/:courseID/sessions')
  .post(instructorController.createSession);

/* Retrieve Session */
router.route('/courses/:courseID/sessions/:sessionID')
  .get();

/* Enroll Session */
router.route('/courses/:courseID/sessions/:sessionID')
  .post(instructorController.enrollInSession);


module.exports = router;
