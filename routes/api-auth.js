var express = require('express');
var router = express.Router();
var authController = require('../controllers/authController');
var passport = require('passport');

/* Get Token */
router.route('/').post(passport.authenticate('bearer', {session: false}), function(req, res) {
    var sendRes = function(err, token) {
        if (err) {
            return res.status(err.status).send(err.message);
        }
        return res.send(token);
    };

    if (req.user) {
        authController.getToken(req.user.username, null, sendRes);
    } else {
        authController.getToken(req.body.username, req.body.password, sendRes);
    }
});

module.exports = router;
