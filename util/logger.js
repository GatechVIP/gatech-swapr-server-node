const winston = require('winston');
const fs = require('fs');
const env = process.env.NODE_ENV || "development";

const fileTransport = new winston.transports.File({
    'level': 'info',
    'filename': './logs/log.json',
    'handleExceptions': true,
    'json': true,
    'maxsize': 5242880, //5MB
    'maxFiles': 7,
    'colorize': false
});

const consoleTransport = new winston.transports.Console({
    'level': 'error',
    'handleExceptions': true,
    'json': false,
    'colorize': true
});

// Make sure the logs directory exists
try {
    fs.mkdirSync('./logs', 0o755);
} catch (err) {
    // If the error was anything except the directory already existing there's a problem
    if (err.code !== 'EEXIST') { throw new Error(err); }
}

var logger = module.exports = new winston.Logger({
    'transports': [ fileTransport, consoleTransport ],
    'exitOnError': false
});

if (env === 'development') {
    logger.transports.console.level = 'debug';
}

logger.stream = {
    'write': function(message, encoding) {
        logger.info(message);
    }
};
