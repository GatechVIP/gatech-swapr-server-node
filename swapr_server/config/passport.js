var passport = require('passport');
var db = require('../db/sqliteSetup.js');
var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var bcrypt = require('bcrypt-nodejs');

passport.use(new LocalStrategy(
    function(username, password, done) {
        bcrypt.genSalt(5, function(err, salt) {
            if (err) return done(err);
            bcrypt.hash(password, salt, null, function(error, hash) {
                if (error) return done(error);
                db.all("SELECT * FROM id_map WHERE username= '" + username + "' and pwd_hash= '" + hash + "'", function(err, row) {
                    if (err) return done();
                    if (!user) {
                        return done(null, false, {message: 'No such user found or incorrect password'});
                    } else {
                        var user = {username: row.username, token: row.token};
                        return done(null, user);
                    }
                })
            })
        })
    }
));

module.exports = passport;
