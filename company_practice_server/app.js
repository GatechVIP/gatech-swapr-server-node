var express = require('express');
var path = require('path');
var mongoose = require('./db/mongoose');
var favicon = require('serve-favicon');
var logger = require('morgan');
var log = require('./utils/log')(module);
var bodyParser = require('body-parser');
var passport = require('./config/passport');
var auth = require('./routes/auth');
var users = require('./routes/users');
var profiles = require('./routes/profile');
var food = require('./routes/food');
var order = require('./routes/order');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, authorization');

    // intercept OPTIONS method
    if (req.method === 'OPTIONS') {
        res.status(200).end();
    }
    else {
        next();
    }
};
//put this as the first middleware so that others do not
//complain about CORS
app.use(allowCrossDomain);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());


app.use(function (req, res, next) {
    //console.log(req.body) // populated!
    //console.log(req.headers)
    next()
})

app.use('/api', function (req, res, next) {
   // log.info('token = ' + req.headers.authorization);

    next()
})

app.use('/api/', profiles);
app.use('/', auth);
app.use('/', users);
app.use('/api/food', food);
app.use('/api/order', order);

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
