var models = require('../db/models');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var validator = require('email-validator');

module.exports.createUser = function(req, res) {
    if (req.body.username == null || req.body.first_name == null || req.body.last_name == null ||
        req.body.email == null || req.body.password == null) {
        return res.status(400).send({ 'error': 'unable to create new user' });
    }
    if (req.body.username === '' || req.body.first_name === '' || req.body.last_name === '' ||
        req.body.email === '' || req.body.password === '') {
        return res.status(400).send({ 'error': 'unable to create new user' });
    }
    if (typeof req.body.username !== 'string' || typeof req.body.first_name !== 'string' || typeof req.body.last_name !== 'string' ||
        typeof req.body.email !== 'string' || typeof req.body.password !== 'string') {
        return res.status(400).send({ 'error': 'unable to create new user' });
    }
    if (!validator.validate(req.body.email)) {
        return res.status(400).send({ 'error': 'unable to create new user' });
    }

    // Check that no one else has claimed this username or email address
    models.User.findOne({'where': { '$or': [
        {'username': req.body.username},
        {'email': req.body.email}
    ] }}).then(function(exists) {
      if (exists) {
          var error = 'email address in use';
          if (exists.username === req.body.username) {
              error = 'username in use';
          }

          return res.status(400).send({ 'error': error });
      }

      var user = {
          'username': req.body.username,
          'first_name': req.body.first_name,
          'last_name': req.body.last_name,
          'email': req.body.email,
      };

      // Hash the password and create a token
      bcrypt.genSalt(5, function(err, salt) {
          if (err) { return res.status(500).send({ 'error': 'unable to create new user' }); }
          
          bcrypt.hash(req.body.password, salt, null, function(err, hash) {
              if (err) { return res.status(500).send({ 'error': err }); }
              user['password']= hash;
              user['token'] = jwt.sign(user, 'app_secret');

              models.User.create(user).then(function(created){
                var result = {
                    'username': created.username,
                    'first_name': created.first_name,
                    'last_name': created.last_name,
                    'id': created.id,
                    'email': created.email
                };
                return res.status(201).send(result);
              }).catch(function(error) {
                return res.status(500).send({ 'error': 'unable to create new user' });
              });
          });
      });
    }).catch(function(error) {
        return res.status(500).send({'error': 'unable to create new user'});
    });
};
