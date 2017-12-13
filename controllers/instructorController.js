var models = require('../db/models');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var validator = require('email-validator');

//module.exports.createInstructor = function(req, res) {
module.exports.createInstructor = function(username, first_name, last_name, email, password, callback) {
    /*if (req.body.username == null || req.body.first_name == null || req.body.last_name == null ||
        req.body.email == null || req.body.password == null) {*/
    if (username == null || first_name == null || last_name == null || email == null || password == null) {
        //return res.status(400).send({ 'error': 'unable to create new instructor' });
        return callback({'status': 400, 'message': 'unable to create new instructor'});
    }
    /*if (req.body.username === '' || req.body.first_name === '' || req.body.last_name === '' ||
        req.body.email === '' || req.body.password === '') {*/
    if (username == '' || first_name == '' || last_name == '' || email == '' || password == '') {
        //return res.status(400).send({ 'error': 'unable to create new instructor' });
        return callback({'status': 400, 'message': 'unable to create new instructor'});
    }
    /*if (typeof req.body.username !== 'string' || typeof req.body.first_name !== 'string' || typeof req.body.last_name !== 'string' ||
        typeof req.body.email !== 'string' || typeof req.body.password !== 'string') {*/
    if (typeof username !== 'string' || typeof first_name !== 'string' || typeof last_name !== 'string' ||
            typeof email !== 'string' || typeof password !== 'string') {
        //return res.status(400).send({ 'error': 'unable to create new instructor' });
        return callback({'status': 400, 'message': 'unable to create new instructor'});
    }
    //if (!validator.validate(req.body.email)) {
    if (!validator.validate(email)) {
        //return res.status(400).send({ 'error': 'unable to create new instructor' });
        return callback({'status': 400, 'message': 'unable to create new instructor'});
    }

    // Check that no one else has claimed this username or email address
    models.User.findOne({'where': { '$or': [
        //{'username': req.body.username},
        {'username': username},
        //{'email': req.body.email}
        {'email': email}
    ] }}).then(function(exists) {
      if (exists) {
          var error = 'email address in use';
          if (exists.username === username) {
              error = 'username in use';
          }

          //return res.status(400).send({ 'error': error });
          return callback({'status': 400, 'message': error});
      }

      var instructor = {
          //'username': req.body.username,
          'username': username,
          //'first_name': req.body.first_name,
          'first_name': first_name,
          //'last_name': req.body.last_name,
          'last_name': last_name,
          //'email': req.body.email,
          'email': email,
          //'role': 'instructor'
          'role': 'instructor'
      };

      // Hash the password and create a token
      bcrypt.genSalt(5, function(err, salt) {
          //if (err) { return res.status(500).send({ 'error': 'unable to create new instructor' }); }
          if (err) { return callback({'status': 500, 'message': 'unable to create new instructor'}); }
          //bcrypt.hash(req.body.password, salt, null, function(err, hash) {
          bcrypt.hash(password, salt, null, function (err, hash) {
              //if (err) { return res.status(500).send({ 'error': err }); }
              if (err) { return callback({'status': 500, 'message': err}); }
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
                //return res.status(201).send(result);
                return callback(null, result);
              }).catch(function(error) {
                //return res.status(500).send({ 'error': 'unable to create new instructor' });
                return callback({'status': 500, 'message': 'unable to create new instructor'});
              });
          });
      });
    }).catch(function(error) {
        //return res.status(500).send({'error': 'unable to create new instructor'});
        return callback({'status': 500, 'message': 'unable to create new instructor'});
    });
};
