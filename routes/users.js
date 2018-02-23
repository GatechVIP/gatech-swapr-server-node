var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var passport = require('passport');

/* Create SWAPRUser */
router.route('/')
    .post(passport.authenticate('bearer', {session: false}), function(req, res) {
        userController.createUser(req.body.username, req.body.first_name, req.body.last_name, req.body.email,
              req.body.password, req.body.role, function(err, token) {
                  if (err) {
                      return res.status(err.status).send(err.message);
                  }
                  return res.status(201).send(token);
              })
    });

module.exports = router;
