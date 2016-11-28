var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

/* Create SWAPRUser */
router.route('/swaprusers')
  .post(userController.createUser);


module.exports = router;
