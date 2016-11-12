var express = require('express');
var router = express.Router();

/* Create SWAPRInstructor */
router.route('/swaprinstructors')
  .post();

/* Create SWAPRUser */
router.route('/swaprusers')
  .post();


module.exports = router;
