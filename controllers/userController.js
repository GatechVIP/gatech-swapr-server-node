var models = require('../db/models');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var validator = require('email-validator');
var logger = require('../util/logger');

module.exports.createUser = function(username, first_name, last_name, email, password, role, callback) {
    if (username == null || first_name == null || last_name == null || email == null || password == null) {
        return callback({'status': 400, 'message': {'error': 'unable to create new user'}});
    }
    if (username === '' || first_name === '' || last_name === '' || email === '' || password === '') {
        return callback({'status': 400, 'message': {'error': 'unable to create new user'}});
    }
    if (typeof username !== 'string' || typeof first_name !== 'string' || typeof last_name !== 'string' ||
            typeof email !== 'string' || typeof password !== 'string') {
        return callback({'status': 400, 'message': {'error': 'unable to create new user'}});
    }
    if (!validator.validate(email)) {
        return callback({'status': 400, 'message': {'error': 'unable to create new user'}});
    }

    // Check that no one else has claimed this username or email address
    models.User.findOne({'where': { '$or': [
        {'username': username},
        {'email': email}
    ] }}).then(function(exists) {
        if (exists) {
            var error = 'email address in use';
            if (exists.username === username) {
                error = 'username in use';
            }

            return callback({'status': 400, 'message': {'error': error}});
        }

        var user = {
            'username': username,
            'first_name': first_name,
            'last_name': last_name,
            'email': email,
            'role': role,
        };

        // Hash the password and create a token
        bcrypt.genSalt(5, function(err, salt) {
            if (err) { return callback({'status': 500, 'message': {'error': 'unable to create new user'}}); }

            bcrypt.hash(password, salt, null, function(err, hash) {
                if (err) { return callback({'status': 500, 'message': {'error': err}}); }
                user['password']= hash;
                user['token'] = jwt.sign(user, 'app_secret');

                models.User.create(user).then(function(created){
                    var result = {
                        'username': created.username,
                        'first_name': created.first_name,
                        'last_name': created.last_name,
                        'id': created.id,
                        'email': created.email,
                        'role': created.role
                    };
                    return callback(null, result);
                }).catch(function(error) {
                    logger.error(error);
                    return callback({'status': 500, 'message': {'error': 'unable to create new user'}});
                });
            });
        });
    }).catch(function(error) {
        logger.error(error);
        return callback({'status': 500, 'message': {'error': 'unable to create new user'}});
    });
};
