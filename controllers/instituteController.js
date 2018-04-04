var models = require('../db/models');
var logger = require('../util/logger');

module.exports.createInstitute = function(name, callback) {
  if (typeof name !== 'string') {
      return callback({'status': 500, 'message': {'error': 'institute name must be a string'}});
  }

  models.Institute.create({
      'name': name,
  }).then(function(created) {
      var result = {
          'id': created.id,
          'name': created.name,
      };
      return callback(null, result);
  }).catch(function(error) {
      logger.error(error);
      return callback({'status': 500, 'message': {'error': 'unable to create new institute'}});
  });
};

module.exports.getInstitute = function(instituteID, callback) {
    if (isNaN(instituteID)) {
        return callback({'status': 400, 'message': {'error': 'invalid institute id'}});
    }

    models.Institute.findOne({'where': {'id': parseInt(instituteID)}}).then(function(institute) {
        var result = {
            'id': institute.id,
            'name': institute.name
        };
        return callback(null, result);
    }).catch(function(error) {
        logger.error(error);
        return callback({'status': 404, 'message': {'error': 'invalid institute id'}});
    });
};

module.exports.getAllInstitutes = function(callback) {
    models.Institute.findAll().then(function(institutes) {
        var instituteList = institutes.map(function(institute) {
            return {
                'id': institute.id,
                'name': institute.name
            };
        });
        return callback(null, instituteList);
    }).catch(function(error) {
        return callback({'status': 400, 'message': {'error': 'could not get all institutes'}});
    });
};
