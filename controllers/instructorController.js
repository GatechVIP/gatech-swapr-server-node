var models = require('../models');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var validator = require('email-validator');

module.exports.createInstructor = function(req, res) {
    if (req.body.username == null || req.body.first_name == null || req.body.last_name == null ||
        req.body.email == null || req.body.password == null) {
        return res.status(400).send({ 'error': 'unable to create new instructor' });
    }
    if (req.body.username === '' || req.body.first_name === '' || req.body.last_name === '' ||
        req.body.email === '' || req.body.password === '') {
        return res.status(400).send({ 'error': 'unable to create new instructor' });
    }
    if (typeof req.body.username !== 'string' || typeof req.body.first_name !== 'string' || typeof req.body.last_name !== 'string' ||
        typeof req.body.email !== 'string' || typeof req.body.password !== 'string') {
        return res.status(400).send({ 'error': 'unable to create new instructor' });
    }
    if (!validator.validate(req.body.email)) {
        return res.status(400).send({ 'error': 'unable to create new instructor' });
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

      var instructor = {
          'username': req.body.username,
          'first_name': req.body.first_name,
          'last_name': req.body.last_name,
          'email': req.body.email,
          'role': 'instructor'
      };

      // Hash the password and create a token
      bcrypt.genSalt(5, function(err, salt) {
          if (err) { return res.status(500).send({ 'error': 'unable to create new instructor' }); }
          bcrypt.hash(req.body.password, salt, null, function(err, hash) {
              if (err) { return res.status(500).send({ 'error': err }); }
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
                return res.status(201).send(result);
              }).catch(function(error) {
                return res.status(500).send({ 'error': 'unable to create new instructor' });
              });
          });
      });
    }).catch(function(error) {
        return res.status(500).send({'error': 'unable to create new instructor'});
    });
};
