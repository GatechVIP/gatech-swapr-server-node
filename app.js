var express = require('express');
// var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var logger = require('./util/logger');

var config = require('./config/config.json');
var passport = require('./config/passport');

var routes = require('./routes/index');
var users = require('./routes/users');
var instructors = require('./routes/instructors');
var courses = require('./routes/courses');
var apiAuth = require('./routes/api-auth');
var assignments = require('./routes/assignments');
var institutes = require('./routes/institutes');
var grades = require('./routes/grades');

var models = require('./db/models');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(require('morgan')('combined', { 'stream': logger.stream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    'store': new SequelizeStore({
        'db': models.sequelize,
        'table': models.ExpressSession
    }),
    'secret': config.express.sessionKey,
    'resave': false,
    'saveUninitialized': false,
    'proxy': true,
    'cookie': { 'secure': true, 'maxAge': 60 * 60 * 1000 }
}));

// Initialize Passport and restore authentication state, if any, from session
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/api/swaprusers', users);
app.use('/api/swaprinstructors', instructors);
app.use('/api/courses', courses);
app.use('/api/api-token-auth', apiAuth);
app.use('/api/assignments', assignments);
app.use('/api/institutes', institutes);
app.use('/api/grades', grades);

// use EJS as the default view engine
app.set('view engine', 'ejs');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res) {
    logger.debug(err);
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: req.app.get('env') === 'development' ? err : {}
    });
});

module.exports = app;
