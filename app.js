var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var sqlDB = require('./db/sqliteSetup');
var sqlite3 = require('sqlite3').verbose();
//var sqlDB = require('./db/sqliteSetup');

var passport = require('./config/passport');

var routes = require('./routes/index');
var users = require('./routes/users');
var courses = require('./routes/courses');

var app = express();

var parseArgs = require('minimist');
var argv = parseArgs(process.argv.slice(2));
var sqlDB = null;
if (argv._.length == 0) {
  console.log("Setting up memory DB");
  //sqlDB = require('./db/sqliteSetup');
  sqlDB = require('./db/sqliteSetup');
  app.locals.db = sqlDB;
} else {
  //console.log(sqlDB);

  app.locals.db = new sqlite3.Database(argv._[0]);
  console.log("File DB set up");
}
console.log(sqlDB);
console.log("Comparison result: " + (app.locals.db == sqlDB));

//app.locals.db = sqlDB;

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

/*var parseArgs = require('minimist');
var argv = parseArgs(process.argv.slice(2));
console.log(argv);*/

app.use('/', routes);
app.use('/swaprusers', users);
app.use('/courses', courses);

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
