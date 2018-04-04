var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var CASStrategy = require('passport-cas').Strategy;
var bcrypt = require('bcrypt-nodejs');
var models = require('../db/models');
var logger = require('../util/logger');

var config = require('./config.json');

/*passport.use(new LocalStrategy(
    function(username, password, done) {
        models.User.findOne({'where': { 'username': username }}).then(function(user) {
            if (!user) {
                return done(null, false, {message: 'No such username'});
            } else {
                bcrypt.compare(password, user.password, function(err, res) {
                    if (res) {
                        var result = {'username': user.username, 'token': user.token};
                        return done(null, result);
                    } else {
                        return done(null, false, {message: 'Incorrect password'});
                    }
                });
            }
        }).catch(function(err) {
            return done(err);
        });
    }
));*/
passport.use(new LocalStrategy(
    function(username, password, done) {
        models.User.findOne({'where': {'username': username}}).then(function(user) {
            if (!user) {
                done(null, false, {message: 'No such username'});
            } else {
                bcrypt.compare(password, user.password, function(err, res) {
                    if (res) {
                        var result = {'id': user.id, 'username': user.username, 'token': user.token};
                        done(null, result);
                    } else {
                        done(null, false, {message: 'Incorrect password'});
                    }
                });
            }
        }).catch(function(err) {
            done(err);
        });
    }
));

passport.use(new BearerStrategy(
    function(token, done) {
        models.User.findOne({'where': {'token': token}}).then(function(user) {
            if (!user) {
                return done(null, false, {message: 'Unknown user'});
            } else {
                return done(null, user, { scope: 'all' });
            }
        }).catch(function(err) {
            return done(err);
        });
    }
));

passport.use('cas', new CASStrategy(
    config.cas,
    function(login, done) {
        models.User.findOne({'where': {'username': login}}).then(function(user) {
            if (!user) {
                return done(null, false, {message: 'Unknown user'});
            }
            logger.debug({'casLogin': login});
            return done(null, user);
        }).catch(function(err) {
            return done(err);
        });
    }
));

passport.serializeUser = function(user, done) {
    return done(null, user.id);
};

passport.deserializeUser = function(id, done) {
    models.User.findById(id, function(err, user) {
        return done(err, user);
    });
};

module.exports = passport;
