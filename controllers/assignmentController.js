var models = require('../models');

module.exports.getActiveAssignments = function(req, res) {
    if (isNaN(req.body.studentID)) {
        return res.status(400).send({ 'error': 'Invalid student ID'});
    }
    models.SessionEnrollment.findAll({ 'where': { 'UserId': parseInt(req.body.studentID) } }).then(function(sessions) {
        var sessionIDs = sessions.map(function(d) {
            return d.SessionId;
        });
        models.Assignment.findAll({ 'where': { 'SessionId': { '$in': sessionIDs } } }).then(function(assignments) {
            var today = new Date();
            var activeAssignments = assignments.filter(function(d) {
                return (d.openDate <= today && d.closeDate >= today);
            }).map(function(d) {
                return {
                    "id": d.id,
                    "openDate": d.openDate,
                    "closeDate": d.closeDate,
                    "ExerciseId": d.ExerciseId,
                    "SessionId": d.SessionId
                };
            })
            return res.status(200).send(activeAssignments);
        }).catch(function(err) {
            console.log(err);
            return res.status(400).send({ 'error': 'Could not get the active assignments'});
        });
    }).catch(function(error) {
        console.log(error);
        return res.status(400).send({ 'error': 'Could not get the active assignments'});
    });
}
