// Load required packages
var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;
var User = require('../models/user');

passport.use(new
    BearerStrategy(
    function(token, done) {
            User.findOne({token: token}, function(err, user) {
                //console.log(token);
                if (err) { return done(err); }
                if (!user) { return done(null, false, { message: 'Unknown user' }); }

                var info = { scope: '*' }
                done(null, user, info);
            });
    }
));

exports.isAuthenticated = passport.authenticate('bearer', { session : false });
