var express = require('express');
var router = express.Router();
var instructorController = require('../controllers/instructorController');

/* Create SWAPRInstructor */
router.route('/swaprinstructors')
  .post(instructorController.createInstructor);


module.exports = router;
