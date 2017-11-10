var express = require('express');
var router = express.Router();
var passport = require('passport');
var logger = require('../util/logger');

/* GET home page. */
router.get('/', function(req, res, next) {
    logger.debug(req.user);
    if (! req.user) {
        return res.redirect('/api/login');
    } else {
        return res.render('index', { 'title': 'SWAPR', 'user': req.user });
    }
});

router.get('/login', passport.authenticate('cas', {'successRedirect': '/'}));

module.exports = router;
