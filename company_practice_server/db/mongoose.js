var mongoose    = require('mongoose');
var config      = require('../utils/config');
var log         = require('../utils/log')(module);

console.log(config.get('mongoose:uri'));
console.log(config.get('MONGOLAB_URI'));

mongoose.connect(config.get('MONGOLAB_URI') || config.get('mongoose:uri'));


var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback () {
    log.info("Connected to DB!");
});

module.exports = mongoose;
