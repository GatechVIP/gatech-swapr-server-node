var models = require('../db/models');
var validUrl = require('valid-url');
var logger = require('../util/logger');

module.exports.getGrades = function(studentID, callback) {
    if (isNaN(studentID)) {
        return callback({'status': 400, 'message': {'error': 'invalid student ID'}});
    }

    models.Grade.findAll({ 'where' : { 'user_id': parseInt(studentID) } }).then(function(grades) {
        var today = new Date();
        var completedGrades = grades.filter(function(d) {
            return (d.created_at <= today && d.deleted_at == null);
        }).map(function(d) {
            return {
                assignment_id: d.assignment_id,
                user_id: d.user_id,
                grade: d.grade,
                created_at: d.created_at,
                updated_at: d.updated_at,
                deleted_at: d.deleted_at
            };
        });

        return callback(null, completedGrades);

    }).catch(function(err) {
        logger.error(err);
        return callback({'status': 400, 'message': {'error': 'Could not get the completed grades.'}});
    });
};
