var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
//var authController = require('../controllers/authController');

router.route('/signup')
    .post(userController.postUsers)

// Create endpoint handlers for /users
router.route('/users')
    .get(userController.getUsers);

module.exports = router;
