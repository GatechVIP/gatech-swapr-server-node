var models = require('../db/models');
var bcrypt = require('bcrypt-nodejs');
var logger = require('../util/logger');

module.exports.getToken = function(req, res) {
  if (req.body.username === "" || req.body.password === "") {
      return res.status(400).send({ "error": "Token could not be retrieved" });
  }
  if (typeof req.body.username != "string") {
      return res.status(400).send({ "error": "Token could not be retrieved" });
  }
  models.User.findOne({'where': {'username': req.body.username}}).then(function(user) {
      if (!user) {
          logger.error('No user');
          return res.status(404).send({ "error": "Token could not be retrieved" });
      } else {
          bcrypt.compare(req.body.password, user.password, function(error, isMatch) {
              if (error) {
                  return res.status(400).send({ "error": "Token could not be retrieved" });
              }
              if (isMatch) {
                  var response = { "token": user.token };
                  return res.send(response);
              } else {
                  return res.status(404).send({ "error": "Token could not be retrieved" });
              }
          });
      }
  }).catch(function(err) {
      logger.error(err);
      return res.status(400).send({ "error": "Token could not be retrieved" });
  });

};
