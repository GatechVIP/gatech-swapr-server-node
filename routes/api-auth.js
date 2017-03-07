var express = require('express');
var router = express.Router();
var authController = require('../controllers/authController')

/* Get Token */
router.route('/')
  .post(authController.getToken);


module.exports = router;
