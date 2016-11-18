var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var bcrypt = require('bcrypt-nodejs');

module.exports = function(db) {
    passport.use(new LocalStrategy(
        function(username, password, done) {
            db.all("SELECT * FROM id_map WHERE username = '" + username + "'", function(err, row) {
                if (err) { return done(error); }
                if (!row) {
                    return done(null, false, {message: 'No such username'});
                } else {
                    bcrypt.compare(password, row.pwd_hash, function(err, res) {
                        if (res) {
                            var user = {username: row.username, token: row.token};
                            return done(null, user);
                        } else {
                            return done(null, false, {message: 'Incorrect password'});
                        }
                    });
                }
            });
        }
    ));

    passport.use(new BearerStrategy(
        function(token, done) {
            db.all("SELECT * FROM id_map WHERE token = '" + token + "'", function(err, results) {
                if (err) { return done(err); }
                if (!results) {
                    return done(null, false, {message: 'Unknown user'});
                } else {
                    return done(null, user, { scope: 'all' });
                }
            });
        }
    ));
    return passport;
};
