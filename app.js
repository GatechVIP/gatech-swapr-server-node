var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require('./config/passport');

var routes = require('./routes/index');
var users = require('./routes/users');
var courses = require('./routes/courses');
var apiAuth = require('./routes/api-auth');

var models = require('./models');

var app = express();

var argv = require('minimist')(process.argv.slice(2));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev', {'skip': function(req, res) { return process.env.NODE_ENV === 'test' } }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
console.log(passport)
app.use(passport.initialize());

app.use('/', routes);
app.use('/swaprusers', users);
app.use('/courses', courses);
app.use('/api-token-auth', apiAuth);

// use EJS as the default view engine
app.set('view engine', 'ejs');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
