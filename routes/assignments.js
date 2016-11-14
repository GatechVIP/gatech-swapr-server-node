var express = require('express');
var router = express.Router();

/* List ALL Assignments, no grades */
router.route('/assignments')
  .get();

/* Make Submission Assignment */
router.route('/assignments')
  .post();

/* Make Evaluation Assignment */
router.route('/evalassignments')
  .post();

/* Retrieve an Assignment */
router.route('/assignments/:id')
  .get();


module.exports = router;
