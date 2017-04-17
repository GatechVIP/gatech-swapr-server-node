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
            return res.status(201).send(activeAssignments);
        }).catch(function(err) {
            console.log(err);
            return res.status(400).send({ 'error': 'Could not get the active assignments'});
        });
    }).catch(function(error) {
        console.log(error);
        return res.status(400).send({ 'error': 'Could not get the active assignments'});
    });
    /*models.Assignment.findAll({ 'where': { 'SessionId': parseInt(req.body.sessionID) } })
        .then(function(assignments) {
            console.log("Original length: " + assignments.length);
            var today = new Date();
            var activeAssignments = assignments.filter(function(a) {
                return (a.openDate <= today && a.closeDate >= today);
            }).map(function(a) {
                return {
                    "id": a.id,
                    "openDate": a.openDate,
                    "closeDate": a.closeDate,
                    "ExerciseId": a.ExerciseId,
                    "SessionId": a.SessionId
                };
            });
            console.log("Final length: " + activeAssignments.length);
            return res.status(201).send(activeAssignments);
        }).catch(function(error) {
            return res.status(400).send({ 'error': 'Could not retrieve active assignments'});
        })*/
}
