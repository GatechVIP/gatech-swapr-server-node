var models = require('../db/models');
var logger = require('../util/logger');

module.exports.createinstitute = function(req, res) {
  if (typeof req.body.name !== 'string') {
      return res.status(500).send({ 'error': 'institute name must be a string' });
  }

  models.Institute.create({
      'name': req.body.name,
  }).then(function(created) {
      var result = {
          'id': created.id,
          'name': created.name,
      };
      return res.status(201).send(result);
  }).catch(function(error) {
      logger.error(error);
      return res.status(500).send({ 'error': 'unable to create new institute' });
  });
};

module.exports.getinstitute = function(req, res) {
    if (isNaN(req.params.instituteID)) {
        return res.status(400).send({ 'error': 'invalid institute id' });
    }

    models.Institute.findOne({'where': {'id': parseInt(req.params.institute_id)}}).then(function(institute) {
        var result = {
            'id': institute.id,
            'name': institute.name
        };
        return res.status(200).send(result);
    }).catch(function(error) {
        logger.error(error);
        return res.status(404).send({ 'error': 'invalid institute id' });
    });
};

module.exports.getAllinstitutes = function(req, res) {

    models.Institute.findAll().then(function(institutes) {
        var instituteList = institutes.map(function(institute) {
            return {
                'id': institute.id,
                'name': institute.name
            };
        });
        return res.status(200).send(instituteList);

    }).catch(function(error) {
        return res.status(400).send({ 'error': 'could not get all institutes' });
    });
};
