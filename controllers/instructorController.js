var models = require('../db/models');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var validator = require('email-validator');

module.exports.createInstructor = function(username, first_name, last_name, email, password, callback) {
    if (username == null || first_name == null || last_name == null || email == null || password == null) {
        return callback({'status': 400, 'message': {'error': 'unable to create new instructor'}});
    }
    if (username == '' || first_name == '' || last_name == '' || email == '' || password == '') {
        return callback({'status': 400, 'message': {'error': 'unable to create new instructor'}});
    }
    if (typeof username !== 'string' || typeof first_name !== 'string' || typeof last_name !== 'string' ||
            typeof email !== 'string' || typeof password !== 'string') {
        return callback({'status': 400, 'message': {'error': 'unable to create new instructor'}});
    }
    if (!validator.validate(email)) {
        return callback({'status': 400, 'message': {'error': 'unable to create new instructor'}});
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

      var instructor = {
          'username': username,
          'first_name': first_name,
          'last_name': last_name,
          'email': email,
          'role': 'instructor'
      };

      // Hash the password and create a token
      bcrypt.genSalt(5, function(err, salt) {
          if (err) { return callback({'status': 500, 'message': {'error': 'unable to create new instructor'}}); }
          bcrypt.hash(password, salt, null, function (err, hash) {
              if (err) { return callback({'status': 500, 'message': {'error': err}}); }
              instructor['password']= hash;
              instructor['token'] = jwt.sign(instructor, 'app_secret');

              models.User.create(instructor).then(function(created){
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
                return callback({'status': 500, 'message': {'error': 'unable to create new instructor'}});
              });
          });
      });
    }).catch(function(error) {
        return callback({'status': 500, 'message': {'error': 'unable to create new instructor'}});
    });
};
