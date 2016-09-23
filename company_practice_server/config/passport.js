var passport = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;

var User = require('../models/user');


passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      user.verifyPassword(password, function(err, isMatch) {
        if (!err) {
            if (isMatch) {
                console.log('User ' + user.username + " signed in");
                return done(null, user);
            } else {
                console.log(" username/password mismatch");
                return done(null, false, { message: 'Incorrect password.' });
            }
        }
      });
    })
  }));


/*passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({facebook_id: profile.id}, function(err, user) {
      if (err) { return done(err); }
      user.facebook_token = accessToken;
      user.save(function(err, user){
         done(null, user);
      })

    });
  }
));

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: "http://localhost:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    User.findOrCreate({twitter_id: profile.id}, function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));
*/
passport.use(new BearerStrategy(
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

module.exports = passport;
