var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var CASStrategy = require('passport-cas').Strategy;
var bcrypt = require('bcrypt-nodejs');
var models = require('../models');

passport.use(new LocalStrategy(
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
            return done(error);
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

passport.use(new CASStrategy(
    {
    ssoBaseURL: 'https://login.gatech.edu/',
    serverBaseURL: 'http://localhost:3000'
    }, 
    function(login, done) {
        User.findOne({login: login}, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, {message: 'Unknown user'});
            }
        return done(null, user);
        });
    }
));

module.exports = passport;
