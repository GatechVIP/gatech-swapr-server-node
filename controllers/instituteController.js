var models = require('../db/models');
var logger = require('../util/logger');

//module.exports.createinstitute = function(req, res) {
module.exports.createInstitute = function(name, callback) {
  //if (typeof req.body.name !== 'string') {
  if (typeof name !== 'string') {
      //return res.status(500).send({ 'error': 'institute name must be a string' });
      return callback({'status': 500, 'message': 'institute name must be a string'});
  }

  models.Institute.create({
      //'name': req.body.name,
      'name': name,
  }).then(function(created) {
      var result = {
          'id': created.id,
          'name': created.name,
      };
      //return res.status(201).send(result);
      return callback(null, result);
  }).catch(function(error) {
      logger.error(error);
      //return res.status(500).send({ 'error': 'unable to create new institute' });
      return callback({'status': 500, 'message': 'unable to create new institute'});
  });
};

//module.exports.getinstitute = function(req, res) {
module.exports.getInstitute = function(instituteID, callback) {
    //if (isNaN(req.params.instituteID)) {
    if (isNaN(instituteID)) {
        //return res.status(400).send({ 'error': 'invalid institute id' });
        return callback({'status': 400, 'message': 'invalid institute id'});
    }

    //models.Institute.findOne({'where': {'id': parseInt(req.params.institute_id)}}).then(function(institute) {
    models.Institute.findOne({'where': {'id': parseInt(instituteID)}}).then(function(institute) {
        var result = {
            'id': institute.id,
            'name': institute.name
        };
        //return res.status(200).send(result);
        return callback(null, result);
    }).catch(function(error) {
        logger.error(error);
        //return res.status(404).send({ 'error': 'invalid institute id' });
        return callback({'status': 404, 'message': 'invalid institute id'});
    });
};

//module.exports.getAllinstitutes = function(req, res) {
module.exports.getAllInstitutes = function(callback) {
    models.Institute.findAll().then(function(institutes) {
        var instituteList = institutes.map(function(institute) {
            return {
                'id': institute.id,
                'name': institute.name
            };
        });
        //return res.status(200).send(instituteList);
        return callback(null, instituteList);
    }).catch(function(error) {
        //return res.status(400).send({ 'error': 'could not get all institutes' });
        return callback({'status': 400, 'message': 'could not get all institutes'});
    });
};
