var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('../config/passport');

router.post('/signin',
  passport.authenticate('local', { session: false}),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    console.log('User ' + req.user.username + " signed in using passport-local");
    //console.log(req.user.token);
    return res.send({token: req.user.token, role: req.user.role});
});


/*router.get('/auth/facebook',
  passport.authenticate('facebook', { session: false, scope: [] })
);

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { session: false, failureRedirect: "/"}),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    console.log('User ' + req.user.username + " signed in using passport-facebook");
    //console.log(req.user.token);
    return res.send({token: req.user.token, role: req.user.role});
});*/

module.exports = router;
