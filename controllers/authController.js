var models = require('../db/models');
var bcrypt = require('bcrypt-nodejs');
var logger = require('../util/logger');

module.exports.getToken = function(username, password, callback) {
    if (username === '') {
        return callback({'status': 400, 'message': 'Token could not be retrieved'});
    }
    if (typeof username != 'string') {
        return callback({'status': 400, 'message': 'Token could not be retrieved'});
    }

    models.User.findOne({'where': {'username': username}}).then(function(user) {
        if (!user) {
            logger.error('No user');
            return callback({'status': 400, 'message': 'Token could not be retrieved'});
        } else {
            if (password) {
                bcrypt.compare(password, user.password, function(error, isMatch) {
                    if (error) {
                        return callback({'status': 400, 'message': 'Token could not be retrieved'});
                    }
                    if (isMatch) {
                        var response = {'token': user.token};
                        return callback(null, {'token': user.token});
                    } else {
                        return callback({'status': 400, 'message': 'Token could not be retrieved'});
                    }
                });
            } else {
                return callback(null, {'token': user.token});
            }
        }
    }).catch(function(err) {
        logger.error(err);
        return callback({'status': 500, 'message': 'Token could not be retrieved'});
    });

};
